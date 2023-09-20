import { useGetMyAccount } from '@/lib/hooks/queries/useGetMyAccount';
import styled from '@emotion/styled';
import { themedPalette } from '@/styles/palette';
import UserProfile from '@/components/common/profile/UserProfile';
import HeaderMpBox from '@/components/desktop/base/HeaderMpBox';

interface Props {
  mp: number;
}

function HeaderUserBox({ mp }: Props) {
  return (
    <Block>
      <HeaderMpBox point={mp} />
      <UserProfile size={38} />
    </Block>
  );
}

const Block = styled.div`
  display: flex;
  align-items: center;
  gap: 0 0.5rem;

  .circle {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background-color: ${themedPalette.primary2};
  }
`;

export default HeaderUserBox;
