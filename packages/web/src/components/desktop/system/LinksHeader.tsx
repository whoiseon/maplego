'use client';

import styled from '@emotion/styled';
import Card from '@/components/common/system/Card';
import { themedPalette } from '@/styles/palette';
import Button from '@/components/common/system/Button';
import React, { ReactNode, useEffect, useMemo, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import TimerIcon from '@/assets/images/vectors/timer-icon.svg';
import HotIcon from '@/assets/images/vectors/hot-icon.svg';
import TenIcon from '@/assets/images/vectors/10-icon.svg';
import SearchInput from '@/components/common/system/SearchInput';
import { useInput } from '@/lib/hooks/useInput';

interface Props {
  title: string;
  description?: string;
  titleIcon?: ReactNode;
  links?: {
    name: string;
    href: string;
    description?: string;
  }[];
  subMenu?: ReactNode;
}

function LinksHeader({ title, titleIcon, description, links, subMenu }: Props) {
  const [boardDescription, setBoardDescription] = useState(description);
  const [boardName, setBoardName] = useState(title);

  const pathname = usePathname();

  const renderLinks = useMemo(() => {
    let updatedBoardDescription = description;
    let updatedBoardName = title;

    const renderedLinks = links?.map((link) => {
      const isActive = pathname.includes(link.href);
      if (isActive) {
        updatedBoardDescription = link.description;
        updatedBoardName = link.name;
      }

      return (
        <li key={link.name}>
          <Button
            href={`/${link.href}`}
            variant={isActive ? 'primary' : 'gray'}
            size="small"
          >
            {link.name}
          </Button>
        </li>
      );
    });

    setBoardDescription(updatedBoardDescription);
    setBoardName(updatedBoardName);

    return renderedLinks;
  }, [pathname, links, description, title]);

  return (
    <Card>
      <MainBlock>
        <TitleBox>
          <h2>
            {titleIcon && titleIcon}
            {boardName}
          </h2>
          {boardDescription && <span>{boardDescription}</span>}
        </TitleBox>
        {links && <LinksBox>{renderLinks}</LinksBox>}
      </MainBlock>
      {subMenu && subMenu}
    </Card>
  );
}

const MainBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px 0;
  padding: 20px;
`;

const TitleBox = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 0 8px;

  h2 {
    display: flex;
    align-items: center;
    gap: 0 6px;
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

    &:hover {
      transform: translateY(-1px);
    }
  }
`;

export default LinksHeader;
