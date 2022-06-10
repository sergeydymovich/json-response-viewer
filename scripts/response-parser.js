function parseResponse(res) {
  let parsedValue = res;
  try {
    const parsedJSON = JSON.parse(res);
    parsedValue = parsedJSON;
  } catch {}

  if (
    parsedValue &&
    typeof parsedValue === "object" &&
    !isEmptyObj(parsedValue)
  ) {
    Object.entries(parsedValue).forEach(([key, value]) => {
      parsedValue[key] = parseResponse(value);
    });
  }

  return parsedValue;
}
