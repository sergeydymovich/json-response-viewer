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
      el.classList.remove("req-item_show", "req-item_open");

      const searchElements = el.getElementsByClassName("object-search-value");
      [...searchElements].forEach(
        (el) => (el.innerText = removeTagsFromElement(el))
      );

      const searchInputValue = document.getElementById("search").value;
      replaceInnerText(searchInputValue);
    }
  });
}

function isReqElementShow(el) {
  return el.firstChild.innerText.toLowerCase().includes(filterRequestsStr);
}
