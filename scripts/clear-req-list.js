function clearReqList() {
  const reqItemElements = [...document.getElementsByClassName("req-item")];

  reqItemElements.forEach((reqEl) => reqEl.remove());
}
