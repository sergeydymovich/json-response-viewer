function toggleExpandRequests(isChecked) {
  const isExpandCheckboxChecked =
    document.getElementById("expand-checkbox").checked;

  const openedReqElements = document.getElementsByClassName("req-content_open");

  const objElements = [];
  [...openedReqElements].forEach((el) =>
    objElements.push(...el.getElementsByClassName("object-property-expandable"))
  );

  objElements.forEach((el) => {
    if (isExpandCheckboxChecked || isChecked) {
      el.classList.add("object-property-expandable_open");
    } else {
      el.classList.remove("object-property-expandable_open");
    }
  });
}

function toggleExpandRequest(reqItem) {
  const isReqOpen = reqItem.classList.contains("req-content_open");
  const searchInputValue = document.getElementById("search").value;
  const isExpandCheckboxChecked =
    document.getElementById("expand-checkbox").checked;

  const objElements = [
    ...reqItem.getElementsByClassName("object-property-expandable"),
  ];

  if (!isReqOpen) {
    const searchElements = reqItem.getElementsByClassName(
      "object-search-value"
    );

    [...searchElements].forEach((el) => clearSearchResults(el));
  }

  replaceInnerText(searchInputValue);

  objElements.forEach((el) => {
    if ((isReqOpen && searchInputValue) || isExpandCheckboxChecked) {
      el.classList.add("object-property-expandable_open");
    } else {
      el.classList.remove("object-property-expandable_open");
    }
  });
}
