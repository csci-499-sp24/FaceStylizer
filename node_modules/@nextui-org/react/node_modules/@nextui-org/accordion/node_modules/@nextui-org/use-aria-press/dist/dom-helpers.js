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

// src/dom-helpers.ts
var dom_helpers_exports = {};
__export(dom_helpers_exports, {
  getOwnerDocument: () => getOwnerDocument,
  getOwnerWindow: () => getOwnerWindow
});
module.exports = __toCommonJS(dom_helpers_exports);
var getOwnerDocument = (el) => {
  var _a;
  return (_a = el == null ? void 0 : el.ownerDocument) != null ? _a : document;
};
var getOwnerWindow = (el) => {
  var _a, _b;
  return (_b = (_a = el == null ? void 0 : el.ownerDocument) == null ? void 0 : _a.defaultView) != null ? _b : window;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getOwnerDocument,
  getOwnerWindow
});
