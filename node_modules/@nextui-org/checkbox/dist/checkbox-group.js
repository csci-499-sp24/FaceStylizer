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

// src/checkbox-group.tsx
var checkbox_group_exports = {};
__export(checkbox_group_exports, {
  default: () => checkbox_group_default
});
module.exports = __toCommonJS(checkbox_group_exports);
var import_system = require("@nextui-org/system");

// src/checkbox-group-context.ts
var import_react_utils = require("@nextui-org/react-utils");
var [CheckboxGroupProvider, useCheckboxGroupContext] = (0, import_react_utils.createContext)({
  name: "CheckboxGroupContext",
  strict: false
});

// src/use-checkbox-group.ts
var import_react = require("react");
var import_utils = require("@react-aria/utils");
var import_theme = require("@nextui-org/theme");
var import_checkbox = require("@react-aria/checkbox");
var import_checkbox2 = require("@react-stately/checkbox");
var import_react_utils2 = require("@nextui-org/react-utils");
var import_shared_utils = require("@nextui-org/shared-utils");
function useCheckboxGroup(props) {
  const {
    as,
    ref,
    classNames,
    children,
    label,
    radius,
    value,
    name,
    defaultValue,
    size = "md",
    color = "primary",
    orientation = "vertical",
    lineThrough = false,
    isDisabled = false,
    disableAnimation = false,
    validationState,
    isInvalid = validationState === "invalid",
    isReadOnly,
    isRequired,
    onValueChange,
    description,
    errorMessage,
    className,
    ...otherProps
  } = props;
  const Component = as || "div";
  const domRef = (0, import_react_utils2.useDOMRef)(ref);
  const checkboxGroupProps = (0, import_react.useMemo)(
    () => ({
      value,
      name,
      "aria-label": (0, import_shared_utils.safeAriaLabel)(otherProps["aria-label"], label),
      defaultValue,
      isRequired,
      isInvalid,
      isReadOnly,
      orientation,
      onChange: onValueChange,
      ...otherProps
    }),
    [
      value,
      name,
      label,
      defaultValue,
      isRequired,
      isReadOnly,
      isInvalid,
      orientation,
      onValueChange,
      otherProps["aria-label"],
      otherProps
    ]
  );
  const groupState = (0, import_checkbox2.useCheckboxGroupState)(checkboxGroupProps);
  const { labelProps, groupProps, descriptionProps, errorMessageProps } = (0, import_checkbox.useCheckboxGroup)(
    checkboxGroupProps,
    groupState
  );
  const context = (0, import_react.useMemo)(
    () => ({
      size,
      color,
      radius,
      lineThrough,
      isInvalid,
      isDisabled,
      disableAnimation,
      groupState
    }),
    [
      size,
      color,
      radius,
      lineThrough,
      isDisabled,
      disableAnimation,
      isInvalid,
      groupState == null ? void 0 : groupState.value,
      groupState == null ? void 0 : groupState.isDisabled,
      groupState == null ? void 0 : groupState.isReadOnly,
      groupState == null ? void 0 : groupState.isInvalid,
      groupState == null ? void 0 : groupState.isSelected
    ]
  );
  const slots = (0, import_react.useMemo)(
    () => (0, import_theme.checkboxGroup)({ isRequired, isInvalid, disableAnimation }),
    [isRequired, isInvalid, disableAnimation]
  );
  const baseStyles = (0, import_shared_utils.clsx)(classNames == null ? void 0 : classNames.base, className);
  const getGroupProps = (0, import_react.useCallback)(() => {
    return {
      ref: domRef,
      className: slots.base({ class: baseStyles }),
      ...(0, import_utils.mergeProps)(groupProps, otherProps)
    };
  }, [slots, domRef, baseStyles, groupProps, otherProps]);
  const getLabelProps = (0, import_react.useCallback)(() => {
    return {
      className: slots.label({ class: classNames == null ? void 0 : classNames.label }),
      ...labelProps
    };
  }, [slots, labelProps, classNames == null ? void 0 : classNames.label]);
  const getWrapperProps = (0, import_react.useCallback)(() => {
    return {
      className: slots.wrapper({ class: classNames == null ? void 0 : classNames.wrapper }),
      role: "presentation",
      "data-orientation": orientation
    };
  }, [slots, orientation, classNames == null ? void 0 : classNames.wrapper]);
  const getDescriptionProps = (0, import_react.useCallback)(
    (props2 = {}) => {
      return {
        ...props2,
        ...descriptionProps,
        className: slots.description({ class: (0, import_shared_utils.clsx)(classNames == null ? void 0 : classNames.description, props2 == null ? void 0 : props2.className) })
      };
    },
    [slots, descriptionProps, classNames == null ? void 0 : classNames.description]
  );
  const getErrorMessageProps = (0, import_react.useCallback)(
    (props2 = {}) => {
      return {
        ...props2,
        ...errorMessageProps,
        className: slots.errorMessage({ class: (0, import_shared_utils.clsx)(classNames == null ? void 0 : classNames.errorMessage, props2 == null ? void 0 : props2.className) })
      };
    },
    [slots, errorMessageProps, classNames == null ? void 0 : classNames.errorMessage]
  );
  return {
    Component,
    children,
    label,
    context,
    description,
    errorMessage,
    getGroupProps,
    getLabelProps,
    getWrapperProps,
    getDescriptionProps,
    getErrorMessageProps
  };
}

// src/checkbox-group.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var CheckboxGroup = (0, import_system.forwardRef)((props, ref) => {
  const {
    children,
    context,
    label,
    description,
    errorMessage,
    getGroupProps,
    getLabelProps,
    getWrapperProps,
    getDescriptionProps,
    getErrorMessageProps
  } = useCheckboxGroup({ ...props, ref });
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { ...getGroupProps(), children: [
    label && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { ...getLabelProps(), children: label }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ...getWrapperProps(), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxGroupProvider, { value: context, children }) }),
    errorMessage ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ...getErrorMessageProps(), children: errorMessage }) : description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ...getDescriptionProps(), children: description }) : null
  ] });
});
CheckboxGroup.displayName = "NextUI.CheckboxGroup";
var checkbox_group_default = CheckboxGroup;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
