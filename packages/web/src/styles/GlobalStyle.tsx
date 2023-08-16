import { css, Global } from '@emotion/react';
import { themedPalette, themes } from '@/styles/palette';

const styles = css`
  @import url('https://webfontworld.github.io/pretendard/Pretendard.css');

  * {
    box-sizing: inherit;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'Pretendard', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-weight: 500;
    color: ${themedPalette.text1};
    background-color: ${themedPalette.bg_page1};
    transition: 0.125s all ease-in;
    box-sizing: border-box;
    overflow-y: initial;
  }

  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
  }

  html {
    ${themes.light};
  }

  @media (prefers-color-scheme: dark) {
    html {
      ${themes.dark}
    }
  }

  html.light {
    ${themes.light}
  }

  html.dark {
    ${themes.dark}
  }

  input,
  button,
  textarea {
    font-family: inherit;
  }

  ul,
  li {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  a,
  a:link {
    text-decoration: none;
  }
`;

function GlobalStyle() {
  return <Global styles={styles} />;
}

export default GlobalStyle;
