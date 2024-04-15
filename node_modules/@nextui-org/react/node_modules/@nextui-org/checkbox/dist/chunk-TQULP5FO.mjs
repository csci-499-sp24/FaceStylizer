"use client";

// src/use-checkbox-group.ts
import { useCallback, useMemo } from "react";
import { mergeProps } from "@react-aria/utils";
import { checkboxGroup } from "@nextui-org/theme";
import { useCheckboxGroup as useReactAriaCheckboxGroup } from "@react-aria/checkbox";
import { useCheckboxGroupState } from "@react-stately/checkbox";
import { useDOMRef } from "@nextui-org/react-utils";
import { clsx, safeAriaLabel } from "@nextui-org/shared-utils";
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
  const domRef = useDOMRef(ref);
  const checkboxGroupProps = useMemo(
    () => ({
      value,
      name,
      "aria-label": safeAriaLabel(otherProps["aria-label"], label),
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
  const groupState = useCheckboxGroupState(checkboxGroupProps);
  const { labelProps, groupProps, descriptionProps, errorMessageProps } = useReactAriaCheckboxGroup(
    checkboxGroupProps,
    groupState
  );
  const context = useMemo(
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
  const slots = useMemo(
    () => checkboxGroup({ isRequired, isInvalid, disableAnimation }),
    [isRequired, isInvalid, disableAnimation]
  );
  const baseStyles = clsx(classNames == null ? void 0 : classNames.base, className);
  const getGroupProps = useCallback(() => {
    return {
      ref: domRef,
      className: slots.base({ class: baseStyles }),
      ...mergeProps(groupProps, otherProps)
    };
  }, [slots, domRef, baseStyles, groupProps, otherProps]);
  const getLabelProps = useCallback(() => {
    return {
      className: slots.label({ class: classNames == null ? void 0 : classNames.label }),
      ...labelProps
    };
  }, [slots, labelProps, classNames == null ? void 0 : classNames.label]);
  const getWrapperProps = useCallback(() => {
    return {
      className: slots.wrapper({ class: classNames == null ? void 0 : classNames.wrapper }),
      role: "presentation",
      "data-orientation": orientation
    };
  }, [slots, orientation, classNames == null ? void 0 : classNames.wrapper]);
  const getDescriptionProps = useCallback(
    (props2 = {}) => {
      return {
        ...props2,
        ...descriptionProps,
        className: slots.description({ class: clsx(classNames == null ? void 0 : classNames.description, props2 == null ? void 0 : props2.className) })
      };
    },
    [slots, descriptionProps, classNames == null ? void 0 : classNames.description]
  );
  const getErrorMessageProps = useCallback(
    (props2 = {}) => {
      return {
        ...props2,
        ...errorMessageProps,
        className: slots.errorMessage({ class: clsx(classNames == null ? void 0 : classNames.errorMessage, props2 == null ? void 0 : props2.className) })
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

export {
  useCheckboxGroup
};
