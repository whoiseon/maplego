import { themedPalette } from '@/styles/palette';
import styled from '@emotion/styled';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

interface Props {
  totalPage?: number;
  limit?: number;
  page: number;
}

function Pagination({ totalPage, limit, page }: Props) {
  const router = useRouter();
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
    if (!limit) return;
    if (totalPageArray) {
      if (page % limit === 1) {
        setCurrentPageArray(totalPageArray[Math.floor(page / limit)]);
      } else if (page % limit === 0) {
        setCurrentPageArray(totalPageArray[Math.floor(page / limit) - 1]);
      }
    }
  }, [page, limit]);

  useEffect(() => {
    if (!limit) return;
    const slicedPageArray = sliceArrayByLimit(totalPage, limit);

    if (slicedPageArray) {
      setTotalPageArray(slicedPageArray);
      setCurrentPageArray(slicedPageArray[0]);
    }
  }, [totalPage, limit]);

  const asPath = pathname.split('?')[0];
  return (
    <StyledPagination>
      {!(page === 1) && (
        <StyledLink className="prev" href={`${asPath}?page=${page - 1}`}>
          이전
        </StyledLink>
      )}
      {currentPageArray?.map((i: number) => {
        return (
          <StyledLink
            key={i}
            href={`${asPath}?page=${i + 1}`}
            style={
              page === i + 1
                ? {
                    backgroundColor: themedPalette.bg_element3,
                    color: themedPalette.primary2,
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
        <StyledLink className="next" href={`${asPath}?page=${page + 1}`}>
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
  gap: 0 8px;
  border-radius: 6px;
  padding: 8px;
  min-width: 36px;
  height: 36px;
  font-size: 18px;
  white-space: nowrap;
  border: 1px solid ${themedPalette.border4};
  &:hover {
    background-color: ${themedPalette.bg_element3};
    text-decoration: underline;
  }
`;

export default Pagination;
