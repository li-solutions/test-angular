import { SearchParams } from './types';

export const buildUrlWithParams = (
  basePath: string,
  path = '/',
  params?: SearchParams
) => {
  const url = `${basePath}${path}`;
  if (!params) return url;

  const searchParams = Object.entries(params).reduce((acc, [key, value]) => {
    if (value !== undefined && value !== '') {
      acc.append(key, value);
    }

    return acc;
  }, new URLSearchParams());

  return Array.from(searchParams).length ? `${url}?${searchParams}` : url;
};
