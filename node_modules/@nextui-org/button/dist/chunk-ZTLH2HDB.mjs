"use client";

// src/use-button-group.ts
import { buttonGroup } from "@nextui-org/theme";
import { mapPropsVariants } from "@nextui-org/system";
import { useDOMRef } from "@nextui-org/react-utils";
import { useMemo, useCallback } from "react";
function useButtonGroup(originalProps) {
  const [props, variantProps] = mapPropsVariants(originalProps, buttonGroup.variantKeys);
  const {
    ref,
    as,
    children,
    color = "default",
    size = "md",
    variant = "solid",
    radius,
    isDisabled = false,
    disableAnimation = false,
    disableRipple = false,
    isIconOnly = false,
    className,
    ...otherProps
  } = props;
  const Component = as || "div";
  const domRef = useDOMRef(ref);
  const classNames = useMemo(
    () => buttonGroup({
      ...variantProps,
      className
    }),
    [...Object.values(variantProps), className]
  );
  const context = useMemo(
    () => ({
      size,
      color,
      variant,
      radius,
      isIconOnly,
      isDisabled,
      disableAnimation,
      disableRipple,
      fullWidth: !!(originalProps == null ? void 0 : originalProps.fullWidth)
    }),
    [
      size,
      color,
      variant,
      radius,
      isDisabled,
      isIconOnly,
      disableAnimation,
      disableRipple,
      originalProps == null ? void 0 : originalProps.fullWidth
    ]
  );
  const getButtonGroupProps = useCallback(
    () => ({
      role: "group",
      ...otherProps
    }),
    [otherProps]
  );
  return {
    Component,
    children,
    domRef,
    context,
    classNames,
    getButtonGroupProps
  };
}

export {
  useButtonGroup
};
