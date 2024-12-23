export const mockUserSettings = {
    profile: {
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1234567890",
      address: "123 Fan Street, Football City, FC12 3XX",
      profilePicture: "https://img.icons8.com/bubbles/100/user.png",
    },
    membership: {
      type: "Gold Member",
      expiryDate: "2025-12-31",
      paymentMethod: "**** **** **** 1234",
    },
    notifications: {
      email: {
        matchUpdates: true,
        ticketSales: true,
        clubNews: false,
      },
      push: {
        matchUpdates: true,
        ticketSales: false,
        clubNews: true,
      },
      sms: {
        matchUpdates: false,
        ticketSales: false,
        clubNews: false,
      },
    },
    privacy: {
      dataSharing: true,
      socialSharing: false,
    },
    appSettings: {
      language: "English",
      theme: "light",
      fontSize: "medium",
    },
    security: {
      twoFactorEnabled: false,
    },
  };
  
  