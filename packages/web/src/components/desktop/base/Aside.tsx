import styled from '@emotion/styled';
import ChatCard from '@/components/desktop/chat/ChatCard';
import { memo } from 'react';

function Aside() {
  return (
    <StyledAside>
      <ChatCard />
    </StyledAside>
  );
}

const StyledAside = styled.aside`
  position: sticky;
  top: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem 0;
  width: 380px;
  min-width: 380px;
`;

export default memo(Aside);
