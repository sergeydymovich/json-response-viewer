function createReqElement(request) {
  const reqList = document.getElementById("req-list");

  const reqContainer = createElement({
    tagName: "li",
    className: `req-item`,
  });

  const button = createElement({
    tagName: "div",
    className: "req-btn",
    innerText:
      request.request.method +
      " " +
      (getReqPath(request.request.headers) || request.request.url),
  });

  button.addEventListener("click", () => {
    reqContainer.classList.toggle("req-item_open");
    toggleExpandRequest(reqContainer);
  });

  const reqResp = createElement({
    tagName: "pre",
    className: `req-content`,
  });

  const reqPayload = request.request.postData?.text;

  if (reqPayload) {
    const parsedPayload = parseJSON(reqPayload);
    const payloadContainer = createElement({
      tagName: "div",
      className: `req-payload`,
      innerHtml: `<h3 class='req-subtitle'>request payload</h3>`,
    });

    showObject(parsedPayload, payloadContainer);

    reqResp.append(payloadContainer);
  }

  const resStatus = request.response.status;
  const isSuccessStatus = resStatus > 199 && resStatus < 300;

  request.getContent((content) => {
    const parsedResponse = parseJSON(content);
    const responseContainer = createElement({
      tagName: "div",
      className: `req-response`,
      innerHtml: "<h3 class='req-subtitle'>response</h3>",
    });

    if (!parsedResponse || typeof parsedResponse === "string") {
      responseContainer.append(parsedResponse || "no content");
    } else {
      showObject(parsedResponse, responseContainer);
    }

    reqResp.append(responseContainer);
    reqContainer.classList.add(
      isSuccessStatus ? "req-item_success" : "req-item_error"
    );
  });

  reqContainer.append(button);
  reqContainer.append(reqResp);

  if (isReqElementShow(reqContainer)) {
    reqContainer.classList.add("req-item_show");
  }

  reqList.append(reqContainer);
}

function getReqPath(headers) {
  return headers.find((headersItem) => headersItem.name === ":path")?.value;
}
