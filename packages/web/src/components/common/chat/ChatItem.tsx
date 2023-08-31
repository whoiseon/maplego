import styled from '@emotion/styled';
import { themedPalette } from '@/styles/palette';
import ProfileBox from '@/components/common/user/ProfileBox';

interface Props {
  data: {
    displayName: string;
    level: number;
    body: string;
  };
}

function ChatItem({ data }: Props) {
  return (
    <li>
      <StyledItem>
        <ProfileBox level={data.level} displayName={data.displayName} />
        <Message>{data.body}</Message>
      </StyledItem>
    </li>
  );
}

const StyledItem = styled.div`
  position: relative;
  font-size: 14px;
`;

const Message = styled.span`
  color: ${themedPalette.text1};
  line-height: 1.5;
  padding-left: 6px;
  font-weight: 500;
  word-break: break-all;
`;

export default ChatItem;
