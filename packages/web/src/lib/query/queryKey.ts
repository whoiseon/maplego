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

  // game
  GET_GAME_EVENT: ['game', 'event'],
  GET_GAME_EVENT_VIEW: (id: number) => ['game', 'event', 'id', id],
  GET_GAME_UPDATE_NEWS: (target?: string, page?: number) => [
    'game',
    'updateNews',
    'target',
    target || '',
    'page',
    page || '',
  ],
};
