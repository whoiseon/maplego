import { usePathname, useSearchParams } from 'next/navigation';
import styled from '@emotion/styled';
import { useMemo } from 'react';
import Card from '@/components/common/system/Card';
import Image from 'next/image';
import { themedPalette } from '@/styles/palette';
import Link from 'next/link';
import CalendarIcon from '@/assets/images/vectors/view-calendar-icon.svg';
import Button from '@/components/common/system/Button';

interface Props {
  list: any;
}

function MapleGalleryList({ list }: Props) {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  const target = searchParams.get('target');
  const isEmpty = list?.payload?.data?.length <= 0;
  const isLastPage = list?.payload?.data?.length < 10;
  const pathname = usePathname();

  const viewPath = (id: number) => {
    let path = `/maple/update/${id}`;

    if (target) {
      path += `?target=${target}`;
    }

    if (page > 1) {
      path += `${target ? '&' : '?'}page=${page}`;
    }

    return path;
  };

  const renderList = useMemo(() => {
    return list?.payload?.data?.map((item: any) => (
      <Card key={item.id}>
        <ItemBox>
          <Thumbnail>
            <Link href={viewPath(item.id)}>
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
              <Link href={viewPath(item.id)}>{item.title[0]}</Link>
            </p>
            <h2>
              <Link href={viewPath(item.id)}>{item.title[1]}</Link>
            </h2>
          </DataBox>
          <DateBox>
            <CalendarIcon />
            {item.date}
          </DateBox>
        </ItemBox>
      </Card>
    ));
  }, [target, page]);

  const pagePath = (page: number) => {
    if (target) {
      return `${pathname}?target=${target}&page=${page}`;
    } else {
      return `${pathname}?page=${page}`;
    }
  };

  if (isEmpty) {
    return (
      <EmptyBlock>
        <h2>업데이트 내역이 없습니다.</h2>
      </EmptyBlock>
    );
  }

  return (
    <Block>
      <GridBox>{renderList}</GridBox>
      {!isEmpty && (
        <Pagination>
          <ActionsBox>
            {page > 1 && (
              <Button href={pagePath(page - 1)} variant="gray" size="small">
                이전
              </Button>
            )}
            {!isLastPage && (
              <Button href={pagePath(page + 1)} variant="gray" size="small">
                다음
              </Button>
            )}
          </ActionsBox>
        </Pagination>
      )}
    </Block>
  );
}

const Block = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const GridBox = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;
`;

const EmptyBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;

  h2 {
    font-size: 20px;
    font-weight: 600;
    color: ${themedPalette.text4};
  }
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
    width: 16px;
    height: 16px;
    color: ${themedPalette.text4};
  }
`;

const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const ActionsBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0 0.5rem;
`;

export default MapleGalleryList;
