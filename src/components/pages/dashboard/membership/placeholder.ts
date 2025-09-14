export const memberInfo = {
  id: "MS-2024-1234",
  name: "John Doe",
  memberSince: "2023-01-15",
  tier: "Bronze",
  pointsEarned: 450,
  pointsToNextTier: 550,
  expiryDate: "2024-12-31",
};

export const membershipTiers = {
  ordinary: {
    name: "Ordinary",
    price: "Ksh 500",
    benefits: [
      "Annual registration included",
      "Official membership card",
      "Dedicated member entrance (faster entry) ",
    ],
  },
  bronze: {
    name: "Bronze",
    price: "Ksh 2,000",
    benefits: [
      "Annual registration included",
      "10% discount on match tickets",
      "Official membership card",
      "5% discount on merchandise",
      "Dedicated member entrance (faster entry) ",
      "Member-only pre-sale access to big matches",
    ],
  },
  silver: {
    name: "Silver",
    price: "KSh 5,000",
    benefits: [
      "Annual registration included",
      "Annual pass to ordinary stand for all home matches",
      "Official membership card",
      "Opportunity to upgrade to VIP stand during games",
      "Dedicated member entrance (faster entry) ",
      "Member-only pre-sale access to limited edition merchandise",
      "10% discount on merchandise",
    ],
  },
  gold: {
    name: "Gold",
    price: "KSh 10,000",
    benefits: [
      " Annual registration included",
      "Annual pass to VIP stand for all home matches",
      "Premium membership card",
      "Guaranteed big match access",
      "VIP entrance gate + reserved parking + bumper sticker",
      "Member-only pre-sale access to limited edition merchandise",
      "20% merchandise discount",
      "Access to player meet & greets and special events",
    ],
  },
};

export const mockTransactions = [
  { date: "2024-12-01", description: "Membership Renewal", amount: 199.99 },
  { date: "2024-11-15", description: "Match Ticket Purchase", amount: 45.0 },
  { date: "2024-10-30", description: "Merchandise Purchase", amount: 75.5 },
];
