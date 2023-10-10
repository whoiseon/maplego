import { useMemo, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Card from '@/components/common/system/Card';
import styled from '@emotion/styled';
import { themedPalette } from '@/styles/palette';
import Link from 'next/link';
import Button from '@/components/common/system/Button';
import NewBadge from '@/components/common/system/NewBadge';

interface Props {
  list: any;
  route: string;
  category?: string;
}

function MapleBoardList({ list, route, category }: Props) {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  const target = searchParams.get('target');
  const isEmpty = list?.payload?.data?.length <= 0;
  const isLastPage = list?.payload?.data?.length < 10;

  const viewPath = (id: number) => {
    let path = `/maple/${route}/${id}`;

    if (target) {
      path += `?target=${target}`;
    }

    if (page > 1) {
      path += `${target ? '&' : '?'}page=${page}`;
    }

    return path;
  };

  const translateRoute = (route: string) => {
    switch (route) {
      case 'update':
        return '업데이트';
      case 'notice':
        return '공지사항';
      default:
        return '업데이트';
    }
  };
  const renderList = useMemo(() => {
    if (isEmpty) {
      return (
        <tr>
          <td className="empty-list" colSpan={3}>
            {translateRoute(route)} 내역이 없습니다.
          </td>
        </tr>
      );
    }

    return list?.payload?.data?.map((item: any) => {
      return (
        <tr key={item.id}>
          <td className={item.isNew ? 'new' : ''}>{category || item.target}</td>
          <td className={item.isNew ? 'new' : ''}>
            <Link href={viewPath(item.id)}>{item.title}</Link>
            {item.isNew && <NewBadge />}
          </td>
          <td className={item.isNew ? 'new' : ''}>{item.date}</td>
        </tr>
      );
    });
  }, [page, list, route]);

  const pathname = usePathname();

  const asPath =
    pathname +
    `${searchParams.toString() !== '' ? '?' + searchParams.toString() : ''}`;

  const pagePath = (page: number) => {
    if (target) {
      return `${pathname}?target=${target}&page=${page}`;
    } else {
      return `${pathname}?page=${page}`;
    }
  };

  return (
    <Card>
      <StyledTable>
        <Thead>
          <tr>
            <th> </th>
            <th>제목</th>
            <th>날짜</th>
          </tr>
        </Thead>
        <Tbody>{renderList}</Tbody>
      </StyledTable>
      {!isEmpty && (
        <Pagination>
          <ActionsBox>
            {page > 1 && (
              <Button href={pagePath(page - 1)} variant="gray" size="small">
                이전
              </Button>
            )}
            {!isLastPage && (
              <Button href={pagePath(page + 1)} variant="gray" size="small">
                다음
              </Button>
            )}
          </ActionsBox>
        </Pagination>
      )}
    </Card>
  );
}

const StyledTable = styled.table`
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
`;

const Thead = styled.thead`
  th {
    height: 46px;
    color: ${themedPalette.text4};
    font-size: 13px;
    font-weight: 500;
    border-bottom: 1px solid ${themedPalette.border3};

    &:nth-of-type(1) {
      width: 100px;
    }

    &:nth-of-type(2) {
    }

    &:nth-of-type(3) {
      width: 140px;
    }
  }
`;

const Tbody = styled.tbody`
  td {
    height: 56px;
    color: ${themedPalette.text3};
    font-size: 13px;
    text-align: center;
    border-bottom: 1px solid ${themedPalette.border4};
    padding: 0 8px;
    font-weight: 500;

    &:nth-of-type(1) {
      &.new {
        color: ${themedPalette.text1};
        font-weight: bold;
      }
    }

    &:nth-of-type(2) {
      display: flex;
      align-items: center;
      gap: 0 4px;
      text-align: left;
      color: ${themedPalette.text2};
      font-size: 14px;
      font-weight: 500;
      padding: 0 20px;

      &.new {
        color: ${themedPalette.text1};
        font-weight: bold;
      }

      a {
        color: inherit;
        &:hover {
          text-decoration: underline;
        }
      }
    }

    &:nth-of-type(3) {
      &.new {
        color: ${themedPalette.text1};
        font-weight: bold;
      }
    }

    &.empty-list {
      text-align: center;
      font-size: 16px;
      height: 100px;
    }
  }
`;

const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 20px;
`;

const ActionsBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0 0.5rem;
`;

export default MapleBoardList;
