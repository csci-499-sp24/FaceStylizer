"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/text-selection.ts
var text_selection_exports = {};
__export(text_selection_exports, {
  disableTextSelection: () => disableTextSelection,
  restoreTextSelection: () => restoreTextSelection
});
module.exports = __toCommonJS(text_selection_exports);
var import_utils = require("@react-aria/utils");

// src/dom-helpers.ts
var getOwnerDocument = (el) => {
  var _a;
  return (_a = el == null ? void 0 : el.ownerDocument) != null ? _a : document;
};

// src/text-selection.ts
var state = "default";
var savedUserSelect = "";
var modifiedElementMap = /* @__PURE__ */ new WeakMap();
function disableTextSelection(target) {
  if ((0, import_utils.isIOS)()) {
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
  if ((0, import_utils.isIOS)()) {
    if (state !== "disabled") {
      return;
    }
    state = "restoring";
    setTimeout(() => {
      (0, import_utils.runAfterTransition)(() => {
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  disableTextSelection,
  restoreTextSelection
});
