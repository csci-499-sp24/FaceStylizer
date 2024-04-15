"use client";

// src/use-link.ts
import { link } from "@nextui-org/theme";
import { useAriaLink } from "@nextui-org/use-aria-link";
import { mapPropsVariants } from "@nextui-org/system";
import { useDOMRef } from "@nextui-org/react-utils";
import { useFocusRing } from "@react-aria/focus";
import { dataAttr } from "@nextui-org/shared-utils";
import { useMemo, useCallback } from "react";
import { mergeProps } from "@react-aria/utils";
function useLink(originalProps) {
  var _a, _b;
  const [props, variantProps] = mapPropsVariants(originalProps, link.variantKeys);
  const {
    ref,
    as,
    children,
    anchorIcon,
    isExternal = false,
    showAnchorIcon = false,
    autoFocus = false,
    className,
    onPress,
    onPressStart,
    onPressEnd,
    onClick,
    ...otherProps
  } = props;
  const Component = as || "a";
  const domRef = useDOMRef(ref);
  const { linkProps } = useAriaLink(
    {
      ...otherProps,
      onPress,
      onPressStart,
      onPressEnd,
      onClick,
      isDisabled: originalProps.isDisabled,
      elementType: `${as}`
    },
    domRef
  );
  const { isFocused, isFocusVisible, focusProps } = useFocusRing({
    autoFocus
  });
  if (isExternal) {
    otherProps.rel = (_a = otherProps.rel) != null ? _a : "noopener noreferrer";
    otherProps.target = (_b = otherProps.target) != null ? _b : "_blank";
  }
  const classNames = useMemo(
    () => link({
      ...variantProps,
      className
    }),
    [...Object.values(variantProps), className]
  );
  const getLinkProps = useCallback(() => {
    return {
      ref: domRef,
      className: classNames,
      "data-focus": dataAttr(isFocused),
      "data-disabled": dataAttr(originalProps.isDisabled),
      "data-focus-visible": dataAttr(isFocusVisible),
      ...mergeProps(focusProps, linkProps, otherProps)
    };
  }, [classNames, isFocused, isFocusVisible, focusProps, linkProps, otherProps]);
  return { Component, children, anchorIcon, showAnchorIcon, getLinkProps };
}

export {
  useLink
};
