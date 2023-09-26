'use client';

import MeCard from '@/components/desktop/profile/MeCard';
import styled from '@emotion/styled';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { useGetPointHistory } from '@/lib/hooks/queries/mp/useGetPointHistory';
import { themedPalette } from '@/styles/palette';
import Pagination from '@/components/common/system/Pagination';
import { useGetMyAccount } from '@/lib/hooks/queries/me/useGetMyAccount';
import Button from '@/components/common/system/Button';
import DatePicker from '@/components/common/system/DatePicker';
import { format } from 'date-fns';
import { formatDate } from '@/lib/formatDate';

function MPHistory() {
  const pageNumber = Number(useSearchParams().get('page')) || 1;
  const showCount: number = 20;
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { data: meData } = useGetMyAccount();
  const [page, setPage] = useState<number>(pageNumber || 1);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const { data: historyData } = useGetPointHistory({
    page,
    show: showCount,
    target: searchParams.get('target') || '',
    startDate: searchParams.get('start') || '',
    endDate: searchParams.get('end') || '',
  });

  const onChangeStartDate = (date: Date) => setStartDate(date);
  const onChangeEndDate = (date: Date) => setEndDate(date);

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
    if (historyData!.payload?.data?.length <= 0) {
      return (
        <HistoryEmptyItem>
          <h2>포인트 내역이 없습니다.</h2>
        </HistoryEmptyItem>
      );
    }

    return historyData?.payload?.data?.map((history) => {
      const pointType: string = history.point > 0 ? '획득' : '사용';
      const historySpecialValue = history.point > 0 ? '+' : '';

      return (
        <HistoryItem key={history.id}>
          <HistoryItemPointType pointType={pointType}>
            {pointType}
          </HistoryItemPointType>
          <HistoryItemContent>
            <p>{history.message}</p>
            <p>{formatDate(history.createdAt)}</p>
          </HistoryItemContent>
          <HistoryItemPointValue pointType={pointType}>
            <p>
              {`${historySpecialValue}` + history.point.toLocaleString()} MP
            </p>
            <p>{history.prevPoint.toLocaleString()} MP</p>
          </HistoryItemPointValue>
        </HistoryItem>
      );
    });
  }, [historyData]);

  const asPath =
    pathname +
    `${searchParams.toString() !== '' ? '?' + searchParams.toString() : ''}`;

  const hrefTarget = (target: string): string => {
    // 정규식으로 URL에 target이 있는지 확인
    const regex = /target=[a-z]+/g;
    const targetRegex = regex.exec(asPath);

    // 정규식으로 현재 URL에 QUERY가 있는지 확인
    const regex2 = /\?/g;
    const queryRegex = regex2.exec(asPath);

    if (!queryRegex) {
      return `${asPath}?target=${target}`;
    }

    if (target === '') {
      if (targetRegex) {
        return asPath.replace(targetRegex[0], '').slice(0, -1);
      }

      return asPath;
    } else {
      if (targetRegex) {
        return asPath.replace(targetRegex[0], `target=${target}`);
      }

      return `${asPath}&target=${target}`;
    }
  };

  return (
    <MeCard>
      <HistoryOptionBox>
        <TypeSelectBox>
          <Button
            className={!searchParams.get('target') ? 'active' : ''}
            href={hrefTarget('')}
            size="small"
            variant="text"
          >
            전체
          </Button>
          <Button
            className={searchParams.get('target') === 'get' ? 'active' : ''}
            href={hrefTarget('get')}
            size="small"
            variant="text"
          >
            획득
          </Button>
          <Button
            className={searchParams.get('target') === 'use' ? 'active' : ''}
            href={hrefTarget('use')}
            size="small"
            variant="text"
          >
            사용
          </Button>
        </TypeSelectBox>
        <DatePickerBox>
          <DatePickerGroup>
            <DatePicker
              dateState={startDate}
              onChange={onChangeStartDate}
              position="left"
            />
            <DatePicker
              dateState={endDate}
              onChange={onChangeEndDate}
              position="right"
            />
          </DatePickerGroup>
          <Button
            href={`${pathname}?start=${format(
              startDate,
              'yyyy-MM-dd',
            )}&end=${format(endDate, 'yyyy-MM-dd')}`}
            size="small"
            variant="primary"
          >
            조회
          </Button>
        </DatePickerBox>
      </HistoryOptionBox>
      <Block>
        <ul>{renderHistory}</ul>
      </Block>
      {historyData!.payload?.data?.length > 0 && (
        <Pagination page={page} limit={showCount} totalPage={totalPage} />
      )}
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
    gap: 12px 0;
  }
`;

const HistoryOptionBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${themedPalette.border4};
  padding: 12px 24px;

  h2 {
    font-size: 14px;
    font-weight: 500;
    em {
      font-style: normal;
      font-weight: 700;
      color: ${themedPalette.primary2};
    }
  }
`;

const TypeSelectBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0 0.5rem;

  a {
    &:hover {
      background-color: ${themedPalette.bg_element4};
    }

    &.active {
      color: ${themedPalette.primary2};
    }
  }
`;

const DatePickerBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0 0.5rem;
`;

const DatePickerGroup = styled.div`
  display: flex;
  align-items: center;
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

const HistoryEmptyItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;

  h2 {
    padding: 1rem 0;
    font-size: 1rem;
    color: ${themedPalette.text4};
  }
`;

const HistoryItemContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 4px 0;

  p:nth-of-type(1) {
    font-size: 16px;
    font-weight: 600;
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
    font-weight: 500;
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
  font-weight: 700;
  font-size: 14px;
  border: 1px solid ${themedPalette.button_border1};
  box-shadow: ${themedPalette.shadow2};
`;

export default MPHistory;
