"use client";

// src/use-radio-group.ts
import { radioGroup } from "@nextui-org/theme";
import { useCallback, useMemo } from "react";
import { useRadioGroupState } from "@react-stately/radio";
import { useRadioGroup as useReactAriaRadioGroup } from "@react-aria/radio";
import { useDOMRef } from "@nextui-org/react-utils";
import { clsx, safeAriaLabel } from "@nextui-org/shared-utils";
import { mergeProps } from "@react-aria/utils";
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
  const domRef = useDOMRef(ref);
  const otherPropsWithOrientation = useMemo(() => {
    return {
      ...otherProps,
      value,
      name,
      "aria-label": safeAriaLabel(otherProps["aria-label"], label),
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
  const groupState = useRadioGroupState(otherPropsWithOrientation);
  const {
    labelProps,
    radioGroupProps: groupProps,
    errorMessageProps,
    descriptionProps
  } = useReactAriaRadioGroup(otherPropsWithOrientation, groupState);
  const context = useMemo(
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
  const slots = useMemo(
    () => radioGroup({ isRequired, isInvalid, disableAnimation }),
    [isInvalid, isRequired, disableAnimation]
  );
  const baseStyles = clsx(classNames == null ? void 0 : classNames.base, className);
  const getGroupProps = useCallback(() => {
    return {
      ref: domRef,
      className: slots.base({ class: baseStyles }),
      ...mergeProps(groupProps, otherProps)
    };
  }, [domRef, slots, baseStyles, groupProps, otherProps]);
  const getLabelProps = useCallback(() => {
    return {
      className: slots.label({ class: classNames == null ? void 0 : classNames.label }),
      ...labelProps
    };
  }, [slots, classNames == null ? void 0 : classNames.label, labelProps, classNames == null ? void 0 : classNames.label]);
  const getWrapperProps = useCallback(() => {
    return {
      className: slots.wrapper({ class: classNames == null ? void 0 : classNames.wrapper }),
      role: "presentation",
      "data-orientation": orientation
    };
  }, [slots, classNames == null ? void 0 : classNames.wrapper, orientation, slots.wrapper]);
  const getDescriptionProps = useCallback(
    (props2 = {}) => {
      return {
        ...props2,
        ...descriptionProps,
        className: slots.description({ class: clsx(classNames == null ? void 0 : classNames.description, props2 == null ? void 0 : props2.className) })
      };
    },
    [slots, classNames == null ? void 0 : classNames.description, descriptionProps, slots.description]
  );
  const getErrorMessageProps = useCallback(
    (props2 = {}) => {
      return {
        ...props2,
        ...errorMessageProps,
        className: slots.errorMessage({ class: clsx(classNames == null ? void 0 : classNames.errorMessage, props2 == null ? void 0 : props2.className) })
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

export {
  useRadioGroup
};
