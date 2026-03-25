const createParamsAPI = (
  paramsList: string[], 
  paramsValue: Record<string, unknown> | null | undefined
): string => {
  if (!paramsValue) return "";

  const searchParams = new URLSearchParams();

  for (const key of paramsList) {
    const value = paramsValue[key];

    if (value !== null && value !== undefined) {
      searchParams.append(key, String(value));
    }
  }

  const queryString = searchParams.toString();
  
  return queryString ? `?${queryString}` : "";
};

export default createParamsAPI;