export const endpoint = {
  // base
  get base() {
    return 'http://maplego.me/api';
  },

  // auth
  get auth() {
    return {
      signIn: `${this.base}/auth/signin`,
      signOut: `${this.base}/auth/signout`,
      signup: `${this.base}/auth/signup`,
      refresh: `${this.base}/auth/refresh`,
    };
  },

  // me
  get me() {
    return `${this.base}/me`;
  },
};
