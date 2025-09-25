type PromoHeaderProps = {
  membershipTier: string | undefined | null;
};

export default function PromoHeader({ membershipTier }: PromoHeaderProps) {
  const discount = membershipTier === 'gold' ? '30%' : membershipTier === 'silver' ? '20%' : null;
  if (!discount) return null;

  return (
    <div className="bg-gradient-to-r from-black to-primary text-white py-4 px-6 text-center">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="text-xl md:text-2xl font-serif italic">Limited Time Offer</div>
        <div className="text-2xl md:text-3xl font-bold my-2 md:my-0">UP TO {discount} OFF</div>
        
      </div>
    </div>
  );
}