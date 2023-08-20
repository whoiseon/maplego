export const endpoint = {
  // base
  get base() {
    return 'http://localhost:3065/api';
  },

  // auth
  get auth() {
    return {
      signin: `${this.base}/auth/signin`,
      signout: `${this.base}/auth/signout`,
      signup: `${this.base}/auth/signup`,
      refresh: `${this.base}/auth/refresh`,
    };
  },

  // me
  get me() {
    return `${this.base}/me`;
  },
};
