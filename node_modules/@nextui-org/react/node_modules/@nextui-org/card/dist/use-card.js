"use client";
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

// src/use-card.ts
var use_card_exports = {};
__export(use_card_exports, {
  useCard: () => useCard
});
module.exports = __toCommonJS(use_card_exports);
var import_theme = require("@nextui-org/theme");
var import_react = require("react");
var import_utils = require("@react-aria/utils");
var import_focus = require("@react-aria/focus");
var import_interactions = require("@react-aria/interactions");
var import_use_aria_button = require("@nextui-org/use-aria-button");
var import_system = require("@nextui-org/system");
var import_shared_utils = require("@nextui-org/shared-utils");
var import_react_utils = require("@nextui-org/react-utils");
var import_react_utils2 = require("@nextui-org/react-utils");
var import_ripple = require("@nextui-org/ripple");
function useCard(originalProps) {
  const [props, variantProps] = (0, import_system.mapPropsVariants)(originalProps, import_theme.card.variantKeys);
  const {
    ref,
    as,
    children,
    disableRipple = false,
    onClick,
    onPress,
    autoFocus,
    className,
    classNames,
    allowTextSelectionOnPress = true,
    ...otherProps
  } = props;
  const domRef = (0, import_react_utils2.useDOMRef)(ref);
  const Component = as || (originalProps.isPressable ? "button" : "div");
  const shouldFilterDOMProps = typeof Component === "string";
  const baseStyles = (0, import_shared_utils.clsx)(classNames == null ? void 0 : classNames.base, className);
  const { onClick: onRippleClickHandler, onClear: onClearRipple, ripples } = (0, import_ripple.useRipple)();
  const handleClick = (e) => {
    if (!originalProps.disableAnimation && !disableRipple && domRef.current) {
      onRippleClickHandler(e);
    }
  };
  const { buttonProps, isPressed } = (0, import_use_aria_button.useAriaButton)(
    {
      onPress,
      elementType: as,
      isDisabled: !originalProps.isPressable,
      onClick: (0, import_utils.chain)(onClick, handleClick),
      allowTextSelectionOnPress,
      ...otherProps
    },
    domRef
  );
  const { hoverProps, isHovered } = (0, import_interactions.useHover)({
    isDisabled: !originalProps.isHoverable,
    ...otherProps
  });
  const { isFocusVisible, isFocused, focusProps } = (0, import_focus.useFocusRing)({
    autoFocus
  });
  const slots = (0, import_react.useMemo)(
    () => (0, import_theme.card)({
      ...variantProps
    }),
    [...Object.values(variantProps)]
  );
  const context = (0, import_react.useMemo)(
    () => ({
      isDisabled: originalProps.isDisabled,
      isFooterBlurred: originalProps.isFooterBlurred,
      disableAnimation: originalProps.disableAnimation,
      fullWidth: originalProps.fullWidth,
      slots,
      classNames
    }),
    [
      slots,
      classNames,
      originalProps.isDisabled,
      originalProps.isFooterBlurred,
      originalProps.disableAnimation,
      originalProps.fullWidth
    ]
  );
  const getCardProps = (0, import_react.useCallback)(
    (props2 = {}) => {
      return {
        ref: domRef,
        className: slots.base({ class: baseStyles }),
        tabIndex: originalProps.isPressable ? 0 : -1,
        "data-hover": (0, import_shared_utils.dataAttr)(isHovered),
        "data-pressed": (0, import_shared_utils.dataAttr)(isPressed),
        "data-focus": (0, import_shared_utils.dataAttr)(isFocused),
        "data-focus-visible": (0, import_shared_utils.dataAttr)(isFocusVisible),
        "data-disabled": (0, import_shared_utils.dataAttr)(originalProps.isDisabled),
        ...(0, import_utils.mergeProps)(
          originalProps.isPressable ? { ...buttonProps, ...focusProps, role: "button" } : {},
          originalProps.isHoverable ? hoverProps : {},
          (0, import_react_utils.filterDOMProps)(otherProps, {
            enabled: shouldFilterDOMProps
          }),
          (0, import_react_utils.filterDOMProps)(props2)
        )
      };
    },
    [
      domRef,
      slots,
      baseStyles,
      shouldFilterDOMProps,
      originalProps.isPressable,
      originalProps.isHoverable,
      originalProps.isDisabled,
      isHovered,
      isPressed,
      isFocusVisible,
      buttonProps,
      focusProps,
      hoverProps,
      otherProps
    ]
  );
  const getRippleProps = (0, import_react.useCallback)(
    () => ({ ripples, onClear: onClearRipple }),
    [ripples, onClearRipple]
  );
  return {
    context,
    domRef,
    Component,
    classNames,
    children,
    isHovered,
    isPressed,
    isPressable: originalProps.isPressable,
    isHoverable: originalProps.isHoverable,
    disableAnimation: originalProps.disableAnimation,
    disableRipple,
    handleClick,
    isFocusVisible,
    getCardProps,
    getRippleProps
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useCard
});
