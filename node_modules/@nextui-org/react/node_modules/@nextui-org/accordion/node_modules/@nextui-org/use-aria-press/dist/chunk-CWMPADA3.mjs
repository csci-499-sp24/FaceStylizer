import {
  getOwnerDocument
} from "./chunk-FFBWCXWK.mjs";

// src/text-selection.ts
import { isIOS, runAfterTransition } from "@react-aria/utils";
var state = "default";
var savedUserSelect = "";
var modifiedElementMap = /* @__PURE__ */ new WeakMap();
function disableTextSelection(target) {
  if (isIOS()) {
    if (state === "default") {
      const documentObject = getOwnerDocument(target);
      savedUserSelect = documentObject.documentElement.style.webkitUserSelect;
      documentObject.documentElement.style.webkitUserSelect = "none";
    }
    state = "disabled";
  } else if (target instanceof HTMLElement || target instanceof SVGElement) {
    modifiedElementMap.set(target, target.style.userSelect);
    target.style.userSelect = "none";
  }
}
function restoreTextSelection(target) {
  if (isIOS()) {
    if (state !== "disabled") {
      return;
    }
    state = "restoring";
    setTimeout(() => {
      runAfterTransition(() => {
        if (state === "restoring") {
          const documentObject = getOwnerDocument(target);
          if (documentObject.documentElement.style.webkitUserSelect === "none") {
            documentObject.documentElement.style.webkitUserSelect = savedUserSelect || "";
          }
          savedUserSelect = "";
          state = "default";
        }
      });
    }, 300);
  } else if (target instanceof HTMLElement || target instanceof SVGElement) {
    if (target && modifiedElementMap.has(target)) {
      let targetOldUserSelect = modifiedElementMap.get(target);
      if (target.style.userSelect === "none" && targetOldUserSelect) {
        target.style.userSelect = targetOldUserSelect;
      }
      if (target.getAttribute("style") === "") {
        target.removeAttribute("style");
      }
      modifiedElementMap.delete(target);
    }
  }
}

export {
  disableTextSelection,
  restoreTextSelection
};
