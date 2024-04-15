"use client";
import {
  useCheckboxGroupContext
} from "./chunk-ACAJT7GC.mjs";

// src/use-checkbox.ts
import { useCallback, useId, useState } from "react";
import { useMemo, useRef } from "react";
import { useToggleState } from "@react-stately/toggle";
import { checkbox } from "@nextui-org/theme";
import { useHover } from "@react-aria/interactions";
import { usePress } from "@nextui-org/use-aria-press";
import { useFocusRing } from "@react-aria/focus";
import { chain, mergeProps } from "@react-aria/utils";
import { useFocusableRef } from "@nextui-org/react-utils";
import { __DEV__, warn, clsx, dataAttr, safeAriaLabel } from "@nextui-org/shared-utils";
import {
  useCheckbox as useReactAriaCheckbox,
  useCheckboxGroupItem as useReactAriaCheckboxGroupItem
} from "@react-aria/checkbox";
function useCheckbox(props = {}) {
  var _a, _b, _c, _d, _e, _f;
  const groupContext = useCheckboxGroupContext();
  const isInGroup = !!groupContext;
  const {
    as,
    ref,
    value = "",
    children,
    icon,
    name,
    isRequired = false,
    isReadOnly: isReadOnlyProp = false,
    autoFocus = false,
    isSelected: isSelectedProp,
    validationState,
    size = (_a = groupContext == null ? void 0 : groupContext.size) != null ? _a : "md",
    color = (_b = groupContext == null ? void 0 : groupContext.color) != null ? _b : "primary",
    radius = groupContext == null ? void 0 : groupContext.radius,
    lineThrough = (_c = groupContext == null ? void 0 : groupContext.lineThrough) != null ? _c : false,
    isDisabled: isDisabledProp = (_d = groupContext == null ? void 0 : groupContext.isDisabled) != null ? _d : false,
    disableAnimation = (_e = groupContext == null ? void 0 : groupContext.disableAnimation) != null ? _e : false,
    isInvalid = validationState ? validationState === "invalid" : (_f = groupContext == null ? void 0 : groupContext.isInvalid) != null ? _f : false,
    isIndeterminate = false,
    defaultSelected,
    classNames,
    onChange,
    className,
    onValueChange,
    ...otherProps
  } = props;
  if (groupContext && __DEV__) {
    if (isSelectedProp) {
      warn(
        "The Checkbox.Group is being used, `isSelected` will be ignored. Use the `value` of the Checkbox.Group instead.",
        "Checkbox"
      );
    }
    if (defaultSelected) {
      warn(
        "The Checkbox.Group is being used, `defaultSelected` will be ignored. Use the `defaultValue` of the Checkbox.Group instead.",
        "Checkbox"
      );
    }
  }
  const Component = as || "label";
  const inputRef = useRef(null);
  const domRef = useFocusableRef(ref, inputRef);
  const labelId = useId();
  const ariaCheckboxProps = useMemo(() => {
    return {
      name,
      value,
      children,
      autoFocus,
      defaultSelected,
      isIndeterminate,
      isRequired,
      isInvalid,
      isSelected: isSelectedProp,
      isDisabled: isDisabledProp,
      isReadOnly: isReadOnlyProp,
      "aria-label": safeAriaLabel(otherProps["aria-label"], children),
      "aria-labelledby": otherProps["aria-labelledby"] || labelId,
      onChange: onValueChange
    };
  }, [
    value,
    name,
    labelId,
    children,
    autoFocus,
    isInvalid,
    isIndeterminate,
    isDisabledProp,
    isReadOnlyProp,
    isSelectedProp,
    defaultSelected,
    otherProps["aria-label"],
    otherProps["aria-labelledby"],
    onValueChange
  ]);
  const {
    inputProps,
    isSelected,
    isDisabled,
    isReadOnly,
    isPressed: isPressedKeyboard
  } = isInGroup ? useReactAriaCheckboxGroupItem(
    {
      ...ariaCheckboxProps,
      isInvalid
    },
    groupContext.groupState,
    inputRef
  ) : useReactAriaCheckbox(ariaCheckboxProps, useToggleState(ariaCheckboxProps), inputRef);
  const isInteractionDisabled = isDisabled || isReadOnly;
  const [isPressed, setPressed] = useState(false);
  const { pressProps } = usePress({
    isDisabled: isInteractionDisabled,
    onPressStart(e) {
      if (e.pointerType !== "keyboard") {
        setPressed(true);
      }
    },
    onPressEnd(e) {
      if (e.pointerType !== "keyboard") {
        setPressed(false);
      }
    }
  });
  const pressed = isInteractionDisabled ? false : isPressed || isPressedKeyboard;
  if (isRequired) {
    inputProps.required = true;
  }
  const { hoverProps, isHovered } = useHover({
    isDisabled: inputProps.disabled
  });
  const { focusProps, isFocused, isFocusVisible } = useFocusRing({
    autoFocus: inputProps.autoFocus
  });
  const slots = useMemo(
    () => checkbox({
      color,
      size,
      radius,
      isInvalid,
      lineThrough,
      isDisabled,
      disableAnimation
    }),
    [color, size, radius, isInvalid, lineThrough, isDisabled, disableAnimation]
  );
  const baseStyles = clsx(classNames == null ? void 0 : classNames.base, className);
  const getBaseProps = useCallback(() => {
    return {
      ref: domRef,
      className: slots.base({ class: baseStyles }),
      "data-disabled": dataAttr(isDisabled),
      "data-selected": dataAttr(isSelected || isIndeterminate),
      "data-invalid": dataAttr(isInvalid),
      "data-hover": dataAttr(isHovered),
      "data-focus": dataAttr(isFocused),
      "data-pressed": dataAttr(pressed),
      "data-readonly": dataAttr(inputProps.readOnly),
      "data-focus-visible": dataAttr(isFocusVisible),
      "data-indeterminate": dataAttr(isIndeterminate),
      ...mergeProps(hoverProps, pressProps, otherProps)
    };
  }, [
    slots,
    baseStyles,
    isDisabled,
    isSelected,
    isIndeterminate,
    isInvalid,
    isHovered,
    isFocused,
    pressed,
    inputProps.readOnly,
    isFocusVisible,
    hoverProps,
    pressProps,
    otherProps
  ]);
  const getWrapperProps = useCallback(
    (props2 = {}) => {
      return {
        ...props2,
        "aria-hidden": true,
        className: clsx(slots.wrapper({ class: clsx(classNames == null ? void 0 : classNames.wrapper, props2 == null ? void 0 : props2.className) }))
      };
    },
    [slots, classNames == null ? void 0 : classNames.wrapper]
  );
  const getInputProps = useCallback(() => {
    return {
      ref: inputRef,
      ...mergeProps(inputProps, focusProps),
      onChange: chain(inputProps.onChange, onChange)
    };
  }, [inputProps, focusProps, onChange]);
  const getLabelProps = useCallback(
    () => ({
      id: labelId,
      className: slots.label({ class: classNames == null ? void 0 : classNames.label })
    }),
    [slots, classNames == null ? void 0 : classNames.label, isDisabled, isSelected, isInvalid]
  );
  const getIconProps = useCallback(
    () => ({
      isSelected,
      isIndeterminate: !!isIndeterminate,
      disableAnimation: !!disableAnimation,
      className: slots.icon({ class: classNames == null ? void 0 : classNames.icon })
    }),
    [slots, classNames == null ? void 0 : classNames.icon, isSelected, isIndeterminate, disableAnimation]
  );
  return {
    Component,
    icon,
    children,
    isSelected,
    isDisabled,
    isInvalid,
    isFocused,
    isHovered,
    isFocusVisible,
    getBaseProps,
    getWrapperProps,
    getInputProps,
    getLabelProps,
    getIconProps
  };
}

export {
  useCheckbox
};
