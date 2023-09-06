'use client';

import styled from '@emotion/styled';
import Card from '@/components/common/system/Card';
import { themedPalette } from '@/styles/palette';
import Button from '@/components/common/system/Button';
import React, { useMemo, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import TimerIcon from '@/assets/images/vectors/timer-icon.svg';
import HotIcon from '@/assets/images/vectors/hot-icon.svg';
import TenIcon from '@/assets/images/vectors/10-icon.svg';
import SearchInput from '@/components/common/system/SearchInput';
import { useInput } from '@/lib/hooks/useInput';

const dummySubLinks = [
  { name: '최신', query: '0', icon: <TimerIcon /> },
  { name: '인기', query: 'popular', icon: <HotIcon /> },
  { name: '10추', query: '10', icon: <TenIcon /> },
];

const dummySearchTargets: { value: string; label: string }[] = [
  { value: 'title', label: '제목' },
  { value: 'content', label: '내용' },
  { value: 'title_content', label: '제목+내용' },
  { value: 'display_name', label: '작성자' },
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

  const [searchQuery, onChangeSearchQuery] = useInput('');
  const [searchTarget, onChangeSearchTarget] = useInput('title');

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
              {link.icon}
              {link.name}
            </Button>
          </li>
        );
      }),
    [pathname, queryString],
  );

  const onSubmitSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(searchQuery, searchTarget);
  };

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
            <SearchInput
              selectOptions={dummySearchTargets}
              onSubmitSearch={onSubmitSearch}
              value={searchQuery}
              onChange={onChangeSearchQuery}
              selectValue={searchTarget}
              onChangeSelectValue={onChangeSearchTarget}
              placeholder="검색어를 입력해주세요"
            />
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
  padding: 8px 20px;
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
  gap: 0 2px;

  a {
    display: flex;
    align-items: center;
    gap: 0 4px;
    color: ${themedPalette.text3};

    svg {
      margin: 0;
    }

    &:hover {
      color: ${themedPalette.primary1};
    }

    &.active {
      color: ${themedPalette.primary2};
      font-weight: 600;
    }
  }
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
`;

export default LinksHeader;
