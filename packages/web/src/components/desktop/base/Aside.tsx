import styled from '@emotion/styled';
import Card from '@/components/common/system/Card';
import ChatCard from '@/components/desktop/chat/ChatCard';

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

export default Aside;
