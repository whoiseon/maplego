'use client';

import styled from '@emotion/styled';
import Card from '@/components/common/system/Card';
import { useParams } from 'next/navigation';
import { useGetGameEventView } from '@/lib/hooks/queries/game/useGetGameEventView';
import { themedPalette } from '@/styles/palette';
import CalendarIcon from '@/assets/images/vectors/view-calendar-icon.svg';

function MapleEventView() {
  const eventId = Number(useParams().eventId);
  const { data } = useGetGameEventView(eventId);

  return (
    <Block>
      <Card>
        <EventTitleBox>
          <Title>
            <i>Event</i>
            {data?.payload.title}
          </Title>
          <DateText>
            <CalendarIcon />
            {data?.payload.startDate} ~ {data?.payload.endDate}
          </DateText>
        </EventTitleBox>
      </Card>
      <Card>
        <EventContentBox>
          <img src={data?.payload.content} alt={data?.payload.title} />
        </EventContentBox>
      </Card>
    </Block>
  );
}

const Block = styled.article`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const EventTitleBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem 0;
  padding: 24px;
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
    color: ${themedPalette.primary2};
  }
`;

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
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 24px;

  img {
    border-radius: 4px;
    box-shadow: ${themedPalette.shadow2};
  }
`;

export default MapleEventView;
