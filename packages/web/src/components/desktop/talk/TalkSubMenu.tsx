import SearchInput from '@/components/common/system/SearchInput';
import React, { useMemo } from 'react';
import styled from '@emotion/styled';
import { themedPalette } from '@/styles/palette';
import Button from '@/components/common/system/Button';
import TimerIcon from '@/assets/images/vectors/timer-icon.svg';
import HotIcon from '@/assets/images/vectors/hot-icon.svg';
import TenIcon from '@/assets/images/vectors/10-icon.svg';
import { useInput } from '@/lib/hooks/useInput';
import { usePathname, useSearchParams } from 'next/navigation';

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

function TalkSubMenu() {
  const [searchQuery, onChangeSearchQuery] = useInput('');
  const [searchTarget, onChangeSearchTarget] = useInput('title');

  const pathname = usePathname();
  const queryString = useSearchParams().get('sort');
  const isIndex = pathname === '/talk';

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

  if (isIndex) {
    return null;
  }

  return (
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
  );
}

const BoardToolBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  border-top: 1px solid ${themedPalette.border4};
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

export default TalkSubMenu;
