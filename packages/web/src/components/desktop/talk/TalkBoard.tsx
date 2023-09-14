'use client';

import styled from '@emotion/styled';
import { TalkSlug } from '@/app/talk/[...talkSlug]/page';
import BoardList from '@/components/desktop/talk/BoardList';

interface Props {
  slug: TalkSlug;
}

function TalkBoard({ slug }: Props) {
  return (
    <Block>
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
