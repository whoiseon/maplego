// 미디어 쿼리 breakpoint를 상수로 정의.
const breakpoints = {
  mobile: 580, // 모바일 화면
  tablet: 768, // 태블릿 화면
  desktop: 1024, // 데스크탑 화면
  wide: 1200, // 큰 데스크탑 화면
  xwide: 1440, // 매우 큰 데스크탑 화면
} as const;

// breakpoint 이름을 나타내는 타입 정의
type BreakpointName = keyof typeof breakpoints;

/**
 * 인자로 받은 화면 폭에 대한 미디어 쿼리 문자열을 반환하는 함수
 * @param {number} width 최소 너비
 * @returns {string}
 */
export const mediaQuery = (width: number) => `@media (min-width: ${width}px)`;

type Media = Record<BreakpointName, string>;

/**
 * 각 breakpoint에 대한 미디어 쿼리 문자열을 담는 객체 생성하는 함수
 * @usage ex) media.mobile => "@media (min-width: 640px)"
 */
export const media = Object.entries(breakpoints).reduce(
  (acc, [name, width]) => {
    acc[name as BreakpointName] = mediaQuery(width);
    return acc;
  },
  {} as Media
);
