chrome.devtools.panels.create(
  "JSON viewer",
  "./icons/icon.png",
  "devtools.html"
);

document.addEventListener("DOMContentLoaded", function (e) {
  chrome.devtools.network.onRequestFinished.addListener(function (request) {
    const resourceType = request._resourceType;
    if (resourceType === "xhr" || resourceType === "fetch") {
      createReqElement(request);
    }
  });

  if (chrome.devtools.panels.themeName === "dark") {
    const panel = document.getElementById("panel");
    panel.classList.add("panel-dark");
  }

  const clearListBtn = document.getElementById("clear-list-button");
  clearListBtn.addEventListener("click", () => clearReqList());

  const searchInput = document.getElementById("search");
  searchInput.addEventListener(
    "input",
    debounce(() => replaceInnerText(searchInput.value), 300)
  );

  const filterInput = document.getElementById("filter-input");
  filterInput.addEventListener("input", () =>
    filterRequests(filterInput.value)
  );

  const expandCheckbox = document.getElementById("expand-checkbox");
  expandCheckbox.checked = !!JSON.parse(
    localStorage.getItem("isExpandRequests")
  );
  expandCheckbox.addEventListener("click", (e) => {
    localStorage.setItem("isExpandRequests", e.target.checked);
    toggleExpandRequests();
  });

  const preserveCheckbox = document.getElementById("preserve-checkbox");
  preserveCheckbox.checked = !!JSON.parse(
    localStorage.getItem("isPreserveLog")
  );
  preserveCheckbox.addEventListener("click", (e) =>
    localStorage.setItem("isPreserveLog", e.target.checked)
  );
  chrome.devtools.network.onNavigated.addListener(() => reloadPageListener());

  document.addEventListener(
    "keypress",
    (e) => searchInput.value && keyboardEvent(e)
  );

  const prevSearchResultBtn = document.getElementById("result-prev");
  const nextSearchResultBtn = document.getElementById("result-next");
  const clearSearchResultBtn = document.getElementById("result-clear");

  prevSearchResultBtn.onclick = () => changeFocusedSearchElement(-1);
  nextSearchResultBtn.onclick = () => changeFocusedSearchElement(1);
  clearSearchResultBtn.onclick = () => replaceInnerText();
});
