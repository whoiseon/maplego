export const queryKey = {
  // base
  IS_SIGNED_IN: ['isSignedIn'],

  // auth
  GET_ME: ['me'],

  // point
  GET_POINT_HISTORY: (
    page: number,
    target: string,
    startDate: string,
    endDate: string,
  ) => [
    'point',
    'history',
    'page',
    page,
    'target',
    target,
    'startDate',
    startDate,
    'endDate',
    endDate,
  ],
};
