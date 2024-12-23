import Image from "next/image";

export default function MembershipSection() {
  return (
    <main className="bg-white text-black min-h-[calc(100vh-4rem)]">
      <div className="container mx-10 px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-8 items-center justify-center">
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold mb-2 text-black">
                MSEAL FC OFFICIAL MEMBERSHIP
              </h1>
              <h2 className="text-4xl font-bold text-[#fae115]">Adult</h2>
            </div>

            <p className="text-lg text-gray-700">
              No matter where you are in the world, there is a Membership
              designed to cater to Reds of all ages.
            </p>

            <div className="space-y-4">
              <button className="bg-[#fae115] text-black px-6 py-2 font-bold rounded-lg hover:bg-[#e5cd13] transition-colors shadow-md transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#fae115] focus:ring-opacity-50 flex items-center">
                JOIN NOW
                <svg
                  className="ml-2 w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5-5 5M6 12h12"
                  />
                </svg>
              </button>
              <p className="text-sm">
                Already a Member?{" "}
                <span className="text-[#fae115] hover:underline cursor-pointer font-semibold">
                  LOG IN HERE
                </span>
              </p>
            </div>
          </div>

          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <Image
              src="/placeholder.svg"
              alt="Liverpool FC players celebrating"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </main>
  );
}