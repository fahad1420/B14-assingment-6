import Image from "next/image";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-[#171a21] bg-[#090a0d]">
      <div className="container-shell flex min-h-24 flex-col items-center justify-between gap-4 py-8 sm:flex-row">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" width={20} height={20} alt="" />
          <span className="font-display text-sm font-bold tracking-wide">FITLOG</span>
        </div>
        <p className="text-center text-xs text-muted">© 2026 FitLog — Workout Library. Train hard, log honest.</p>
      </div>
    </footer>
  );
}
