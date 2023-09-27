'use client';

import { ReactNode, useMemo } from 'react';
import styled from '@emotion/styled';
import { useGoBack } from '@/lib/hooks/useGoBack';
import Button from '@/components/common/system/Button';
import Logo from '@/components/common/base/Logo';
import { useGetGameEvent } from '@/lib/hooks/queries/game/useGetGameEvent';
import Card from '@/components/common/system/Card';
import { themedPalette } from '@/styles/palette';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { GameEvent } from '@/lib/api/types';

function UpdateViewLayout({ children }: { children: ReactNode }) {
  const { data: eventList } = useGetGameEvent();
  const params = useParams();

  // 나를 제외한 이벤트 리스트
  // const eventListExceptMe = useMemo(() => {
  //   return eventList?.payload?.filter((item) => item.id !== eventId);
  // }, [eventList]);

  const goBack = useGoBack();

  // const renderEventList = useMemo(
  //   () =>
  //     eventListExceptMe?.map((item) => (
  //       <Card key={item.id}>
  //         <EventItem>
  //           <LeftBox>
  //             <EventThumbnail>
  //               <Link href={`/maple/event/${item.id}`}>
  //                 <Image
  //                   src={item.thumbnail}
  //                   alt={item.title}
  //                   width={285}
  //                   height={120}
  //                   priority={true}
  //                 />
  //               </Link>
  //             </EventThumbnail>
  //             <EventData>
  //               <Link href={`/maple/event/${item.id}`}>{item.title}</Link>
  //               <p>
  //                 {item.startDate} ~ {item.endDate}
  //               </p>
  //             </EventData>
  //           </LeftBox>
  //           <RightBox>
  //             <DiffDateCard>{item.diffDays}일 남음</DiffDateCard>
  //           </RightBox>
  //         </EventItem>
  //       </Card>
  //     )),
  //   [],
  // );

  return (
    <Block>
      <EventActionsBox>
        <ViewTitleBox>
          <Logo
            type="icon"
            style={{
              width: '22px',
              height: '22px',
            }}
          />
          <h2>업데이트</h2>
        </ViewTitleBox>
        <Button variant="gray" size="small" onClick={goBack}>
          목록으로
        </Button>
      </EventActionsBox>
      {children}
    </Block>
  );
}

const Block = styled.section`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ViewTitleBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0 0.5rem;

  h2 {
    font-size: 18px;
  }
`;

const EventActionsBox = styled.article`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const EventList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px 0;
`;

const EventItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
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

export default UpdateViewLayout;
