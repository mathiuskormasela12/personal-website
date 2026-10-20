import { Html, Head, Main, NextScript } from 'next/document';

// data-scroll-behavior keeps Next's pre-16 behaviour: smooth in-page scrolling (GlobalStyles)
// but instant jumps on route changes.
export default function Document() {
  return (
    <Html lang="en" data-scroll-behavior="smooth">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
