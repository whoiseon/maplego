import { useSearchParams } from 'next/navigation';
import styled from '@emotion/styled';
import { useMemo } from 'react';
import Card from '@/components/common/system/Card';
import Image from 'next/image';
import { themedPalette } from '@/styles/palette';
import Link from 'next/link';
import TimerIcon from '@/assets/images/vectors/timer-icon.svg';

interface Props {
  list: any;
}

function MapleGalleryList({ list }: Props) {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  const target = searchParams.get('target');
  const isEmpty = list?.payload?.data?.length <= 0;

  const renderList = useMemo(() => {
    if (isEmpty) {
      return <div className="empty-list">업데이트 내역이 없습니다.</div>;
    }

    return list?.payload?.data?.map((item: any) => (
      <Card key={item.id}>
        <ItemBox>
          <Thumbnail>
            <Link href={`/maple/update/${item.id}`}>
              <Image
                src={item.thumbnail}
                alt={item.title}
                width={428}
                height={116}
                priority={true}
              />
            </Link>
          </Thumbnail>
          <DataBox>
            <p>
              <Link href={`/maple/update/${item.id}`}>{item.title[0]}</Link>
            </p>
            <h2>
              <Link href={`/maple/update/${item.id}`}>{item.title[1]}</Link>
            </h2>
          </DataBox>
          <DateBox>
            <TimerIcon />
            {item.date}
          </DateBox>
        </ItemBox>
      </Card>
    ));
  }, []);

  return <Block>{renderList}</Block>;
}

const Block = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;
`;

const ItemBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const Thumbnail = styled.div`
  overflow: hidden;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border-bottom: 1px solid ${themedPalette.border4};
  height: 116px;

  img {
    transition: transform 0.2s ease-in-out;

    &:hover {
      transform: scale(1.03);
    }
  }
`;

const DataBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 6px 0;

  p {
    color: ${themedPalette.text3};
    font-size: 14px;
  }
  h2 {
    font-size: 16px;
  }

  a {
    color: inherit;
  }
`;

const DateBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0 4px;
  padding: 12px 0;
  border-top: 1px solid ${themedPalette.border4};
  background: ${themedPalette.bg_element3};
  font-size: 12px;
  color: ${themedPalette.text3};

  svg {
    width: 18px;
    height: 18px;
  }
`;

export default MapleGalleryList;
