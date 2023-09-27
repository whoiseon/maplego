'use client';

import { useGetGameUpdateNewsView } from '@/lib/hooks/queries/game/useGetGameUpdateNewsView';
import { useParams, useSearchParams } from 'next/navigation';
import styled from '@emotion/styled';
import Card from '@/components/common/system/Card';
import CalendarIcon from '@/assets/images/vectors/view-calendar-icon.svg';
import Button from '@/components/common/system/Button';
import { themedPalette } from '@/styles/palette';

function MapleUpdateView() {
  const params = useParams();
  const searchParams = useSearchParams();
  const postId = Number(params.postId);
  const target = searchParams.get('target');

  const { data } = useGetGameUpdateNewsView(postId, target as string);

  return (
    <Block>
      <Card>
        <UpdateTitleBox>
          <TitleData>
            <Title>
              <i>Update</i>
              {data?.payload.title}
            </Title>
            <DateText>
              <CalendarIcon />
              {data?.payload.date}
            </DateText>
          </TitleData>
          <LinkBox>
            <Button href={data?.payload?.link} size="small" variant="gray">
              업데이트 바로가기
            </Button>
          </LinkBox>
        </UpdateTitleBox>
      </Card>
      <Card>
        <EventContentBox
          dangerouslySetInnerHTML={{ __html: data?.payload.content as string }}
        />
      </Card>
    </Block>
  );
}

const Block = styled.article`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const UpdateTitleBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px;
`;

const TitleData = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px 0;
`;

const Title = styled.h2`
  display: flex;
  align-items: center;
  gap: 0 6px;
  width: 100%;
  font-size: 20px;
  font-weight: 600;

  i {
    font-style: normal;
    font-size: 14px;
    font-weight: 700;
    color: ${themedPalette.success_text};
  }
`;

const LinkBox = styled.div``;

const DateText = styled.p`
  display: flex;
  align-items: center;
  gap: 0 4px;
  font-weight: 400;
  font-size: 13px;
  color: ${themedPalette.text3};

  svg {
    width: 16px;
    height: 16px;
    color: ${themedPalette.text4};
  }
`;

const EventContentBox = styled.div`
  position: relative;
  padding: 24px;

  img {
    object-fit: cover;
    max-width: 100%;
    height: auto;
    border-radius: 4px;
    box-shadow: ${themedPalette.shadow2};
  }
  p {
    font-family: 'Pretendard', sans-serif !important;
  }

  span {
    color: ${themedPalette.text1} !important;
    font-family: 'Pretendard', sans-serif !important;

    &.NormalTextRun,
    &.EOP {
      background-color: ${themedPalette.bg_element4} !important;
    }
  }

  font {
    color: ${themedPalette.text1} !important;
  }

  table {
    margin: 2rem auto !important;
    tbody {
      tr:nth-of-type(1) {
        td {
          background: ${themedPalette.bg_element4} !important;
        }
      }

      td {
        border-color: ${themedPalette.border3} !important;
      }
    }
  }

  div#sec_1 {
    img:nth-of-type(2) {
      top: 8540px !important;
      left: 49.8% !important;
      box-shadow: none !important;
      width: 80% !important;
    }
  }
`;

export default MapleUpdateView;
