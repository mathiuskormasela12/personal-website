import React, { useEffect, useRef, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';

const PAGE_CSS = `
  html { background: #e53935 !important; }
  body { background: #43a047 !important; }
`;

const readPadding = (probe: HTMLElement | null, side: 'Left' | 'Right') =>
  (probe && getComputedStyle(probe)[`padding${side}`]) || '?';

const readInfo = (probe: HTMLElement | null): string[] => [
  `Page: ${window.innerWidth} x ${window.innerHeight}`,
  `Screen: ${window.screen.width} x ${window.screen.height}`,
  `Notch space left: ${readPadding(probe, 'Left')}`,
  `Notch space right: ${readPadding(probe, 'Right')}`,
  `Browser: ${/CriOS/.test(navigator.userAgent) ? 'Chrome on iOS' : /Safari/.test(navigator.userAgent) ? 'Safari or other' : 'other'}`,
];

const StripTest: NextPage = () => {
  const probe = useRef<HTMLDivElement>(null);
  const [info, setInfo] = useState<string[]>([]);

  useEffect(() => {
    const update = () => setInfo(readInfo(probe.current));
    update();
    window.addEventListener('resize', update);
    window.addEventListener('orientationchange', update);
    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('orientationchange', update);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Strip test</title>
        <meta name="theme-color" content="#fb8c00" />
        <meta name="robots" content="noindex" />
        <style>{PAGE_CSS}</style>
      </Head>
      <div
        data-testid="edge-bar"
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          width: 24,
          background: '#fb8c00',
          zIndex: 5,
        }}
      />
      <div
        ref={probe}
        style={{
          position: 'absolute',
          visibility: 'hidden',
          paddingLeft: 'env(safe-area-inset-left, 0px)',
          paddingRight: 'env(safe-area-inset-right, 0px)',
        }}
      />
      <main
        style={{
          background: '#1e88e5',
          color: '#fff',
          margin: '0 32px',
          padding: '1.2rem',
          fontSize: '1.5rem',
          lineHeight: 1.5,
        }}
      >
        <h1 style={{ fontSize: '2.4rem' }}>Strip test</h1>
        <p>red = html background</p>
        <p>green = body background</p>
        <p>orange = bar at the screen edge</p>
        <p>blue = page content</p>
        {info.map((line) => (
          <p key={line.split(':')[0]}>{line}</p>
        ))}
      </main>
    </>
  );
};

export default StripTest;
