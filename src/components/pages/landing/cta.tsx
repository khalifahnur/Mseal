import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="opensans py-16 bg-[#000] text-primary-foreground">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Don&apos;t miss out on the action!
        </h2>
        <p className="text-xl mb-8">
          Experience Murang&apos;a Seals like never before.
        </p>
        <div className="space-x-4">
          <Button size="lg" variant="secondary" className="bg-primary">
            Secure Your Membership
          </Button>
        </div>
      </div>
    </section>
  );
}
