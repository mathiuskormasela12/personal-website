import { useEffect, useMemo } from 'react';

export const usePickedImageUrl = (files: FileList | null): string | null => {
  const url = useMemo(
    () => (files && files.length > 0 ? URL.createObjectURL(files[0]) : null),
    [files],
  );

  useEffect(
    () => () => {
      if (url) {
        URL.revokeObjectURL(url);
      }
    },
    [url],
  );

  return url;
};
