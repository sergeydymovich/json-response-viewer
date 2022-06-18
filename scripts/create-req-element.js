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

  const reqPayload = request.request.queryString;

  if (reqPayload.length) {
    const parsedPayload = parsePayload(reqPayload);
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
    const parsedResponse = parseResponse(content);

    const reqRespSubtitle = createElement({
      tagName: "h3",
      className: `req-subtitle`,
      innerText: "response",
    });

    reqResp.append(reqRespSubtitle);

    if (!parsedResponse || typeof parsedResponse === "string") {
      reqResp.append(parsedResponse || "no content");
    } else {
      showObject(parsedResponse, reqResp);
    }

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
