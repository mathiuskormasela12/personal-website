import { LANDSCAPE_TOUCH_MEDIA } from '../../constants';

it('matches touch screens up to 1200px wide that are held sideways', () => {
  expect(LANDSCAPE_TOUCH_MEDIA).toBe(
    '(max-width: 1200px) and (orientation: landscape) and (pointer: coarse)',
  );
});
