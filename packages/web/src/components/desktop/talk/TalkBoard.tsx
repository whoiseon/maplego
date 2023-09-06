'use client';

import LinksHeader from '@/components/desktop/system/LinksHeader';
import styled from '@emotion/styled';
import { TalkSlug } from '@/app/talk/[...talkSlug]/page';
import { dummyTalkBoardList } from '@/components/desktop/talk/TalkHome';
import { useSearchParams } from 'next/navigation';
import BoardList from '@/components/desktop/talk/BoardList';
import { useState } from 'react';

interface Props {
  slug: TalkSlug;
}

function TalkBoard({ slug }: Props) {
  return (
    <Block>
      <LinksHeader title={slug.board} links={dummyTalkBoardList} />
      <BoardList slug={slug} />
    </Block>
  );
}

const Block = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px 0;
`;

export default TalkBoard;
