'use client';

import MeCard from '@/components/desktop/profile/MeCard';
import styled from '@emotion/styled';
import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { useGetPointHistory } from '@/lib/hooks/queries/useGetPointHistory';
import dayjs from 'dayjs';
import { themedPalette } from '@/styles/palette';
import Pagination from '@/components/common/system/Pagination';
import { useGetMyAccount } from '@/lib/hooks/queries/useGetMyAccount';

function MPHistory() {
  const pageNumber = Number(useSearchParams().get('page')) || 1;
  const showCount: number = 10;
  const { data: meData } = useGetMyAccount();
  const [page, setPage] = useState<number>(pageNumber || 1);
  const { data: historyData } = useGetPointHistory(page, showCount);

  const totalPage =
    historyData?.payload?.totalCount &&
    Math.ceil(historyData.payload.totalCount / historyData?.payload?.showCount);

  useEffect(() => {
    if (pageNumber) {
      setPage(Number(pageNumber));
    } else {
      setPage(1);
    }
  }, [pageNumber]);

  const renderHistory = useMemo(() => {
    return historyData?.payload?.data.map((history) => {
      const pointType: string = history.point > 0 ? '획득' : '사용';
      const historyValue =
        pointType === '획득'
          ? meData!.mp - history.point
          : meData!.mp + history.point;
      const historySpecialValue = history.point > 0 ? '+' : '';

      return (
        <HistoryItem key={history.id}>
          <HistoryItemPointType pointType={pointType}>
            {pointType}
          </HistoryItemPointType>
          <HistoryItemContent>
            <p>{history.message}</p>
            <p>{dayjs(history.createdAt).format('YYYY. MM. DD HH:mm:ss')}</p>
          </HistoryItemContent>
          <HistoryItemPointValue pointType={pointType}>
            <p>
              {`${historySpecialValue} ` + history.point.toLocaleString()} MP
            </p>
            <p>{historyValue.toLocaleString()} MP</p>
          </HistoryItemPointValue>
        </HistoryItem>
      );
    });
  }, [historyData]);

  return (
    <MeCard>
      <Block>
        <ul>{renderHistory}</ul>
      </Block>
      <Pagination page={page} limit={showCount} totalPage={totalPage} />
    </MeCard>
  );
}

const Block = styled.div`
  display: flex;
  padding: 1.5rem;
  width: 100%;

  ul {
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 1rem 0;
  }
`;

const HistoryItem = styled.li`
  padding: 1rem;
  border-radius: 4px;
  border: 1px solid ${themedPalette.border3};
  background: ${themedPalette.bg_page1};
  box-shadow: ${themedPalette.shadow2};
  display: flex;
  width: 100%;
  align-items: center;
  gap: 0 1rem;
`;

const HistoryItemContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 4px 0;

  p:nth-of-type(1) {
    font-size: 16px;
    font-weight: 700;
  }

  p:nth-of-type(2) {
    color: ${themedPalette.text3};
    font-weight: 500;
    font-size: 12px;
  }
`;

const HistoryItemPointValue = styled.div<{ pointType: string }>`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  p:nth-of-type(1) {
    color: ${({ pointType }) =>
      pointType === '획득' ? themedPalette.primary2 : themedPalette.text3};
    font-weight: bold;
    font-size: 16px;
  }
  p:nth-of-type(2) {
    color: ${themedPalette.text3};
    font-weight: 500;
    font-size: 12px;
  }
`;

const HistoryItemPointType = styled.span<{ pointType: string }>`
  display: flex;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  background: ${({ pointType }) =>
    pointType === '획득' ? themedPalette.primary2 : themedPalette.text3};
  color: ${themedPalette.bg_page1};
  font-weight: bold;
  border: 2px solid ${themedPalette.button_border1};
  box-shadow: ${themedPalette.shadow2};
`;

export default MPHistory;
