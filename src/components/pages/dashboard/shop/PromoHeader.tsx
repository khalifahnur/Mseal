export default function PromoHeader() {
    return (
      <div className="bg-gradient-to-r from-black to-primary text-white py-4 px-6 text-center">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="text-xl md:text-2xl font-serif italic">Limited Time Offer</div>
          <div className="text-2xl md:text-3xl font-bold my-2 md:my-0">UP TO 30% OFF</div>
          <div className="text-sm md:text-base">Selected Lines Only</div>
          <div className="mt-2 md:mt-0">
            <span className="bg-white text-blue-900 font-bold px-4 py-2 rounded"></span>
          </div>
        </div>
      </div>
    )
  }
  