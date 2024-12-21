import Link from "next/link";
import Image from "next/image";

export default function LandingHeader() {
  const navItems = [
    { label: "NEWS", href: "#" },
    { label: "VIDEO", href: "#" },
    { label: "FIXTURES & RESULTS", href: "#" },
    { label: "TICKETS & HOSPITALITY", href: "#" },
    { label: "SHOP", href: "#" },
    { label: "MORE", href: "#" },
  ];

  return (
    <>
      <div className="bg-[#fae115] h-2 w-full"></div>
      <header className="text-black border-b border-gray-200">
        <div className="relative bg-black h-10 w-full" />
        <nav className="absolute w-[calc(100%-2.5rem)] bg-white left-5 h-12 top-15 -translate-y-1/2 px-4 flex items-center justify-between">
          <Link href="/" className="flex-shrink-0">
            <Image
              src="https://www.murangaseal.com/assets/logo-a25ccce319b09f73006dc94d71887dbd26f5afeec59c2fa5dca6afaf101fe82c.png"
              alt="Muranga Seals"
              width={100}
              height={100}
              className="h-24 w-auto absolute -top-7"
            />
          </Link>

          <div className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-semibold border-b-2 hover:border-b-[#fae115] text-[#fae115] transition-colors border-transparent"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <div className="border-l-2 border-black h-8 mt-2 mx-4" />
            <Link
              href="#"
              className=" flex flex-row justify-between text-sm font-semibold hover:text-gray-600 bg-[#e1e1e1] px-3 py-1 rounded"
            >
              <span>👥</span>
              JOIN
            </Link>
            <Link
              href="#"
              className="text-sm font-semibold hover:text-gray-600 bg-[#fae115] px-3 py-1 rounded"
            >
              LOGIN
            </Link>
            <div className="border-l-2 border-black h-8 mx-4 mt-2" />
            <div>sportpesa</div>
            <button className="lg:hidden" aria-label="Open menu">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </nav>
      </header>
    </>
  );
}
