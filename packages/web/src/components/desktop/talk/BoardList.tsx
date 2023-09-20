'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { TalkSlug } from '@/app/talk/[...talkSlug]/page';
import styled from '@emotion/styled';
import Card from '@/components/common/system/Card';
import { themedPalette } from '@/styles/palette';
import ProfileBox from '@/components/common/user/ProfileBox';
import Pagination from '@/components/common/system/Pagination';

export interface PostItemModel {
  id: number;
  title: string;
  displayName: string;
  level: number;
  createdAt: Date;
  views: number;
}

interface PostResultModel {
  statusCode: string;
  message: string;
  payload: {
    showCount: number;
    pageNumber: number;
    totalCount: number;
    postList: PostItemModel[];
  };
}

const dummyPost: PostResultModel = {
  statusCode: '0',
  message: '',
  payload: {
    showCount: 2,
    pageNumber: 1,
    totalCount: 6,
    postList: [
      {
        id: 5,
        title: '메이플스토리 재밌어요',
        displayName: '진',
        level: 1,
        createdAt: new Date(),
        views: 10,
      },
      {
        id: 4,
        title: '인맥 구해요',
        displayName: '전지현',
        level: 1,
        createdAt: new Date(),
        views: 10,
      },
      {
        id: 3,
        title: '도깨비 망치 삼',
        displayName: '공유',
        level: 1,
        createdAt: new Date(),
        views: 10,
      },
      {
        id: 2,
        title: '뚜시뚜시',
        displayName: '이동욱',
        level: 1,
        createdAt: new Date(),
        views: 10,
      },
      {
        id: 1,
        title: '방가링 ㅋㅋㅋ',
        displayName: '남주혁',
        level: 1,
        createdAt: new Date(),
        views: 10,
      },
      {
        id: 0,
        title: '안녕하세요 여러분',
        displayName: '강동원',
        level: 1,
        createdAt: new Date(),
        views: 10,
      },
    ],
  },
};

interface Props {
  slug: TalkSlug;
}

function BoardList({ slug }: Props) {
  const { board, category } = slug;
  const sort = useSearchParams().get('sort');
  const pageNumber = Number(useSearchParams().get('page'));

  const [page, setPage] = useState<number>(pageNumber || 1);

  const postData = dummyPost;
  const totalPage =
    postData.payload.totalCount &&
    Math.ceil(postData.payload.totalCount / postData.payload.showCount);

  useEffect(() => {
    if (pageNumber) {
      setPage(Number(pageNumber));
    } else {
      setPage(1);
    }
  }, [pageNumber]);

  const renderPostList = useMemo(() => {
    return postData.payload.postList.map((post) => {
      return (
        <tr key={post.id}>
          <td>{post.id}</td>
          <td>{post.title}</td>
          <td>
            <ProfileBox displayName={post.displayName} level={post.level} />
          </td>
          <td>{post.createdAt.toLocaleDateString()}</td>
          <td>{post.views}</td>
          <td>0</td>
        </tr>
      );
    });
  }, [postData]);

  return (
    <Card>
      <StyledTable>
        <Thead>
          <tr>
            <th> </th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
            <th>추천수</th>
            <th>조회</th>
          </tr>
        </Thead>
        <Tbody>{renderPostList}</Tbody>
      </StyledTable>
      <Pagination page={page} limit={10} totalPage={totalPage} />
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
      width: 80px;
    }

    &:nth-of-type(2) {
    }

    &:nth-of-type(3) {
      width: 120px;
    }

    &:nth-of-type(4) {
      width: 86px;
    }

    &:nth-of-type(5) {
      width: 74px;
    }

    &:nth-of-type(6) {
      width: 74px;
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

    &:nth-of-type(2) {
      text-align: left;
      color: ${themedPalette.text1};
      font-size: 14px;
      font-weight: 600;
    }

    &:nth-of-type(3) {
      text-align: left;
    }
  }
`;

export default BoardList;
