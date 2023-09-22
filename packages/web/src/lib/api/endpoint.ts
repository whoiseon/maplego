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
};
