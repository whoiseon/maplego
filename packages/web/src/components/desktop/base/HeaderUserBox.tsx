import { useGetMyAccount } from '@/lib/hooks/useGetMyAccount';
import styled from '@emotion/styled';
import { themedPalette } from '@/styles/palette';
import UserProfile from '@/components/common/profile/UserProfile';

function HeaderUserBox() {
  return (
    <Block>
      <UserProfile size={38} />
    </Block>
  );
}

const Block = styled.div`
  display: flex;
  align-items: center;
  gap: 0 8px;

  .circle {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background-color: ${themedPalette.primary2};
  }
`;

export default HeaderUserBox;
