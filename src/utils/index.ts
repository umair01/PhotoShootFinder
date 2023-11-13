export const buildQueryString = (params: Record<string, any>): string => {
  const queryString = Object.keys(params)
    .map((key) => {
      const value = params[key];

      if (key.includes("Date")) {
        // Format Date objects to a string suitable for URL
        return `${encodeURIComponent(key)}=${encodeURIComponent(
          value.toISOString()
        )}`;
      }

      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    })
    .join("&");

  return queryString;
};
