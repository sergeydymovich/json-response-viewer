let filterRequestsStr = "";

function filterRequests(str) {
  const filterStr = str.trim().toLowerCase();
  filterRequestsStr = filterStr;

  const reqElements = document.getElementsByClassName("req-item");

  [...reqElements].forEach((el) => {
    const isElContainStr = isReqElementShow(el);

    if (isElContainStr) {
      el.classList.add("req-item_show");
    } else {
      el.classList.remove("req-item_show");

      const contentElement = el.getElementsByClassName("req-content")[0];
      contentElement.classList.remove("req-content_open");

      const searchElements = contentElement.getElementsByClassName(
        "object-search-value"
      );
      [...searchElements].forEach((el) => clearSearchResults(el));

      const searchInputValue = document.getElementById("search").value;
      replaceInnerText(searchInputValue);
    }
  });
}

function isReqElementShow(el) {
  return el.firstChild.innerText.toLowerCase().includes(filterRequestsStr);
}
