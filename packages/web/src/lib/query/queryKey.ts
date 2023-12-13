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
  GET_GAME_UPDATE_NEWS_VIEW: (id: number, target?: string) => [
    'game',
    'updateNews',
    'view',
    'id',
    id || '',
    'target',
    target || '',
  ],
  GET_GAME_NOTICE: (target?: string, page?: number) => [
    'game',
    'notice',
    'target',
    target || '',
    'page',
    page || '',
  ],
  GET_GAME_NOTICE_VIEW: (id: number, target?: string) => [
    'game',
    'notice',
    'view',
    'id',
    id || '',
    'target',
    target || 'all',
  ],
  GET_GAME_RANK: (target?: string, page?: number, world?: number) => [
    'game',
    'rank',
    'target',
    target || 'all',
    'page',
    page || 1,
    'world',
    world || 0,
  ],
};
