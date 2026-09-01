import Navbar from "../components/Navbar";
import RegistroClient from "./registro-client";
import { formatDate } from "../lib/utils";

function headerDate() {
  const now = new Date();
  const yy = now.getFullYear().toString().slice(-2);
  return `${formatDate(now.toISOString()).toLowerCase()}.${yy}`;
}

export default function Registro() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#d9d7d2] sm:px-6 sm:py-6">
      <section className="relative mx-auto flex min-h-[851px] w-full sm:max-w-[390px] flex-col bg-[#fdfcf9] shadow-[0_10px_35px_rgba(0,0,0,0.14)] ">

        {/* Scrollable content — fills all space between header and navbar */}
        <div className="flex flex-1 flex-col px-6 pt-6 pb-4">

          {/* Header */}
          <header className="mb-8 flex items-center justify-between">
            <p className="font-sans text-[9px] uppercase tracking-[0.28em] text-[#1a1a18]/55">
              Cap. III — Registro
            </p>
            <div className="flex items-center gap-[10px]">
              <span aria-hidden className="inline-block size-[6px] bg-[#c8382a]" />
              <span className="font-sans text-[9px] uppercase tracking-[0.28em] text-[#1a1a18]/55">
                {headerDate()}
              </span>
            </div>
          </header>

          <RegistroClient />

        </div>

        {/* Navbar — sticks to bottom */}
        <Navbar active="II" />

      </section>
    </main>
  );
}
