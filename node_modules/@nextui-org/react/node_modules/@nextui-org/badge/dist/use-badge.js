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

// src/use-badge.ts
var use_badge_exports = {};
__export(use_badge_exports, {
  useBadge: () => useBadge
});
module.exports = __toCommonJS(use_badge_exports);
var import_theme = require("@nextui-org/theme");
var import_system_rsc = require("@nextui-org/system-rsc");
var import_shared_utils = require("@nextui-org/shared-utils");
var import_react = require("react");
function useBadge(originalProps) {
  const [props, variantProps] = (0, import_system_rsc.mapPropsVariants)(originalProps, import_theme.badge.variantKeys);
  const { as, children, className, content, classNames, ...otherProps } = props;
  const Component = as || "span";
  const isOneChar = (0, import_react.useMemo)(
    () => {
      var _a;
      return ((_a = String(content)) == null ? void 0 : _a.length) === 1 || (originalProps == null ? void 0 : originalProps.isOneChar);
    },
    [content, originalProps == null ? void 0 : originalProps.isOneChar]
  );
  const isDot = (0, import_react.useMemo)(() => {
    var _a;
    return ((_a = String(content)) == null ? void 0 : _a.length) === 0;
  }, [content]);
  const baseStyles = (0, import_shared_utils.clsx)(classNames == null ? void 0 : classNames.badge, className);
  const slots = (0, import_react.useMemo)(
    () => (0, import_theme.badge)({
      ...variantProps,
      showOutline: !!(originalProps == null ? void 0 : originalProps.disableOutline) ? !(originalProps == null ? void 0 : originalProps.disableOutline) : originalProps == null ? void 0 : originalProps.showOutline,
      isOneChar,
      isDot
    }),
    [...Object.values(variantProps), isOneChar, isDot]
  );
  const getBadgeProps = () => {
    return {
      className: slots.badge({ class: baseStyles }),
      "data-invisible": originalProps.isInvisible,
      ...otherProps
    };
  };
  return {
    Component,
    children,
    content,
    slots,
    classNames,
    disableAnimation: originalProps == null ? void 0 : originalProps.disableAnimation,
    isInvisible: originalProps == null ? void 0 : originalProps.isInvisible,
    getBadgeProps
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useBadge
});
