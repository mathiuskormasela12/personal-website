import { Html, Head, Main, NextScript } from 'next/document';
import { THEME_INIT_SCRIPT } from '../themes';

// data-scroll-behavior keeps Next's pre-16 behaviour: smooth in-page scrolling (GlobalStyles)
// but instant jumps on route changes.
export default function Document() {
  return (
    <Html lang="en" data-scroll-behavior="smooth">
      <Head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
