import React, { useEffect, useRef, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';

const LEFT_COLORS = { first: '#fb8c00', second: '#8e24aa' };
const RIGHT_COLORS = { first: '#d81b60', second: '#00acc1' };
const LEFT_NAMES = { first: 'orange', second: 'purple' };
const RIGHT_NAMES = { first: 'pink', second: 'cyan' };

const GREYS = [
  { id: 'off', label: 'off', color: '' },
  { id: 'plain', label: '1 plain (#7e7e7f)', color: '#7e7e7f' },
  {
    id: 'mixed',
    label: '2 mixed (color-mix)',
    color: 'color-mix(in srgb, #fbfcfe 50%, black)',
  },
  {
    id: 'variable',
    label: '3 site variable (--color-dimmed)',
    color: 'var(--color-dimmed)',
  },
];

const pageCss = (bodyBlue: boolean) => `
  html { background: #e53935 !important; }
  #__next { background: transparent !important; }
  body { background: ${bodyBlue ? '#1e88e5' : '#43a047'} !important; }
`;

const edgeStyle = (
  side: 'left' | 'right',
  color: string,
  width: number,
): React.CSSProperties => ({
  position: 'fixed',
  [side]: 0,
  top: 0,
  bottom: 0,
  width,
  background: color,
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

const buttonStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '1.4rem',
  padding: '0.6rem 1.2rem',
  margin: '0.5rem 0',
};

const StripTest: NextPage = () => {
  const probe = useRef<HTMLDivElement>(null);
  const [info, setInfo] = useState<string[]>([]);
  const [alt, setAlt] = useState(false);
  const [thin, setThin] = useState(false);
  const [bodyBlue, setBodyBlue] = useState(false);
  const [dimmed, setDimmed] = useState(false);
  const [greyIndex, setGreyIndex] = useState(0);

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

  const key = alt ? 'second' : 'first';
  const width = thin ? 2 : 24;
  const grey = GREYS[greyIndex];

  return (
    <>
      <Head>
        <title>Strip test 3</title>
        <meta name="robots" content="noindex" />
        <style>{pageCss(bodyBlue)}</style>
      </Head>
      <div
        data-testid="left-edge"
        data-grey={grey.id}
        style={edgeStyle('left', grey.color || LEFT_COLORS[key], width)}
      />
      <div
        data-testid="right-edge"
        data-grey={grey.id}
        style={edgeStyle('right', grey.color || RIGHT_COLORS[key], width)}
      />
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
            zIndex: 1,
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
          position: 'relative',
          zIndex: 2,
          background: '#1e88e5',
          color: '#fff',
          margin: '0 40px',
          padding: '1.2rem',
          fontSize: '1.4rem',
          lineHeight: 1.5,
        }}
      >
        <h1 style={{ fontSize: '2.2rem' }}>Strip test 3</h1>
        <p>{`Bars: ${LEFT_NAMES[key]} and ${RIGHT_NAMES[key]}, ${thin ? 'thin' : 'wide'}`}</p>
        <p>{`Body: ${bodyBlue ? 'blue' : 'green'}, html: red`}</p>
        <p>{`Tappable dim: ${dimmed ? 'on' : 'off'}`}</p>
        <p>{`Grey: ${grey.label}`}</p>
        <button
          type="button"
          style={buttonStyle}
          onClick={() => setGreyIndex((index) => (index + 1) % GREYS.length)}
        >
          Next grey
        </button>
        <button
          type="button"
          style={buttonStyle}
          onClick={() => setAlt((value) => !value)}
        >
          Change the bar colors
        </button>
        <button
          type="button"
          style={buttonStyle}
          onClick={() => setThin((value) => !value)}
        >
          {thin ? 'Make the bars wide' : 'Make the bars thin'}
        </button>
        <button
          type="button"
          style={buttonStyle}
          onClick={() => setBodyBlue((value) => !value)}
        >
          Change the body color
        </button>
        <button
          type="button"
          style={buttonStyle}
          onClick={() => setDimmed((value) => !value)}
        >
          {dimmed ? 'Clear the dim' : 'Dim with a tappable layer'}
        </button>
        {info.map((line) => (
          <p key={line.split(':')[0]}>{line}</p>
        ))}
      </main>
    </>
  );
};

export default StripTest;
