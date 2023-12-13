export const endpoint = {
  // base
  get base() {
    const { NODE_ENV } = process.env;
    if (NODE_ENV === 'development') {
      return 'http://localhost:8080/api';
    }
    return 'https://maplego.me/api';
  },

  // auth
  get auth() {
    return {
      signIn: `${this.base}/auth/signin`,
      signOut: `${this.base}/auth/signout`,
      signUp: `${this.base}/auth/signup`,
      refresh: `${this.base}/auth/refresh`,
      changePassword: `${this.base}/auth/password`,
      checkDisplayName: `${this.base}/auth/exist/displayName`,
      sendmail: `${this.base}/auth/sendmail`,
      verify: `${this.base}/auth/verify`,
    };
  },

  // me
  get me() {
    return {
      getMe: `${this.base}/me`,
      getMeAll: `${this.base}/me/all`,
    };
  },

  // user
  get user() {
    return {
      updateProfile: `${this.base}/user/profile`,
    };
  },

  // point (MP)
  get point() {
    return {
      getPointHistory: `${this.base}/point/history`,
    };
  },

  // upload
  get upload() {
    return {
      profile: `${this.base}/upload/profile`,
    };
  },

  // game
  get game() {
    return {
      events: `${this.base}/game/events`,
      eventView: (id: number) => `${this.base}/game/event/${id}`,
      updateNews: (target?: string, page?: number) => {
        let url = `${this.base}/game/update`;
        if (target && page) {
          url += `?target=${target}&page=${page}`;
        }
        if (target && !page) {
          url += `?target=${target}`;
        }
        if (!target && page) {
          url += `?page=${page}`;
        }
        return url;
      },
      updateNewsView: (id: number, target?: string) => {
        let url = `${this.base}/game/update/${id}`;
        if (target) {
          url += `?target=${target}`;
        }
        return url;
      },
      notice: (target?: string, page?: number) => {
        let url = `${this.base}/game/notice`;
        if (target && page) {
          url += `?target=${target}&page=${page}`;
        }
        if (target && !page) {
          url += `?target=${target}`;
        }
        if (!target && page) {
          url += `?page=${page}`;
        }
        return url;
      },
      noticeView: (id: number, target?: string) => {
        let url = `${this.base}/game/notice/${id}`;
        if (target) {
          url += `?target=${target}`;
        }
        return url;
      },
      rank: (target?: string, page?: number, world?: number) => {
        const url = new URLSearchParams({
          target: target || 'all',
          page: page?.toString() || '1',
          w: world?.toString() || '0',
        });

        return `${this.base}/game/rank?${url.toString()}`;
      },
    };
  },
};
