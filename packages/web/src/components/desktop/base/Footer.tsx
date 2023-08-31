'use client';

import styled from '@emotion/styled';
import { themedPalette } from '@/styles/palette';
import LogoTextGray from '@/assets/images/vectors/logo-text-gray.svg';
import ScrollTopArrowIcon from '@/assets/images/vectors/scroll-top-arrow.svg';

function Footer() {
  const onClickScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <StyledFooter>
      <FooterComment>
        <Container>
          <CommentWrapper>
            <span>
              메이플스토리 커뮤니티 <i>메이플고</i>에 오신 것을 환영합니다.
            </span>
            <ScrollTopButton onClick={onClickScrollTop}>
              <ScrollTopArrowIcon />
            </ScrollTopButton>
          </CommentWrapper>
        </Container>
      </FooterComment>
      <FooterContent>
        <Container className="footer-content">
          <ContentWrapper>
            <LogoTextGray />
            <ContentComment>
              메이플고(maplego)는 넥슨 코리아(NEXON korea)와 관련이 없습니다.
              <br />
              메이플고(maplego)는 불법적인 정보를 제공하거나 불법적인 사이트를
              알선하지 않습니다.
            </ContentComment>
            <CopyrightText>© MAPLEGO. All rights reserved.</CopyrightText>
          </ContentWrapper>
        </Container>
      </FooterContent>
    </StyledFooter>
  );
}

const StyledFooter = styled.footer`
  min-width: 1320px;
  height: auto;
  background-color: ${themedPalette.bg_page3};
  border-top: 1px solid ${themedPalette.border4};
`;

const Container = styled.div`
  display: flex;
  align-content: center;
  justify-content: space-between;
  min-width: 1320px;
  width: 1320px;
  height: 100%;
  padding: 0 1.25rem;
  margin: 0 auto;

  &.footer-content {
    padding: 2rem 1.25rem 4rem;
  }
`;

const FooterComment = styled.div``;

const CommentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
  flex: 1;

  span {
    font-size: 14px;
    color: ${themedPalette.text2};

    i {
      font-style: normal;
      color: ${themedPalette.primary2};
      font-weight: 700;
    }
  }
`;

const FooterContent = styled.div`
  border-top: 1px solid ${themedPalette.border4};

  svg {
    opacity: 0.5;
    width: 96px;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem 0;
`;

const ContentComment = styled.p`
  font-size: 14px;
  line-height: 1.5;
  color: ${themedPalette.text3};
`;

const CopyrightText = styled.span`
  font-size: 14px;
  color: ${themedPalette.text3};
`;

const ScrollTopButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border: 1px solid ${themedPalette.border3};
  box-shadow: ${themedPalette.shadow3};
  background: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.125s ease-in-out;

  &:hover {
    background-color: ${themedPalette.bg_element2};

    svg {
      color: ${themedPalette.text1};
    }
  }

  svg {
    color: ${themedPalette.text4};
    width: 20px;
    transition: color 0.125s ease-in-out;
  }
`;

export default Footer;
