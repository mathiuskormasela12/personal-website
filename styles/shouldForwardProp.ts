import isPropValid from '@emotion/is-prop-valid';

// styled-components v6 forwards every prop to the DOM. Restore the v5 behaviour:
// HTML elements only receive valid HTML attributes, while components receive everything.
export const shouldForwardProp = (
  propName: string,
  target: unknown,
): boolean => (typeof target === 'string' ? isPropValid(propName) : true);
