"use client";

import { useState } from "react";
import { Reveal } from "./Reveal";
import { Crescent, Star } from "@/lib/stickers";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "done" | "error">("idle");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return setState("error");
    setState("done");
    setEmail("");
  }

  return (
    <section className="relative overflow-hidden border-t border-cream/8 px-5 py-24 sm:px-8 lg:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(55% 90% at 50% 120%, rgba(136,42,39,0.35), transparent 65%), radial-gradient(45% 60% at 50% -10%, rgba(21,29,67,0.9), transparent 70%)",
        }}
      />
      <Reveal className="mx-auto max-w-xl text-center">
        <Crescent className="mx-auto h-8 w-8 text-amber-glow" />
        <h2 className="mt-6 font-display text-[clamp(2rem,4.4vw,3rem)] leading-[1.05]">
          One new night,
          <br />
          <em className="italic text-amber-soft">every full moon.</em>
        </h2>
        <p className="mx-auto mt-4 max-w-md text-[0.92rem] leading-relaxed text-cream-dim">
          Subscribers get the new piece free for 24 hours before it goes on sale. No spam, no
          weekly noise — we write when there is art.
        </p>

        <form onSubmit={submit} className="mx-auto mt-8 flex max-w-md flex-col gap-2.5 sm:flex-row">
          <label htmlFor="news-email" className="sr-only">
            Email address
          </label>
          <input
            id="news-email"
            type="email"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setState("idle");
            }}
            placeholder="you@somewhere.after.dark"
            className="field text-center sm:text-left"
            aria-describedby="news-status"
          />
          <button type="submit" className="btn btn-crimson shrink-0">
            {state === "done" ? "You're on the list" : "Send me the moon"}
            {state === "done" && <Star size={11} />}
          </button>
        </form>
        <p
          id="news-status"
          aria-live="polite"
          className={`mt-3 h-4 text-[0.72rem] ${
            state === "error" ? "text-crimson-400" : "text-amber-soft"
          }`}
        >
          {state === "error" && "That email looks a little too moonlit. Try again?"}
          {state === "done" && "Welcome in. Check your inbox for a little something."}
        </p>
      </Reveal>
    </section>
  );
}
