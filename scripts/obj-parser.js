function createElement({
  tagName = "div",
  className,
  innerText,
  innerHtml,
  children,
}) {
  const newElement = document.createElement(tagName);

  if (className) newElement.classList.add(...className.trim().split(" "));

  if (innerText) newElement.innerText = innerText;

  if (innerHtml) newElement.innerHTML = innerHtml;

  if (children) newElement.append(children);

  return newElement;
}

const createObjProperty = (parent, key, value) => {
  const objPropertyEl = createElement({
    tagName: "div",
    className: "object-property",
  });

  const objKeyEl = createElement({
    tagName: "div",
    className: "object-key",
    innerHtml: `<div class='object-search-value'>${key}:</div>`,
  });

  objPropertyEl.append(objKeyEl);

  const objValueEl = createElement({
    tagName: "div",
    className: "object-value",
  });

  if (value && typeof value === "object" && !isEmptyObj(value)) {
    const customObjValueEl = createElement({
      tagName: "div",
      className: "custom-object-value",
      innerText: Array.isArray(value)
        ? `Arr(${value.length})`
        : `Obj(${Object.keys(value).length})`,
    });
    objPropertyEl.classList.add("object-property-expandable");

    objKeyEl.append(customObjValueEl);
    objKeyEl.addEventListener("click", (e) => {
      e.stopPropagation();
      objPropertyEl.classList.toggle("object-property-expandable_open");
    });
  } else {
    const objValue =
      value && typeof value === "object"
        ? Array.isArray(value)
          ? "[]"
          : "{}"
        : typeof value === "string"
        ? `'${value}'`
        : `${value}`;

    const objectValueEl = createElement({
      tagName: "div",
      className: "object-search-value",
      innerText: objValue,
    });

    objectValueEl.classList.add(`object-value_${typeof value}`);
    objValueEl.append(objectValueEl);
  }
  objPropertyEl.append(objValueEl);

  parent.append(objPropertyEl);

  return objPropertyEl;
};

const showObject = (object, parent) => {
  const objectContainer = createElement({
    tagName: "div",
    className: "object-container",
  });
  parent.append(objectContainer);

  Object.entries(object).forEach(([key, value]) => {
    if (value && typeof value === "object") {
      const objPropertyEl = createObjProperty(objectContainer, key, value);

      showObject(value, objPropertyEl.lastChild);
    } else {
      createObjProperty(objectContainer, key, value);
    }
  });
};

function isEmptyObj(obj) {
  if (Array.isArray(obj)) return obj.length === 0;

  return (
    obj &&
    Object.keys(obj).length === 0 &&
    Object.getPrototypeOf(obj) === Object.prototype
  );
}
