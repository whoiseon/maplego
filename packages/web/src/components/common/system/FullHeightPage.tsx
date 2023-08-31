import { ReactNode } from 'react';
import { css, Global } from '@emotion/react';

interface Props {
  children: ReactNode;
}

function FullHeightPage({ children }: Props) {
  return (
    <>
      <Global
        styles={css`
          html,
          body {
            height: 100%;
          }
        `}
      />
      {children}
    </>
  );
}

export default FullHeightPage;
