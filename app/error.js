"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RefreshCw } from "lucide-react";

export default function ErrorPage({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="container-shell grid min-h-[62vh] place-items-center py-16 text-center">
      <div className="max-w-md">
        <p className="text-xs font-bold tracking-[0.2em] text-acid">SOMETHING WENT WRONG</p>
        <h1 className="mt-3 font-display text-4xl font-bold uppercase">THE SET WAS INTERRUPTED</h1>
        <p className="mt-4 text-sm leading-6 text-muted">We could not load this page. Try the request again or return to the library.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button type="button" onClick={reset} className="inline-flex items-center justify-center gap-2 bg-acid px-6 py-3 text-xs font-bold text-[#0c0d10]"><RefreshCw size={15} /> TRY AGAIN</button>
          <Link href="/" className="inline-flex items-center justify-center border border-[#374151] px-6 py-3 text-xs text-gray-100">GO HOME</Link>
        </div>
      </div>
    </main>
  );
}
