// ========== Generate Form Data

export const generateFormData = (data: any) => {
  const body = new FormData();
  // eslint-disable-next-line no-restricted-syntax, guard-for-in
  for (const prop in data) {
    body.append(prop, data[prop]);
  }

  return body;
};
