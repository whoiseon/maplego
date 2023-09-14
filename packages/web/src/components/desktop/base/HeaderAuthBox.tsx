import ThemeButton from '@/components/common/system/ThemeButton';
import Button from '@/components/common/system/Button';
import styled from '@emotion/styled';

function HeaderAuthBox() {
  return (
    <Block>
      <ThemeButton />
      <Button size="small" variant="text" href="/auth/signin">
        로그인
      </Button>
      <Button size="small" variant="primary" href="/auth/signup">
        가입하기
      </Button>
    </Block>
  );
}

const Block = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export default HeaderAuthBox;
