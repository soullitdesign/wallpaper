import Link from "next/link";
import { Crescent } from "@/lib/stickers";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-lg flex-col items-center justify-center px-6 text-center">
      <Crescent className="h-12 w-12 text-amber-glow/70" />
      <p className="eyebrow mt-6">404 · after hours</p>
      <h1 className="mt-4 font-display text-[clamp(2.2rem,6vw,3.4rem)] leading-[1.02]">
        This room is <em className="italic text-amber-soft">empty.</em>
      </h1>
      <p className="mt-4 text-[0.94rem] leading-relaxed text-cream-dim">
        The piece you were looking for has moved, or maybe never existed. The collection is still
        awake though.
      </p>
      <Link href="/#collection" className="btn btn-primary mt-8">
        Back to the collection
      </Link>
    </div>
  );
}
