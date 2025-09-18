import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Star, Crown, Award, Shield, HelpCircle, FileText, Gift } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export function MegaMenu() {
  const [isOpen, setIsOpen] = useState(false);

  // Close menu on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      window.addEventListener('scroll', handleScroll, { passive: true });
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isOpen]);

  const membershipTiers = [
    {
      name: "Standard",
      icon: Shield,
      description: "Perfect for getting started",
      color: "text-slate-600",
      bgColor: "bg-slate-50 hover:bg-slate-100",
      borderColor: "border-slate-200"
    },
    {
      name: "Bronze",
      icon: Award,
      description: "Enhanced features & benefits",
      color: "text-amber-700",
      bgColor: "bg-amber-50 hover:bg-amber-100",
      borderColor: "border-amber-200"
    },
    {
      name: "Silver",
      icon: Star,
      description: "Premium access & rewards",
      color: "text-slate-500",
      bgColor: "bg-slate-50 hover:bg-slate-100",
      borderColor: "border-slate-300"
    },
    {
      name: "Gold",
      icon: Crown,
      description: "Ultimate experience & perks",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50 hover:bg-yellow-100",
      borderColor: "border-yellow-300"
    }
  ];

  const infoLinks = [
    {
      name: "Membership Benefits",
      href: "/#pricing",
      icon: Gift,
      description: "Explore all your perks"
    },
    {
      name: "Frequently Asked Questions",
      href: "/#pricing",
      icon: HelpCircle,
      description: "Get answers quickly"
    },
    {
      name: "Terms & Conditions",
      href: "/#pricing",
      icon: FileText,
      description: "Important information"
    }
  ];

  return (
    <div
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="group relative text-sm font-semibold border-b-2 hover:border-b-primary text-primary transition-colors border-transparent"
          >
            MEMBERSHIPS
            <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
          </Button>
        </DropdownMenuTrigger>
        
        <DropdownMenuContent 
          className="w-[700px] max-w-[90vw] p-0 border-0 shadow-2xl bg-white/95 backdrop-blur-sm"
          align="start"
          sideOffset={8}
        >
          <div className="bg-gradient-to-br from-slate-50 via-white to-blue-50/30 rounded-xl border border-slate-200/50">
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                
                {/* Membership Tiers */}
                <div className="lg:col-span-3">
                  <h3 className="text-base font-semibold text-slate-900 mb-4 flex items-center">
                    <Crown className="h-4 w-4 mr-2 text-slate-600" />
                    Membership Tiers
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {membershipTiers.map((tier) => {
                      const IconComponent = tier.icon;
                      return (
                        <a
                          key={tier.name}
                          href="#pricing"
                          className={`group relative p-4 rounded-lg border transition-all duration-300 ${tier.bgColor} ${tier.borderColor} hover:shadow-md hover:scale-[1.02]`}
                        >
                          <div className="flex items-start space-x-3">
                            <div className={`p-1.5 rounded-md ${tier.bgColor.replace('50', '100').replace('hover:bg-', 'bg-')} ${tier.color}`}>
                              <IconComponent className="h-4 w-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className={`font-semibold text-sm ${tier.color} group-hover:text-slate-900 transition-colors`}>
                                {tier.name}
                              </h4>
                              <p className="text-xs text-slate-500 mt-0.5">
                                {tier.description}
                              </p>
                            </div>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </div>

                {/* Information Links */}
                <div className="lg:col-span-2">
                  <h3 className="text-base font-semibold text-slate-900 mb-4 flex items-center">
                    <HelpCircle className="h-4 w-4 mr-2 text-slate-600" />
                    Support & Info
                  </h3>
                  
                  <div className="space-y-2">
                    {infoLinks.map((link) => {
                      const IconComponent = link.icon;
                      return (
                        <a
                          key={link.name}
                          href={link.href}
                          className="group flex items-start space-x-3 p-3 rounded-md hover:bg-white/80 hover:shadow-sm transition-all duration-200 border border-transparent hover:border-slate-200"
                        >
                          <div className="p-1.5 rounded-md bg-slate-100 text-slate-600 group-hover:bg-blue-100 group-hover:text-primary transition-colors">
                            <IconComponent className="h-3.5 w-3.5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-slate-900 text-sm group-hover:text-primary transition-colors">
                              {link.name}
                            </h4>
                            <p className="text-xs text-slate-500 mt-0.5">
                              {link.description}
                            </p>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer CTA */}
            <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-t border-slate-100 rounded-b-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-900">
                    Ready to get started?
                  </p>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Join thousands of satisfied members
                  </p>
                </div>
                <Link href={'#pricing'}>
                <Button className="bg-primary hover:bg-primary text-white px-5 py-2 text-sm font-medium shadow-md hover:shadow-lg transition-all duration-200">
                  View Plans
                </Button>
                </Link>
              </div>
            </div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}