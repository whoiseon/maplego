export const parseUrl = {
  update: {
    normal: 'https://maplestory.nexon.com/News/Update',
    tespia: 'https://maplestory.nexon.com/Testworld/Update',
    cashShop: 'https://maplestory.nexon.com/News/CashShop/Sale',
    view: {
      normal: (id: number) => `https://maplestory.nexon.com/News/Update/${id}`,
      tespia: (id: number) =>
        `https://maplestory.nexon.com/Testworld/Update/${id}`,
      cashShop: (id: number) =>
        `https://maplestory.nexon.com/News/CashShop/Sale/${id}`,
    },
  },
  event: {
    normal: 'https://maplestory.nexon.com/News/Event',
    view: {
      normal: (id: number) =>
        `https://maplestory.nexon.com/News/Event/Ongoing/${id}`,
    },
  },
};
