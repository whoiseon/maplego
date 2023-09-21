import { AppResponse, MaplePoint } from '@/lib/api/types';

export interface MaplePointHistoryParams {
  page: number;
  show: number;
  target: string;
  startDate: string;
  endDate: string;
  accessToken?: string;
}

export interface MaplePointHistoryResponse extends AppResponse {
  payload: {
    showCount: number;
    totalCount: number;
    pageNumber: number;
    data: MaplePoint[];
  };
}
