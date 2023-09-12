import { themedPalette } from '@/styles/palette';
import styled from '@emotion/styled';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

interface Props {
  totalPage?: number;
  limit: number;
  page: number;
}

function Pagination({ totalPage, limit, page }: Props) {
  const pathname = usePathname();

  const [currentPageArray, setCurrentPageArray] = useState<
    number[] | undefined
  >([]);
  const [totalPageArray, setTotalPageArray] = useState<number[][] | undefined>(
    [],
  );

  const sliceArrayByLimit = useCallback(
    (totalPage: number | undefined, limit: number) => {
      if (totalPage) {
        const totalPageArray = Array(totalPage)
          .fill(null)
          .map((_, i) => i);

        return Array(Math.ceil(totalPage / limit))
          .fill(null)
          .map(() => totalPageArray.splice(0, limit));
      }
    },
    [],
  );

  useEffect(() => {
    if (totalPageArray) {
      if (page % limit === 1) {
        setCurrentPageArray(totalPageArray[Math.floor(page / limit)]);
      } else if (page % limit === 0) {
        setCurrentPageArray(totalPageArray[Math.floor(page / limit) - 1]);
      }
    }
  }, [page, limit]);

  useEffect(() => {
    const slicedPageArray = sliceArrayByLimit(totalPage, limit);

    if (slicedPageArray) {
      setTotalPageArray(slicedPageArray);
      setCurrentPageArray(slicedPageArray[0]);
    }
  }, [totalPage, limit]);

  return (
    <StyledPagination>
      {!(page === 1) && (
        <StyledLink className="prev" href={`${pathname}?page=${page - 1}`}>
          이전
        </StyledLink>
      )}
      {currentPageArray?.map((i: number) => {
        return (
          <StyledLink
            key={i}
            href={`${pathname}?page=${i + 1}`}
            style={
              page === i + 1
                ? {
                    backgroundColor: themedPalette.primary2,
                    color: themedPalette.button_text1,
                    fontWeight: 700,
                  }
                : {}
            }
          >
            {i + 1}
          </StyledLink>
        );
      })}
      {!(page === totalPage) && (
        <StyledLink className="next" href={`${pathname}?page=${page + 1}`}>
          다음
        </StyledLink>
      )}
    </StyledPagination>
  );
}

const StyledPagination = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 30px 0 40px;
`;

const StyledLink = styled(Link)<{ current?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  padding: 8px;
  min-width: 36px;
  height: 36px;
  font-size: 16px;
  white-space: nowrap;
  color: ${themedPalette.text2};

  &:hover {
    background-color: ${themedPalette.bg_element2};
  }

  &.next,
  &.prev {
    border: 1px solid ${themedPalette.border4};
    padding: 0 12px;
  }
`;

export default Pagination;
