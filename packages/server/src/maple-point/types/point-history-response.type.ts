interface MaplePoint {
  id: number;
  point: number;
  prevPoint: number;
  message: string;
  createdAt: string;
}

export interface MaplePointHistoryResponse {
  showCount: number;
  totalCount: number;
  pageNumber: number;
  data: MaplePoint[];
}
