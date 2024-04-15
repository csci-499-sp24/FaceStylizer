// src/dom-helpers.ts
var getOwnerDocument = (el) => {
  var _a;
  return (_a = el == null ? void 0 : el.ownerDocument) != null ? _a : document;
};
var getOwnerWindow = (el) => {
  var _a, _b;
  return (_b = (_a = el == null ? void 0 : el.ownerDocument) == null ? void 0 : _a.defaultView) != null ? _b : window;
};

export {
  getOwnerDocument,
  getOwnerWindow
};
