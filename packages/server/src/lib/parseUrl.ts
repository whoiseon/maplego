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
  notice: {
    all: 'https://maplestory.nexon.com/News/Notice/All',
    notice: 'https://maplestory.nexon.com/News/Notice/Notice',
    inspection: 'https://maplestory.nexon.com/News/Notice/Inspection',
    gmDiary: 'https://maplestory.nexon.com/News/GMDiary',
    view: {
      all: (id: number) => `https://maplestory.nexon.com/News/Notice/All/${id}`,
      notice: (id: number) =>
        `https://maplestory.nexon.com/News/Notice/Notice/${id}`,
      inspection: (id: number) =>
        `https://maplestory.nexon.com/News/Notice/Inspection/${id}`,
      gmDiary: (id: number) =>
        `https://maplestory.nexon.com/News/GMDiary/${id}`,
    },
  },
  rank: {
    all: (page: number, world: number) =>
      `https://maplestory.nexon.com/N23Ranking/World/Total?page=${
        page || 1
      }&w=${world || 0}`,
    dojang: (page: number, world: number) =>
      `https://maplestory.nexon.com/N23Ranking/Contents/Dojang/ThisWeek?page=${
        page || 1
      }&w=${world || 0}&t=2`,
    seed: (page: number, world: number) =>
      `https://maplestory.nexon.com/N23Ranking/Contents/Seed/thisWeek?page=${
        page || 1
      }&w=${world || 0}`,
    pop: (page: number, world: number) =>
      `https://maplestory.nexon.com/N23Ranking/World/Pop?page=${page || 1}&w=${
        world || 0
      }`,
    union: (page: number, world: number) =>
      `https://maplestory.nexon.com/N23Ranking/World/Union?page=${
        page || 1
      }&w=${world || 0}`,
  },
};
