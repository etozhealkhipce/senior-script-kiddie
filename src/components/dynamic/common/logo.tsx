import { LogoSVG } from "./logo-svg";

export const Logo = () => {
  return (
    <div className="w-full max-w-[140px] sm:max-w-[180px] md:max-w-[220px] lg:max-w-[253px] h-auto static lg:fixed top-14 left-14">
      <LogoSVG animate={false} />
    </div>
  );
};
