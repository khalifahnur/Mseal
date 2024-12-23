
export const memberInfo = {
    id: "MS-2024-1234",
    name: "John Doe",
    memberSince: "2023-01-15",
    tier: "Bronze",
    pointsEarned: 450,
    pointsToNextTier: 550,
    expiryDate: "2024-12-31"
  };

  export const membershipTiers = {
    bronze: {
      name: "Bronze",
      price: "KSh 2,000",
      benefits: [
        "10% discount on match tickets",
        "Member-only entrance gate",
        "Official membership card",
        "Birthday gift"
      ]
    },
    silver: {
      name: "Silver",
      price: "KSh 5,000",
      benefits: [
        "20% discount on match tickets",
        "Priority ticket booking",
        "Member-only entrance gate",
        "Official membership card",
        "Birthday gift",
        "10% discount on merchandise"
      ]
    },
    gold: {
      name: "Gold",
      price: "KSh 10,000",
      benefits: [
        "30% discount on match tickets",
        "Priority ticket booking",
        "VIP entrance gate",
        "Premium membership card",
        "Birthday gift",
        "20% discount on merchandise",
        "Access to player meet & greets",
        "Reserved parking spot"
      ]
    }
  };

  export const mockTransactions = [
    { date: "2024-12-01", description: "Membership Renewal", amount: 199.99 },
    { date: "2024-11-15", description: "Match Ticket Purchase", amount: 45.00 },
    { date: "2024-10-30", description: "Merchandise Purchase", amount: 75.50 },
  ];