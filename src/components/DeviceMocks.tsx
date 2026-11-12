import type { Wallpaper } from "@/lib/wallpapers";

export function PhoneMock({
  wallpaper,
  className = "",
  compact = false,
  priority = false,
}: {
  wallpaper: Wallpaper;
  className?: string;
  compact?: boolean;
  priority?: boolean;
}) {
  return (
    <div
      className={`relative aspect-[9/19.4] w-full rounded-[2.7rem] border border-white/15 bg-[#050507] p-[6px] shadow-[0_40px_90px_-20px_rgba(0,0,0,0.9),inset_0_0_0_1px_rgba(255,255,255,0.06)] ${className}`}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[2.25rem] bg-coal">
        <img
          key={wallpaper.slug}
          src={`/img/wallpapers/${wallpaper.slug}-full.webp`}
          alt={`${wallpaper.title} on a phone lock screen`}
          loading={priority ? "eager" : "lazy"}
          className="absolute inset-0 h-full w-full animate-[fade-in_.55s_ease_both] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/0 to-black/60" />

        {/* status bar */}
        <div className="absolute inset-x-0 top-0 flex items-center justify-between px-5 pt-3 text-[8px] font-medium text-white/90">
          <span className="tracking-tight">9:41</span>
          <span className="flex items-center gap-1">
            <svg width="11" height="8" viewBox="0 0 11 8" fill="currentColor" aria-hidden="true">
              <rect x="0" y="5" width="2" height="3" rx=".5" />
              <rect x="3" y="3.5" width="2" height="4.5" rx=".5" />
              <rect x="6" y="2" width="2" height="6" rx=".5" />
              <rect x="9" y="0" width="2" height="8" rx=".5" opacity=".4" />
            </svg>
            <svg width="10" height="8" viewBox="0 0 10 8" fill="currentColor" aria-hidden="true">
              <path d="M5 7.6 1 3.4a5.8 5.8 0 0 1 8 0L5 7.6Z" />
            </svg>
            <svg width="14" height="7" viewBox="0 0 14 7" fill="none" aria-hidden="true">
              <rect x=".5" y=".5" width="11" height="6" rx="1.6" stroke="currentColor" opacity=".6" />
              <rect x="2" y="2" width="7" height="3" rx=".8" fill="currentColor" />
              <path d="M13 2.5v2" stroke="currentColor" strokeLinecap="round" opacity=".6" />
            </svg>
          </span>
        </div>

        {/* notch */}
        <div className="absolute left-1/2 top-[9px] h-[18px] w-[74px] -translate-x-1/2 rounded-full bg-black/90" />

        {/* clock */}
        <div className={`absolute inset-x-0 ${compact ? "top-[15%]" : "top-[13%]"} text-center text-white`}>
          <p className="text-[10px] font-medium tracking-[0.16em] text-white/70 uppercase">Tue, Nov 12</p>
          <p
            className="font-display leading-none tracking-[-0.03em]"
            style={{ fontSize: compact ? "2.6rem" : "3.4rem" }}
          >
            11:11
          </p>
        </div>

        {/* bottom actions */}
        <div className="absolute inset-x-0 bottom-4 flex items-end justify-between px-6">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-black/35 text-white/85 backdrop-blur-md">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M9 3h6l1 5a4 4 0 1 1-8 0l1-5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
              <path d="M12 13v7m-3 0h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </span>
          <span className="grid h-8 w-8 place-items-center rounded-full bg-black/35 text-white/85 backdrop-blur-md">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M4 8.5A2.5 2.5 0 0 1 6.5 6h1L9 4h6l1.5 2h1A2.5 2.5 0 0 1 20 8.5v8A2.5 2.5 0 0 1 17.5 19h-11A2.5 2.5 0 0 1 4 16.5v-8Z" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="12" cy="12.5" r="3" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}

export function DesktopMock({
  wallpaper,
  className = "",
  priority = false,
}: {
  wallpaper: Wallpaper;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div
      className={`relative aspect-[16/10] w-full overflow-hidden rounded-[0.9rem] border border-white/12 bg-[#0b0b0e] p-[5px] shadow-[0_40px_100px_-30px_rgba(0,0,0,0.9)] ${className}`}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[0.6rem]">
        <img
          key={wallpaper.slug}
          src={`/img/wallpapers/${wallpaper.slug}-full.webp`}
          alt={`${wallpaper.title} as a desktop wallpaper`}
          loading={priority ? "eager" : "lazy"}
          className="absolute inset-0 h-full w-full animate-[fade-in_.55s_ease_both] object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/20" />
        <div className="absolute inset-x-0 top-0 flex h-6 items-center justify-between border-b border-white/10 bg-black/35 px-3 text-[9px] text-white/75 backdrop-blur-md">
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-amber/80" />
            <span className="font-medium tracking-tight">Nocturne</span>
            <span className="hidden text-white/45 sm:inline">File · Edit · View · Window</span>
          </span>
          <span className="flex items-center gap-2 text-white/50">
            <span className="hidden sm:inline">Tue 12 Nov</span>
            <span className="text-white/80">11:11</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export function TabletMock({
  wallpaper,
  className = "",
}: {
  wallpaper: Wallpaper;
  className?: string;
}) {
  return (
    <div
      className={`relative aspect-[3/4] w-full rounded-[1.6rem] border border-white/15 bg-[#050507] p-[6px] shadow-[0_40px_90px_-25px_rgba(0,0,0,0.9)] ${className}`}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[1.2rem]">
        <img
          key={wallpaper.slug}
          src={`/img/wallpapers/${wallpaper.slug}-full.webp`}
          alt={`${wallpaper.title} as a tablet wallpaper`}
          loading="lazy"
          className="absolute inset-0 h-full w-full animate-[fade-in_.55s_ease_both] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/45" />
        <div className="absolute inset-x-0 top-0 flex items-center justify-between px-4 pt-2.5 text-[8px] text-white/80">
          <span>9:41</span>
          <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
        </div>
        <p className="absolute inset-x-0 top-[18%] text-center font-display text-3xl leading-none text-white">
          11:11
        </p>
      </div>
    </div>
  );
}
