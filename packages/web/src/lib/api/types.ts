export interface User {
  id: number;
  username: string;
  displayName: string;
  introduction: string;
  profileImage: string;
  lastLogin: Date;
  email: string;
  level: number;
  createdAt: Date;
  updatedAt: Date;
  displayNameChangedAt: Date;
  mp: number;
}

export interface MaplePoint {
  id: number;
  point: number;
  prevPoint: number;
  message: string;
  createdAt: Date;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface AppResponse {
  name: string;
  statusCode: number;
  message: string;
  payload: any;
}

export interface GameEvent {
  id: number;
  title: string;
  link: string;
  thumbnail: string;
  startDate: string;
  endDate: string;
  diffDays: number;
}

export interface GameEventView {
  title: string;
  startDate: string;
  endDate: string;
  content: string;
}

export interface GameUpdateNews {
  id: number;
  title: string[];
  link: string;
  date: string;
  thumbnail: string;
  isNew: boolean;
}

export interface GameUpdateNewsView {
  title: string;
  date: string;
  link: string;
  content: string;
}

export interface GameNotice {
  id: number;
  title: string;
  link: string;
  date: string;
  target: string;
}

export interface GameNoticeView {
  id: number;
  title: string;
  target: string;
  date: string;
  link: string;
  content: string;
}

export interface GameCharacterRank {
  rank: string;
  characterImage: string;
  server: string;
  characterName: string;
  jobName: string;
  level?: number;
  exp?: string;
  pop?: string;
  guild?: string;
  record?: string;
  clearTime?: string;
  unionLevel?: string;
  unionPower?: string;
}
