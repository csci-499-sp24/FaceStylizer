"use client";

// src/use-progress.ts
import { mapPropsVariants } from "@nextui-org/system";
import { progress } from "@nextui-org/theme";
import { useDOMRef } from "@nextui-org/react-utils";
import { clampPercentage, clsx, dataAttr } from "@nextui-org/shared-utils";
import { mergeProps } from "@react-aria/utils";
import { useMemo, useCallback } from "react";
import { useIsMounted } from "@nextui-org/use-is-mounted";
import { useProgressBar as useAriaProgress } from "@react-aria/progress";
function useProgress(originalProps) {
  const [props, variantProps] = mapPropsVariants(originalProps, progress.variantKeys);
  const {
    ref,
    as,
    id,
    className,
    classNames,
    label,
    valueLabel,
    value = 0,
    minValue = 0,
    maxValue = 100,
    showValueLabel = false,
    formatOptions = {
      style: "percent"
    },
    ...otherProps
  } = props;
  const Component = as || "div";
  const domRef = useDOMRef(ref);
  const baseStyles = clsx(classNames == null ? void 0 : classNames.base, className);
  const [, isMounted] = useIsMounted({
    rerender: true,
    delay: 100
  });
  const isIndeterminate = originalProps.isIndeterminate;
  const { progressBarProps, labelProps } = useAriaProgress({
    id,
    label,
    value,
    minValue,
    maxValue,
    valueLabel,
    formatOptions,
    isIndeterminate,
    "aria-labelledby": originalProps["aria-labelledby"],
    "aria-label": originalProps["aria-label"]
  });
  const slots = useMemo(
    () => progress({
      ...variantProps
    }),
    [...Object.values(variantProps)]
  );
  const selfMounted = originalProps.disableAnimation ? true : isMounted;
  const percentage = useMemo(
    () => isIndeterminate || !selfMounted ? void 0 : clampPercentage((value - minValue) / (maxValue - minValue) * 100),
    [selfMounted, isIndeterminate, value, minValue, maxValue]
  );
  const getProgressBarProps = useCallback(
    (props2 = {}) => ({
      ref: domRef,
      "data-indeterminate": dataAttr(isIndeterminate),
      "data-disabled": dataAttr(originalProps.isDisabled),
      className: slots.base({ class: baseStyles }),
      ...mergeProps(progressBarProps, otherProps, props2)
    }),
    [
      domRef,
      slots,
      isIndeterminate,
      originalProps.isDisabled,
      baseStyles,
      progressBarProps,
      otherProps
    ]
  );
  const getLabelProps = useCallback(
    (props2 = {}) => ({
      className: slots.label({ class: classNames == null ? void 0 : classNames.label }),
      ...mergeProps(labelProps, props2)
    }),
    [slots, classNames, labelProps]
  );
  return {
    Component,
    domRef,
    slots,
    classNames,
    label,
    percentage,
    showValueLabel,
    getProgressBarProps,
    getLabelProps
  };
}

export {
  useProgress
};
