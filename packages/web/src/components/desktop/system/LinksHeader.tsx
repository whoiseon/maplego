'use client';

import styled from '@emotion/styled';
import Card from '@/components/common/system/Card';
import { themedPalette } from '@/styles/palette';
import Button from '@/components/common/system/Button';
import { useMemo, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Input from '@/components/common/system/Input';

const dummySubLinks = [
  { name: '최신', query: '0' },
  { name: '인기', query: 'popular' },
  { name: '10추', query: '10' },
];

interface Props {
  title: string;
  description?: string;
  links?: {
    name: string;
    href: string;
    description?: string;
  }[];
}

function LinksHeader({ title, description, links }: Props) {
  const [boardDescription, setBoardDescription] = useState(description);
  const [boardName, setBoardName] = useState(title);
  const pathname = usePathname();
  const queryString = useSearchParams().get('sort');

  const isBoard =
    pathname.includes('/talk') &&
    pathname.substring(1).split('/')[1] !== undefined;

  const renderLinks = useMemo(
    () =>
      links?.map((link) => {
        const isActive = pathname.includes(link.href);
        if (isActive) {
          setBoardDescription(link.description);
          setBoardName(link.name);
        }
        return (
          <li key={link.name}>
            <Button
              href={`/talk/${link.href}`}
              variant={isActive ? 'primary' : 'gray'}
              size="small"
            >
              {link.name}
            </Button>
          </li>
        );
      }),
    [pathname],
  );

  const renderSubLinks = useMemo(
    () =>
      dummySubLinks.map((link) => {
        const isActive =
          queryString === link.query || (!queryString && link.query === '0');
        const href =
          link.query !== '0' ? `${pathname}?sort=${link.query}` : pathname;

        return (
          <li key={link.name}>
            <Button
              className={isActive ? 'active' : ''}
              href={href}
              variant="text"
              size="small"
            >
              {link.name}
            </Button>
          </li>
        );
      }),
    [pathname, queryString],
  );

  return (
    <Card>
      <MainBlock>
        <TitleBox>
          <h2>{boardName}</h2>
          {boardDescription && <span>{boardDescription}</span>}
        </TitleBox>
        {links && <LinksBox>{renderLinks}</LinksBox>}
      </MainBlock>
      {isBoard && (
        <BoardToolBox>
          <SubLinksBox>{renderSubLinks}</SubLinksBox>
          <SearchBox>
            <Input placeholder="검색어를 입력해주세요" />
          </SearchBox>
        </BoardToolBox>
      )}
    </Card>
  );
}

const MainBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px 0;
  padding: 20px;
`;

const BoardToolBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  border-top: 1px solid ${themedPalette.border4};
`;

const TitleBox = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 0 8px;

  h2 {
    font-size: 18px;
    font-weight: 700;
    color: ${themedPalette.text1};
  }

  span {
    font-size: 14px;
    color: ${themedPalette.text3};
  }
`;

const LinksBox = styled.ul`
  display: flex;
  align-items: center;
  gap: 0 8px;

  a {
    height: 32px;
  }
`;

const SubLinksBox = styled.ul`
  display: flex;
  align-items: center;
  gap: 0 8px;

  a {
    height: 46px;
    color: ${themedPalette.text3};
    border-radius: 0;

    &.active {
      color: ${themedPalette.primary2};
      font-weight: 600;
    }
  }
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;

  input {
    font-size: 14px;
    height: 36px;
  }
`;

export default LinksHeader;
