import Link from "next/link";

const tabs = [
  { num: "I",   label: "teoria",   href: "/teoria" },
  { num: "II",  label: "deriva",   href: "/deriva/inicio" },
  { num: "III", label: "registro", href: "/registro" },
  { num: "IV",  label: "arquivo",  href: "/arquivo" },
];

type NavbarProps = {
  active: "I" | "II" | "III" | "IV";
};

export default function Navbar({ active }: NavbarProps) {
  return (
    <nav className="flex h-[62px] w-full items-center justify-center gap-[42px] bg-[#1a1a18] px-[30px]">
      {tabs.map((tab) => {
        const isActive = tab.num === active;
        return (
          <Link
            key={tab.num}
            href={tab.href}
            className={`flex min-w-fit flex-col items-center justify-center gap-1 py-3 border-t ${
              isActive ? "border-[#c8382a]" : "border-transparent"
            }`}
          >
            <span
              className={`font-editorial italic text-[10px] leading-[10px] ${
                isActive ? "text-[#c8382a]" : "text-[#928f8a]"
              }`}
            >
              {tab.num}
            </span>
            <span
              className={`font-sans uppercase text-[9px] tracking-[1.87px] leading-[12.75px] ${
                isActive ? "font-semibold text-white" : "text-[#928f8a]"
              }`}
            >
              {tab.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
