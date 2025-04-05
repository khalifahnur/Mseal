import Image from "next/image";
import BlobImage from "./BlobImage";
import Link from "next/link";

const trustedRes = [
  { id: 1, imgUrl: "/trustedres/estilo.jpeg", name: "Estilo" },
  { id: 2, imgUrl: "/trustedres/blitong.jpeg", name: "Blitong" },
  { id: 3, imgUrl: "/trustedres/food.jpeg", name: "Food Co" },
  { id: 4, imgUrl: "/trustedres/hotgrill.jpeg", name: "Hot Grill" },
  { id: 5, imgUrl: "/trustedres/sokhaku.jpeg", name: "Sokhaku" },
  { id: 6, imgUrl: "/trustedres/thai.jpeg", name: "Thai Cuisine" },
  { id: 7, imgUrl: "/trustedres/mafe.jpeg", name: "Mafe" },
]

export default function MembershipSection() {
  return (
    <section className="bg-gradient-to-b from-white to-gray-100 text-black min-h-[calc(100vh-4rem)] w-full">
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 max-w-xl">
            <div>
              <h3 className="text-sm sm:text-base font-semibold text-gray-600 uppercase tracking-wider mb-2">
                Official Membership
              </h3>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 text-black">
                MURANGA SEAL FC
              </h1>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#fae115] flex items-center">
                Adult Membership
                <span className="ml-2 bg-[#fae115] text-black text-xs px-2 py-1 rounded-full">
                  2025 SEASON
                </span>
              </h2>
            </div>

            <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
              Join the pride of Muranga and experience football like never before with exclusive member benefits including:
            </p>
            
            {/* <ul className="space-y-3">
              {[
                "Priority match ticket access",
                "Official merchandise discounts",
                "Members-only events with players",
                "Digital membership card",
                "Match day experiences"
              ].map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <svg className="h-5 w-5 text-[#fae115] mt-0.5 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul> */}

            <div className="pt-4 space-y-5">
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/SignUp" className="w-full sm:w-auto">
                  <button className="w-full bg-[#fae115] text-black px-8 py-3 font-bold rounded-lg hover:bg-yellow-400 transition-all duration-300 shadow-lg transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#fae115] focus:ring-opacity-50 flex items-center justify-center">
                    JOIN NOW
                    <svg className="ml-2 w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5-5 5M6 12h12" />
                    </svg>
                  </button>
                </Link>
                
                <Link href="/Pricing" className="w-full sm:w-auto">
                  <button className="w-full bg-transparent border-2 border-gray-300 text-gray-700 px-8 py-3 font-bold rounded-lg hover:border-gray-500 hover:text-black transition-all duration-300 flex items-center justify-center">
                    VIEW PLANS
                  </button>
                </Link>
              </div>

              <div className="text-base flex items-center">
                <svg className="h-5 w-5 text-gray-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Already a member?{" "}
                <Link href="/SignIn" className="text-[#fae115] hover:underline cursor-pointer font-semibold ml-1">
                  LOG IN HERE
                </Link>
              </div>
            </div>
          </div>
          <BlobImage />
        </div>
      </div>
    </section>
  );
}