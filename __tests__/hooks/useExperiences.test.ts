import { renderHook, waitFor } from '@testing-library/react';
import Services from '../../services';
import {
  loadExperiences,
  setCachedExperiences,
  useExperiences,
} from '../../hooks/useExperiences';

jest.mock('../../services', () => ({
  __esModule: true,
  default: { getExperiences: jest.fn() },
}));

const saved = [
  {
    id: 1,
    company: 'Nimbus Labs',
    role: 'Mobile Developer',
    startDate: '2024-03',
    endDate: null,
    description: ['Shipped the driver app.'],
  },
];

const getExperiences = Services.getExperiences as jest.Mock;

beforeEach(() => {
  setCachedExperiences(null);
  getExperiences.mockReset();
});

it('starts empty, then shows the list from the API', async () => {
  getExperiences.mockResolvedValue({ data: { results: saved } });
  const { result } = renderHook(() => useExperiences());
  expect(result.current).toEqual([]);
  await waitFor(() => expect(result.current).toEqual(saved));
});

it('shares one request between every component that needs the list', async () => {
  getExperiences.mockResolvedValue({ data: { results: saved } });
  const first = renderHook(() => useExperiences());
  const second = renderHook(() => useExperiences());
  await waitFor(() => expect(first.result.current).toEqual(saved));
  await waitFor(() => expect(second.result.current).toEqual(saved));
  expect(getExperiences).toHaveBeenCalledTimes(1);
});

it('stays empty when the API fails, and tries again next time', async () => {
  getExperiences.mockRejectedValueOnce(new Error('Network Error'));
  await expect(loadExperiences()).resolves.toEqual([]);
  getExperiences.mockResolvedValueOnce({ data: { results: saved } });
  await expect(loadExperiences()).resolves.toEqual(saved);
  expect(getExperiences).toHaveBeenCalledTimes(2);
});

it('uses a saved list right away without asking the API again', async () => {
  setCachedExperiences(saved);
  const { result } = renderHook(() => useExperiences());
  expect(result.current).toEqual(saved);
  await waitFor(() => expect(result.current).toEqual(saved));
  expect(getExperiences).not.toHaveBeenCalled();
});
