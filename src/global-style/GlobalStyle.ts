import { createGlobalStyle, css } from 'styled-components';
import JosefinSans2 from 'assets/fonts/JosefinSans/Josefin_Sans.woff2';
import JosefinSans from 'assets/fonts/JosefinSans/Josefin_Sans.woff';
import JosefinSansBold2 from 'assets/fonts/JosefinSans/JosefinSansBold/Josefin_Sans_Bold.woff2';
import JosefinSansBold from 'assets/fonts/JosefinSans/JosefinSansBold/Josefin_Sans_Bold.woff';
import JosefinSansRegular2 from 'assets/fonts/JosefinSans/JosefinSansRegular/Josefin_Sans_Regular.woff2';
import JosefinSansRegular from 'assets/fonts/JosefinSans/JosefinSansRegular/Josefin_Sans_Regular.woff';

const antdCss = css`
  ${require('antd/dist/antd.css')}
`;

const fontFaces = css`
  @font-face {
    font-family: 'Josefin Sans';
    src: url(${JosefinSans2}) format('woff2'), url(${JosefinSans}) format('woff');
    font-weight: normal;
  }
  @font-face {
    font-family: 'Josefin Sans Bold';
    src: url(${JosefinSansBold2}) format('woff2'), url(${JosefinSansBold}) format('woff');
  }
  @font-face {
    font-family: 'Josefin Sans Regular';
    src: url(${JosefinSansRegular2}) format('woff2'), url(${JosefinSansRegular}) format('woff');
  }
`;

export const GlobalStyle = createGlobalStyle`
  ${fontFaces}
  body {
    margin: 0;
    background: linear-gradient(0deg, rgba(35, 29, 79, 0.85) 0%, rgba(232, 214, 214, 0.6965379901960784) 35%, rgba(233, 217, 217, 1) 62%, rgba(245, 245, 250, 1) 84%);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }


  * {
    text-decoration: none;
    list-style: none;
    outline: none;
    font-family: Josefin Sans Regular, sans-serif;
  }

  img {
    display: block;
    width: 100%;
    max-width: 100%;
    height: auto;
  }

  h1,
  h2,
  h3,
  h4,
  p,
  ul {
    margin: 0;
    padding: 0;
  }

  ${antdCss}

`;
