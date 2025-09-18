import Image from "next/image";

export default function BlobImage() {
  const cardImage = "/assets/stack-cards.png"; 



  return (
    <div
      className="relative w-full h-[300px] sm:h-[400px] md:h-[450px]"

    >
      {/* <div className="absolute inset-0 rounded-3xl bg-opacity-30 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-40" />
      </div> */}

      <div className="absolute inset-0 flex items-center justify-center">
<Image
                    src={cardImage || "/placeholder.svg"}
                    alt="Murang'a Seals Membership Card"
                    fill
                    className="object-fill rounded-2xl"
                    priority
                  />    
      </div>
    </div>
  );
}