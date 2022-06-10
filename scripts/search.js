let currentFocusedEl = 0;

function changeFocusedSearchElement(value) {
  const markedElements = document.getElementsByClassName("search-mark");
  const resultCount = markedElements.length;

  if (!resultCount) return;

  const isIncreaseValue = value === 1;
  let nextFocusedEl = currentFocusedEl + value;

  if (isIncreaseValue) {
    if (nextFocusedEl === resultCount) nextFocusedEl = 0;
  } else {
    if (nextFocusedEl < 0) nextFocusedEl = resultCount - 1;
  }

  markedElements[currentFocusedEl].classList.remove("mark_focused");
  currentFocusedEl = nextFocusedEl;
  markedElements[nextFocusedEl].classList.add("mark_focused");

  markedElements[nextFocusedEl].scrollIntoView({
    block: "center",
    behavior: "smooth",
  });

  const searchResultEl = document.getElementById("search-result");
  searchResultEl.innerText = `${currentFocusedEl + 1}/${resultCount}`;
}

function changeSearchResult(searchStr) {
  const markedElements = document.getElementsByClassName("search-mark");
  const searchResultEl = document.getElementById("search-result");
  const resultCount = markedElements.length;
  currentFocusedEl = 0;

  if (searchStr) {
    searchResultEl.innerText = `${resultCount ? 1 : 0}/${resultCount}`;
  } else {
    const searchInputEl = document.getElementById("search");
    searchInputEl.value = "";
    searchResultEl.innerText = "0/0";
  }

  if (resultCount) {
    markedElements[0].classList.add("mark_focused");
    markedElements[0].scrollIntoView({
      block: "center",
      behavior: "auto",
    });
  }
}

function replaceInnerText(str = "") {
  const searchStr = str.trim().toLowerCase();
  const searchElementsArr = [];

  const reqShowedElements = document.getElementsByClassName("req-item_show");

  [...reqShowedElements].forEach((reqEl) =>
    [...reqEl.getElementsByClassName("req-content_open")].forEach((contentEl) =>
      searchElementsArr.push(
        ...contentEl.getElementsByClassName("object-search-value")
      )
    )
  );

  if (searchStr) {
    toggleExpandRequests(true);
  }

  searchElementsArr.forEach((el) => {
    const clearedElValue = `${el.textContent}`.replace(/<[^>]*>/g, "");

    el.innerHTML = searchStr
      ? insertTagIntoString(clearedElValue, searchStr)
      : clearedElValue;
  });

  changeSearchResult(searchStr);
}

function insertTagIntoString(str, subStr) {
  const elIds = [];
  let lastIndex = -1;
  let resultStr = "";

  while (
    (lastIndex = str.toLowerCase().indexOf(subStr, lastIndex + 1)) !== -1
  ) {
    resultStr +=
      str.substring(elIds[elIds.length - 1] + subStr.length, lastIndex) +
      `<mark class='search-mark'>${str.substring(
        lastIndex,
        lastIndex + subStr.length
      )}</mark>`;

    elIds.push(lastIndex);
  }

  if (!resultStr) return str;

  return resultStr + str.substring(elIds[elIds.length - 1] + subStr.length);
}

function clearSearchResults(el) {
  el.innerHTML = `${el.textContent}`.replace(/<[^>]*>/g, "");
}
