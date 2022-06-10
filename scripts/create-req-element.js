function createReqElement(request) {
  const reqList = document.getElementById("req-list");

  const reqContainer = createElement({
    tagName: "li",
    className: `req-item`,
  });

  const button = createElement({
    tagName: "button",
    className: "req-btn",
    innerText: getReqPath(request.request.headers) || request.request.url,
  });

  button.addEventListener("click", () => {
    reqResp.classList.toggle("req-content_open");
    toggleExpandRequest(reqResp);
  });

  const reqResp = createElement({
    tagName: "pre",
    className: `req-content`,
  });

  const resStatus = request.response.status;
  const isSuccessStatus = resStatus > 199 && resStatus < 300;

  request.getContent((content) => {
    const parsedResponse = parseResponse(content);

    if (!parsedResponse || typeof parsedResponse === "string") {
      reqResp.innerText = parsedResponse || "no content";
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
