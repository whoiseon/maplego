'use client';

import MapleLayout from '@/components/desktop/maple/MapleLayout';
import styled from '@emotion/styled';
import Card from '@/components/common/system/Card';
import { themedPalette } from '@/styles/palette';
import { useGetGameEvent } from '@/lib/hooks/queries/game/useGetGameEvent';
import { useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';

function MapleEvent() {
  const { data } = useGetGameEvent();

  const renderEventList = useMemo(
    () =>
      data?.payload?.map((item) => (
        <EventItem key={item.id}>
          <LeftBox>
            <EventThumbnail>
              <Link href={`/maple/event/${item.id}`}>
                <Image
                  src={item.thumbnail}
                  alt={item.title}
                  width={285}
                  height={120}
                  priority={true}
                />
              </Link>
            </EventThumbnail>
            <EventData>
              <Link href={`/maple/event/${item.id}`}>{item.title}</Link>
              <p>
                {item.startDate} ~ {item.endDate}
              </p>
            </EventData>
          </LeftBox>
          <RightBox>
            <DiffDateCard>{item.diffDays}일 남음</DiffDateCard>
          </RightBox>
        </EventItem>
      )),
    [],
  );

  return (
    <MapleLayout>
      <Block>
        <Card>
          <CardTitleBox>
            <h2>진행중인 이벤트</h2>
          </CardTitleBox>
          {renderEventList}
        </Card>
      </Block>
    </MapleLayout>
  );
}

const Block = styled.article`
  display: flex;
`;

const CardTitleBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${themedPalette.bg_page1};
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  padding: 8px 0;
  border-bottom: 1px solid ${themedPalette.border4};

  h2 {
    font-size: 14px;
    font-weight: 600;
  }
`;

const EventItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;

  border-bottom: 1px solid ${themedPalette.border4};

  &:last-of-type {
    border-bottom: none;
  }
`;

const LeftBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0 1rem;
`;

const RightBox = styled.div``;

const EventThumbnail = styled.div`
  width: 285px;
  height: 120px;
  overflow: hidden;
  border-radius: 4px;

  a {
    img {
      border-radius: 4px;
      box-shadow: ${themedPalette.shadow2};
      transition: all 0.2s ease-in-out;
    }

    &:hover {
      img {
        transform: scale(1.03);
      }
    }
  }
`;

const EventData = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem 0;

  a {
    font-size: 16px;
    color: ${themedPalette.text1};

    &:hover {
      text-decoration: underline;
    }
  }

  p {
    font-size: 14px;
    color: ${themedPalette.text3};
  }
`;

const DiffDateCard = styled.div`
  font-size: 12px;
  padding: 6px 14px;
  background: ${themedPalette.bg_page1};
  border-radius: 4px;
  border: 1px solid ${themedPalette.border3};
  box-shadow: ${themedPalette.shadow2};
`;

export default MapleEvent;
