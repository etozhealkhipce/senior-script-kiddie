import type { APIRoute } from "astro";
import TelegramBot from "node-telegram-bot-api";
import sharp from "sharp";

export const prerender = false;

const TELEGRAM_BOT_TOKEN = import.meta.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHANNEL_ID = import.meta.env.TELEGRAM_CHANNEL_ID;
const SVG_WIDTH = 1920;
const SVG_HEIGHT = 1080;

const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: false });

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { paths } = body;

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

    await bot.sendPhoto(TELEGRAM_CHANNEL_ID, pngBuffer);

    return new Response(
      JSON.stringify({
        success: true,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
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
