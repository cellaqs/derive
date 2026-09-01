import Navbar from "../components/Navbar";
import ArquivoClient from "./arquivo-client";
import { HeaderDate } from "../components/ui/header-date";

export default function Arquivo() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#d9d7d2] sm:px-6 sm:py-6">
      <section className="relative mx-auto flex min-h-[851px] w-full sm:max-w-[390px] flex-col bg-[#fdfcf9] shadow-[0_10px_35px_rgba(0,0,0,0.14)] ">

        <div className="flex flex-1 flex-col px-5 pt-5 pb-4">
          {/* Header */}
          <header className="mb-8 flex items-center justify-between">
            <p className="font-sans text-[9px] uppercase tracking-[2.52px] text-[#6a6962]">
              cap. IV — arquivo
            </p>
            <div className="flex items-center gap-[10px]">
              <span aria-hidden className="inline-block size-[6px] bg-[#c8382a]" />
              <HeaderDate className="font-sans text-[9px] uppercase tracking-[2.52px] text-[#6a6962]" />
            </div>
          </header>

          <ArquivoClient />
        </div>

        <Navbar active="III" />
      </section>
    </main>
  );
}
