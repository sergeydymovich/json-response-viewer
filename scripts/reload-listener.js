function reloadPageListener() {
  const storageIsPreserve = JSON.parse(localStorage.getItem("isPreserveLog"));

  if (!storageIsPreserve) {
    clearReqList();
  }
}
