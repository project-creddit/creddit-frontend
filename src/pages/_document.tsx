import { DocumentProps, Head, Html, Main, NextScript } from 'next/document';
import React from 'react';

React.useLayoutEffect = React.useEffect;

export default function Document(props: DocumentProps) {
  return (
    <Html lang="ko">
      <Head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin=""
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css"
        />
      </Head>
      <body data-theme={props?.__NEXT_DATA__?.props?.initialState?.pageProps}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
