import React, { useEffect, useRef, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';

const PAGE_CSS = `
  html { background: #e53935 !important; }
  body { background: #43a047 !important; }
`;

const LEFT_COLORS = ['#fb8c00', '#8e24aa', '#fdd835'];
const RIGHT_COLORS = ['#d81b60', '#00acc1', '#6d4c41'];

const edgeStyle = (side: 'left' | 'right'): React.CSSProperties => ({
  position: 'fixed',
  [side]: 0,
  top: 0,
  bottom: 0,
  width: 24,
  display: 'flex',
  flexDirection: 'column',
  zIndex: 5,
});

const readPadding = (probe: HTMLElement | null, side: 'Left' | 'Right') =>
  (probe && getComputedStyle(probe)[`padding${side}`]) || '?';

const readInfo = (probe: HTMLElement | null): string[] => [
  `Page: ${window.innerWidth} x ${window.innerHeight}`,
  `Screen: ${window.screen.width} x ${window.screen.height}`,
  `Notch space left: ${readPadding(probe, 'Left')}`,
  `Notch space right: ${readPadding(probe, 'Right')}`,
  `Browser: ${/CriOS/.test(navigator.userAgent) ? 'Chrome on iOS' : /Safari/.test(navigator.userAgent) ? 'Safari or other' : 'other'}`,
];

const EdgeBar: React.FC<{ side: 'left' | 'right'; colors: string[] }> = ({
  side,
  colors,
}) => (
  <div data-testid={`${side}-edge`} style={edgeStyle(side)}>
    {colors.map((color) => (
      <div
        key={color}
        data-testid={`${side}-edge-part`}
        style={{ flex: 1, background: color }}
      />
    ))}
  </div>
);

const StripTest: NextPage = () => {
  const probe = useRef<HTMLDivElement>(null);
  const [info, setInfo] = useState<string[]>([]);
  const [dimmed, setDimmed] = useState(false);

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
        <title>Strip test 2</title>
        <meta name="robots" content="noindex" />
        <style>{PAGE_CSS}</style>
      </Head>
      <EdgeBar side="left" colors={LEFT_COLORS} />
      <EdgeBar side="right" colors={RIGHT_COLORS} />
      {dimmed && (
        <div
          data-testid="dim-layer"
          style={{
            position: 'fixed',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            pointerEvents: 'none',
            zIndex: 10,
          }}
        />
      )}
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
          margin: '0 40px',
          padding: '1.2rem',
          fontSize: '1.4rem',
          lineHeight: 1.5,
        }}
      >
        <h1 style={{ fontSize: '2.2rem' }}>Strip test 2</h1>
        <p>Left edge, top to bottom: orange, purple, yellow</p>
        <p>Right edge, top to bottom: pink, cyan, brown</p>
        <p>green = body background, red = html background</p>
        <button
          type="button"
          onClick={() => setDimmed((value) => !value)}
          style={{ fontSize: '1.4rem', padding: '0.6rem 1.2rem' }}
        >
          {dimmed ? 'Clear the dim' : 'Dim the page'}
        </button>
        {info.map((line) => (
          <p key={line.split(':')[0]}>{line}</p>
        ))}
      </main>
    </>
  );
};

export default StripTest;
