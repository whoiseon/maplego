'use client';

import LinksHeader from '@/components/desktop/system/LinksHeader';
import styled from '@emotion/styled';
import { TalkSlug } from '@/app/talk/[...talkSlug]/page';
import { dummyTalkBoardList } from '@/components/desktop/talk/TalkHome';

interface Props {
  slug: TalkSlug;
}

function TalkBoard({ slug }: Props) {
  return (
    <Block>
      <LinksHeader title={slug.board} links={dummyTalkBoardList} />
    </Block>
  );
}

const Block = styled.div`
  display: flex;
  flex-direction: column;
`;

export default TalkBoard;
