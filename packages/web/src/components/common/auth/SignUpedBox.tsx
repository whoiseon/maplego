import styled from '@emotion/styled';
import WallPaper from '@/assets/images/vectors/wallpaper-01.svg';
import Button from '@/components/common/system/Button';

function SignUpedBox() {
  return (
    <Block>
      <ImageBox>
        <WallPaper />
        <h2>
          <b>메이플고</b>에 합류하신 것을 환영해요!
        </h2>
      </ImageBox>
      <Button layout="inline" href="/auth/signin">
        로그인 할게요!
      </Button>
    </Block>
  );
}

const Block = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  margin-top: 100px;
  gap: 32px;
`;

const ImageBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  h2 {
    font-size: 1rem;
  }
`;

export default SignUpedBox;
