import { MaplePoint } from '@prisma/client';

export interface MaplePointHistoryResponse {
  showCount: number;
  totalCount: number;
  pageNumber: number;
  data: MaplePoint[];
}
