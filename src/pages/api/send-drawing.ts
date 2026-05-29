import type { APIRoute } from "astro";
import TelegramBot from "node-telegram-bot-api";
import sharp from "sharp";

export const prerender = false;

const TELEGRAM_BOT_TOKEN = import.meta.env.TELEGRAM_BOT_TOKEN ?? process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHANNEL_ID = import.meta.env.TELEGRAM_CHANNEL_ID ?? process.env.TELEGRAM_CHANNEL_ID;
const SVG_WIDTH = 1920;
const SVG_HEIGHT = 1080;

const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: false });

function getClientIp(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-real-ip") ??
    "unknown"
  );
}

function formatCaption(userInfo: Record<string, unknown>, ip: string): string {
  const lines: string[] = [];

  lines.push(`🌐 IP: ${ip}`);

  if (userInfo.url) lines.push(`🔗 URL: ${userInfo.url}`);
  if (userInfo.referrer) lines.push(`↩️ Referrer: ${userInfo.referrer}`);

  if (userInfo.timezone)
    lines.push(
      `⏰ TZ: ${userInfo.timezone} (UTC${userInfo.timezoneOffset != null ? ` ${Number(userInfo.timezoneOffset) > 0 ? "-" : "+"}${Math.abs(Number(userInfo.timezoneOffset)) / 60}` : ""})`,
    );
  if (userInfo.language)
    lines.push(
      `🗣 Lang: ${userInfo.language}${userInfo.languages ? ` (${userInfo.languages})` : ""}`,
    );

  const screenInfo = [
    userInfo.screenResolution,
    userInfo.viewportSize ? `viewport ${userInfo.viewportSize}` : null,
    userInfo.devicePixelRatio ? `@${userInfo.devicePixelRatio}x` : null,
  ]
    .filter(Boolean)
    .join(", ");
  if (screenInfo) lines.push(`🖥 Screen: ${screenInfo}`);

  const hwInfo = [
    userInfo.hardwareConcurrency ? `${userInfo.hardwareConcurrency} cores` : null,
    userInfo.deviceMemory ? `${userInfo.deviceMemory}GB RAM` : null,
    userInfo.maxTouchPoints ? `touch:${userInfo.maxTouchPoints}` : null,
  ]
    .filter(Boolean)
    .join(", ");
  if (hwInfo) lines.push(`💻 HW: ${hwInfo}`);

  if (userInfo.connectionType) {
    const conn = [
      userInfo.connectionType,
      userInfo.connectionDownlink ? `${userInfo.connectionDownlink}Mbps` : null,
    ]
      .filter(Boolean)
      .join(" ");
    lines.push(`📶 Net: ${conn}`);
  }

  if (userInfo.platform) lines.push(`🖥 Platform: ${userInfo.platform}`);
  if (userInfo.userAgent) lines.push(`🤖 UA: ${String(userInfo.userAgent).slice(0, 200)}`);

  return lines.join("\n");
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { paths, userInfo } = body;

    const svgPaths = paths
      .map((path: string) => `<path d="${path}" fill="currentColor" stroke="currentColor" />`)
      .join("\n");
    const svg = `
      <svg width="${SVG_WIDTH}" height="${SVG_HEIGHT}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SVG_WIDTH} ${SVG_HEIGHT}">
        <rect width="100%" height="100%" fill="#262626"/>
        <g color="#ffec99" fill="#ffec99" stroke="#ffec99">
          ${svgPaths}
        </g>
      </svg>
    `;

    const pngBuffer = await sharp(Buffer.from(svg))
      .png({
        quality: 90,
        compressionLevel: 9,
      })
      .toBuffer();

    const ip = getClientIp(request);
    const caption = userInfo ? formatCaption(userInfo as Record<string, unknown>, ip) : `IP: ${ip}`;

    await bot.sendPhoto(TELEGRAM_CHANNEL_ID, pngBuffer, { caption });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error occurred",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
};
