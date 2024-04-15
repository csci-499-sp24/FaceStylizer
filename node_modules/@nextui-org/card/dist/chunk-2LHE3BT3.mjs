"use client";

// src/use-card.ts
import { card } from "@nextui-org/theme";
import { useCallback, useMemo } from "react";
import { chain, mergeProps } from "@react-aria/utils";
import { useFocusRing } from "@react-aria/focus";
import { useHover } from "@react-aria/interactions";
import { useAriaButton } from "@nextui-org/use-aria-button";
import { mapPropsVariants } from "@nextui-org/system";
import { clsx, dataAttr } from "@nextui-org/shared-utils";
import { filterDOMProps } from "@nextui-org/react-utils";
import { useDOMRef } from "@nextui-org/react-utils";
import { useRipple } from "@nextui-org/ripple";
function useCard(originalProps) {
  const [props, variantProps] = mapPropsVariants(originalProps, card.variantKeys);
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
  const domRef = useDOMRef(ref);
  const Component = as || (originalProps.isPressable ? "button" : "div");
  const shouldFilterDOMProps = typeof Component === "string";
  const baseStyles = clsx(classNames == null ? void 0 : classNames.base, className);
  const { onClick: onRippleClickHandler, onClear: onClearRipple, ripples } = useRipple();
  const handleClick = (e) => {
    if (!originalProps.disableAnimation && !disableRipple && domRef.current) {
      onRippleClickHandler(e);
    }
  };
  const { buttonProps, isPressed } = useAriaButton(
    {
      onPress,
      elementType: as,
      isDisabled: !originalProps.isPressable,
      onClick: chain(onClick, handleClick),
      allowTextSelectionOnPress,
      ...otherProps
    },
    domRef
  );
  const { hoverProps, isHovered } = useHover({
    isDisabled: !originalProps.isHoverable,
    ...otherProps
  });
  const { isFocusVisible, isFocused, focusProps } = useFocusRing({
    autoFocus
  });
  const slots = useMemo(
    () => card({
      ...variantProps
    }),
    [...Object.values(variantProps)]
  );
  const context = useMemo(
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
  const getCardProps = useCallback(
    (props2 = {}) => {
      return {
        ref: domRef,
        className: slots.base({ class: baseStyles }),
        tabIndex: originalProps.isPressable ? 0 : -1,
        "data-hover": dataAttr(isHovered),
        "data-pressed": dataAttr(isPressed),
        "data-focus": dataAttr(isFocused),
        "data-focus-visible": dataAttr(isFocusVisible),
        "data-disabled": dataAttr(originalProps.isDisabled),
        ...mergeProps(
          originalProps.isPressable ? { ...buttonProps, ...focusProps, role: "button" } : {},
          originalProps.isHoverable ? hoverProps : {},
          filterDOMProps(otherProps, {
            enabled: shouldFilterDOMProps
          }),
          filterDOMProps(props2)
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
  const getRippleProps = useCallback(
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

export {
  useCard
};
