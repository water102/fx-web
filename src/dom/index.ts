import {
  isNilOrEmpty,
  isNotNilAndEmpty,
  trim,
} from "@water102/fx-common";

export function addGlobalEventListener(
  type: string,
  selector: string,
  callback: (e: Event) => void,
  options: { [key: string]: any },
  parent: HTMLElement | Document = document
) {
  parent.addEventListener(
    type,
    e => {
      if ((e as any)?.target?.matches?.(selector)) callback(e)
    },
    options
  )
}

export function qs(selector: string, parent: HTMLElement | Document = document) {
  return parent.querySelector(selector)
}

export function qsa(selector: string, parent: HTMLElement | Document = document) {
  return [...parent.querySelectorAll(selector)]
}

export function createElement(type: string, options: { [key: string]: any } = {}) {
  const element = document.createElement(type)
  Object.entries(options).forEach(([key, value]) => {
    if (key === "class") {
      element.classList.add(value)
      return
    }

    if (key === "dataset") {
      Object.entries(value).forEach(([dataKey, dataValue]) => {
        element.dataset[dataKey] = dataValue as any
      })
      return
    }

    if (key === "text") {
      element.textContent = value
      return
    }

    element.setAttribute(key, value)
  })
  return element
}

export function $setInputValue(element: any, value: string) {
  element.hasChanged = false;
  element.originalValue = value;
  switch (element.type) {
    case "hidden":
    case "text":
    case "textarea":
    case "select-one":
    case "button":
      element.value = value;
      break;
    case "checkbox":
      element.checked = value != "0";
      element.value = value;
      break;
    case "radio":
      element.checked = value != "0";
      element.value = value;
      break;
      break;
    case "select-multiple":
      for (var i = 0; i < element.length; i++) {
        if (trim(element[i].value) == trim(value)) {
          element[i].selected = true;
        }
      }
      break;
    default:
      throw "element not input";
      break;
  }
};

export function $getInputValue(element: any) {
  switch (element.type) {
    case "hidden":
    case "text":
    case "textarea":
    case "checkbox":
    case "radio":
    case "select-one":
      return trim(element.value);
    case "select-multiple":
      const values = [];
      for (var i = 0; i < element.length; i++) {
        if (element[i].selected) {
          values.push(trim(element[i].value));
        }
      }
      return values;
  }
};

export function $setValue(element: HTMLElement, value: string, isHtml = false) {
  value = trim(value.toString());
  switch (element.tagName) {
    case "INPUT":
    case "TEXTAREA":
      $setInputValue(element, value);
      break;
    default:
      if (isHtml) {
        element.innerHTML = value;
      }
      else {
        element.innerText = value;
      }
      break;
  }
};

export function $getValue(element: HTMLElement, isHtml = false) {
  switch (element.tagName) {
    case "INPUT":
    case "TEXTAREA":
      return $getInputValue(element);
    default:
      if (isHtml) {
        return element.innerHTML;
      }

      return element.innerText;
  }
};

export function $id(id: string, parent = document) {
  if (isNilOrEmpty(id)) {
    return null;
  }

  return parent.getElementById(id);
};

export function $name(name: string, parent = document) {
  if (isNotNilAndEmpty(name)) {
    return parent.getElementsByName(name);
  }

  return [];
};

export function $tag(tagName: string, parent = document) {
  if (isNotNilAndEmpty(tagName)) {
    return parent.getElementsByTagName(tagName);
  }

  return [];
};