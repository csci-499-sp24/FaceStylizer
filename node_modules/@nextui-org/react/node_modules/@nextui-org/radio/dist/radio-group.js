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

// src/radio-group.tsx
var radio_group_exports = {};
__export(radio_group_exports, {
  default: () => radio_group_default
});
module.exports = __toCommonJS(radio_group_exports);
var import_system = require("@nextui-org/system");

// src/radio-group-context.ts
var import_react_utils = require("@nextui-org/react-utils");
var [RadioGroupProvider, useRadioGroupContext] = (0, import_react_utils.createContext)({
  name: "RadioGroupContext",
  strict: false
});

// src/use-radio-group.ts
var import_theme = require("@nextui-org/theme");
var import_react = require("react");
var import_radio = require("@react-stately/radio");
var import_radio2 = require("@react-aria/radio");
var import_react_utils2 = require("@nextui-org/react-utils");
var import_shared_utils = require("@nextui-org/shared-utils");
var import_utils = require("@react-aria/utils");
function useRadioGroup(props) {
  const {
    as,
    ref,
    classNames,
    children,
    label,
    value,
    name,
    size = "md",
    color = "primary",
    isDisabled = false,
    disableAnimation = false,
    orientation = "vertical",
    isRequired = false,
    validationState,
    isInvalid = validationState === "invalid",
    isReadOnly,
    errorMessage,
    description,
    className,
    onChange,
    onValueChange,
    ...otherProps
  } = props;
  const Component = as || "div";
  const domRef = (0, import_react_utils2.useDOMRef)(ref);
  const otherPropsWithOrientation = (0, import_react.useMemo)(() => {
    return {
      ...otherProps,
      value,
      name,
      "aria-label": (0, import_shared_utils.safeAriaLabel)(otherProps["aria-label"], label),
      isRequired,
      isReadOnly,
      isInvalid,
      orientation,
      onChange: onValueChange
    };
  }, [
    otherProps,
    value,
    name,
    label,
    isRequired,
    isReadOnly,
    isInvalid,
    orientation,
    onValueChange
  ]);
  const groupState = (0, import_radio.useRadioGroupState)(otherPropsWithOrientation);
  const {
    labelProps,
    radioGroupProps: groupProps,
    errorMessageProps,
    descriptionProps
  } = (0, import_radio2.useRadioGroup)(otherPropsWithOrientation, groupState);
  const context = (0, import_react.useMemo)(
    () => ({
      size,
      color,
      groupState,
      isRequired,
      isInvalid,
      isDisabled,
      disableAnimation,
      onChange
    }),
    [
      size,
      color,
      isRequired,
      isDisabled,
      isInvalid,
      onChange,
      disableAnimation,
      groupState.name,
      groupState == null ? void 0 : groupState.isDisabled,
      groupState == null ? void 0 : groupState.isReadOnly,
      groupState == null ? void 0 : groupState.isRequired,
      groupState == null ? void 0 : groupState.selectedValue,
      groupState == null ? void 0 : groupState.lastFocusedValue
    ]
  );
  const slots = (0, import_react.useMemo)(
    () => (0, import_theme.radioGroup)({ isRequired, isInvalid, disableAnimation }),
    [isInvalid, isRequired, disableAnimation]
  );
  const baseStyles = (0, import_shared_utils.clsx)(classNames == null ? void 0 : classNames.base, className);
  const getGroupProps = (0, import_react.useCallback)(() => {
    return {
      ref: domRef,
      className: slots.base({ class: baseStyles }),
      ...(0, import_utils.mergeProps)(groupProps, otherProps)
    };
  }, [domRef, slots, baseStyles, groupProps, otherProps]);
  const getLabelProps = (0, import_react.useCallback)(() => {
    return {
      className: slots.label({ class: classNames == null ? void 0 : classNames.label }),
      ...labelProps
    };
  }, [slots, classNames == null ? void 0 : classNames.label, labelProps, classNames == null ? void 0 : classNames.label]);
  const getWrapperProps = (0, import_react.useCallback)(() => {
    return {
      className: slots.wrapper({ class: classNames == null ? void 0 : classNames.wrapper }),
      role: "presentation",
      "data-orientation": orientation
    };
  }, [slots, classNames == null ? void 0 : classNames.wrapper, orientation, slots.wrapper]);
  const getDescriptionProps = (0, import_react.useCallback)(
    (props2 = {}) => {
      return {
        ...props2,
        ...descriptionProps,
        className: slots.description({ class: (0, import_shared_utils.clsx)(classNames == null ? void 0 : classNames.description, props2 == null ? void 0 : props2.className) })
      };
    },
    [slots, classNames == null ? void 0 : classNames.description, descriptionProps, slots.description]
  );
  const getErrorMessageProps = (0, import_react.useCallback)(
    (props2 = {}) => {
      return {
        ...props2,
        ...errorMessageProps,
        className: slots.errorMessage({ class: (0, import_shared_utils.clsx)(classNames == null ? void 0 : classNames.errorMessage, props2 == null ? void 0 : props2.className) })
      };
    },
    [slots, classNames == null ? void 0 : classNames.errorMessage, errorMessageProps]
  );
  return {
    Component,
    children,
    label,
    context,
    errorMessage,
    description,
    getGroupProps,
    getLabelProps,
    getWrapperProps,
    getDescriptionProps,
    getErrorMessageProps
  };
}

// src/radio-group.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var RadioGroup = (0, import_system.forwardRef)((props, ref) => {
  const {
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
  } = useRadioGroup({ ...props, ref });
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Component, { ...getGroupProps(), children: [
    label && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { ...getLabelProps(), children: label }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ...getWrapperProps(), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupProvider, { value: context, children }) }),
    errorMessage ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ...getErrorMessageProps(), children: errorMessage }) : description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ...getDescriptionProps(), children: description }) : null
  ] });
});
RadioGroup.displayName = "NextUI.RadioGroup";
var radio_group_default = RadioGroup;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
