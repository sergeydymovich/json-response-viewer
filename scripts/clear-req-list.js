function clearReqList() {
  const reqItemElements = [...document.getElementsByClassName("req-item")];
  reqItemElements.forEach((reqEl) => reqEl.remove());

  const searchResultEl = document.getElementById("search-result");
  searchResultEl.innerText = "0/0";
}
