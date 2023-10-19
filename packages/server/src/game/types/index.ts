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
