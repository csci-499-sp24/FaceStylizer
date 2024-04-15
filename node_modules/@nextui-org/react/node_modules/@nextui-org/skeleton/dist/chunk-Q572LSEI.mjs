// src/use-skeleton.ts
import { mapPropsVariants } from "@nextui-org/system-rsc";
import { skeleton } from "@nextui-org/theme";
import { clsx, dataAttr } from "@nextui-org/shared-utils";
import { useMemo } from "react";
function useSkeleton(originalProps) {
  const [props, variantProps] = mapPropsVariants(originalProps, skeleton.variantKeys);
  const { as, children, isLoaded = false, className, classNames, ...otherProps } = props;
  const Component = as || "div";
  const slots = useMemo(
    () => skeleton({
      ...variantProps
    }),
    [...Object.values(variantProps), children]
  );
  const baseStyles = clsx(classNames == null ? void 0 : classNames.base, className);
  const getSkeletonProps = (props2 = {}) => {
    return {
      "data-loaded": dataAttr(isLoaded),
      className: slots.base({ class: clsx(baseStyles, props2 == null ? void 0 : props2.className) }),
      ...otherProps
    };
  };
  const getContentProps = (props2 = {}) => {
    return {
      className: slots.content({ class: clsx(classNames == null ? void 0 : classNames.content, props2 == null ? void 0 : props2.className) })
    };
  };
  return { Component, children, slots, classNames, getSkeletonProps, getContentProps };
}

export {
  useSkeleton
};
