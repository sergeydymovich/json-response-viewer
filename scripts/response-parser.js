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

function parsePayload(payload) {
  let parsedPayload = {};

  payload.forEach(({ name, value }) => {
    parsedPayload[name] = value;
  });

  return parsedPayload;
}
