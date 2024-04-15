"use client";

// src/use-accordion-item.ts
import { useFocusRing } from "@react-aria/focus";
import { accordionItem } from "@nextui-org/theme";
import { clsx, callAllHandlers, dataAttr } from "@nextui-org/shared-utils";
import { useDOMRef, filterDOMProps } from "@nextui-org/react-utils";
import { useReactAriaAccordionItem } from "@nextui-org/use-aria-accordion";
import { useCallback, useMemo } from "react";
import { chain, mergeProps } from "@react-aria/utils";
import { useHover } from "@react-aria/interactions";
import { usePress } from "@nextui-org/use-aria-press";
function useAccordionItem(props) {
  var _a;
  const { ref, as, item, onFocusChange } = props;
  const {
    state,
    className,
    indicator,
    children,
    title,
    subtitle,
    startContent,
    motionProps,
    focusedKey,
    isCompact = false,
    classNames: classNamesProp = {},
    isDisabled: isDisabledProp = false,
    hideIndicator = false,
    disableAnimation = false,
    keepContentMounted = false,
    disableIndicatorAnimation = false,
    onPress,
    onPressStart,
    onPressEnd,
    onPressChange,
    onPressUp,
    onClick,
    ...otherProps
  } = props;
  const Component = as || "div";
  const shouldFilterDOMProps = typeof Component === "string";
  const domRef = useDOMRef(ref);
  const isDisabled = state.disabledKeys.has(item.key) || isDisabledProp;
  const isOpen = state.selectionManager.isSelected(item.key);
  const { buttonProps: buttonCompleteProps, regionProps } = useReactAriaAccordionItem(
    { item, isDisabled },
    { ...state, focusedKey },
    domRef
  );
  const { onFocus: onFocusButton, onBlur: onBlurButton, ...buttonProps } = buttonCompleteProps;
  const { isFocused, isFocusVisible, focusProps } = useFocusRing({
    autoFocus: (_a = item.props) == null ? void 0 : _a.autoFocus
  });
  const { isHovered, hoverProps } = useHover({ isDisabled });
  const { pressProps, isPressed } = usePress({
    ref: domRef,
    isDisabled,
    onPress,
    onPressStart,
    onPressEnd,
    onPressChange,
    onPressUp
  });
  const handleFocus = useCallback(() => {
    onFocusChange == null ? void 0 : onFocusChange(true, item.key);
  }, []);
  const handleBlur = useCallback(() => {
    onFocusChange == null ? void 0 : onFocusChange(false, item.key);
  }, []);
  const classNames = useMemo(
    () => ({
      ...classNamesProp
    }),
    [...Object.values(classNamesProp)]
  );
  const slots = useMemo(
    () => accordionItem({
      isCompact,
      isDisabled,
      hideIndicator,
      disableAnimation,
      disableIndicatorAnimation
    }),
    [isCompact, isDisabled, hideIndicator, disableAnimation, disableIndicatorAnimation]
  );
  const baseStyles = clsx(classNames == null ? void 0 : classNames.base, className);
  const getBaseProps = useCallback(
    (props2 = {}) => {
      return {
        "data-open": dataAttr(isOpen),
        "data-disabled": dataAttr(isDisabled),
        className: slots.base({ class: baseStyles }),
        ...mergeProps(
          filterDOMProps(otherProps, {
            enabled: shouldFilterDOMProps
          }),
          props2
        )
      };
    },
    [baseStyles, shouldFilterDOMProps, otherProps, slots, item.props, isOpen, isDisabled]
  );
  const getButtonProps = (props2 = {}) => {
    var _a2, _b;
    return {
      ref: domRef,
      "data-open": dataAttr(isOpen),
      "data-focus": dataAttr(isFocused),
      "data-focus-visible": dataAttr(isFocusVisible),
      "data-disabled": dataAttr(isDisabled),
      "data-hover": dataAttr(isHovered),
      "data-pressed": dataAttr(isPressed),
      className: slots.trigger({ class: classNames == null ? void 0 : classNames.trigger }),
      onFocus: callAllHandlers(
        handleFocus,
        onFocusButton,
        focusProps.onFocus,
        otherProps.onFocus,
        (_a2 = item.props) == null ? void 0 : _a2.onFocus
      ),
      onBlur: callAllHandlers(
        handleBlur,
        onBlurButton,
        focusProps.onBlur,
        otherProps.onBlur,
        (_b = item.props) == null ? void 0 : _b.onBlur
      ),
      ...mergeProps(buttonProps, hoverProps, pressProps, props2),
      onClick: chain(pressProps.onClick, onClick)
    };
  };
  const getContentProps = useCallback(
    (props2 = {}) => {
      return {
        "data-open": dataAttr(isOpen),
        "data-disabled": dataAttr(isDisabled),
        className: slots.content({ class: classNames == null ? void 0 : classNames.content }),
        ...mergeProps(regionProps, props2)
      };
    },
    [slots, classNames, regionProps, isOpen, isDisabled, classNames == null ? void 0 : classNames.content]
  );
  const getIndicatorProps = useCallback(
    (props2 = {}) => {
      return {
        "aria-hidden": dataAttr(true),
        "data-open": dataAttr(isOpen),
        "data-disabled": dataAttr(isDisabled),
        className: slots.indicator({ class: classNames == null ? void 0 : classNames.indicator }),
        ...props2
      };
    },
    [slots, classNames == null ? void 0 : classNames.indicator, isOpen, isDisabled, classNames == null ? void 0 : classNames.indicator]
  );
  const getHeadingProps = useCallback(
    (props2 = {}) => {
      return {
        "data-open": dataAttr(isOpen),
        "data-disabled": dataAttr(isDisabled),
        className: slots.heading({ class: classNames == null ? void 0 : classNames.heading }),
        ...props2
      };
    },
    [slots, classNames == null ? void 0 : classNames.heading, isOpen, isDisabled, classNames == null ? void 0 : classNames.heading]
  );
  const getTitleProps = useCallback(
    (props2 = {}) => {
      return {
        "data-open": dataAttr(isOpen),
        "data-disabled": dataAttr(isDisabled),
        className: slots.title({ class: classNames == null ? void 0 : classNames.title }),
        ...props2
      };
    },
    [slots, classNames == null ? void 0 : classNames.title, isOpen, isDisabled, classNames == null ? void 0 : classNames.title]
  );
  const getSubtitleProps = useCallback(
    (props2 = {}) => {
      return {
        "data-open": dataAttr(isOpen),
        "data-disabled": dataAttr(isDisabled),
        className: slots.subtitle({ class: classNames == null ? void 0 : classNames.subtitle }),
        ...props2
      };
    },
    [slots, classNames, isOpen, isDisabled, classNames == null ? void 0 : classNames.subtitle]
  );
  return {
    Component,
    item,
    slots,
    classNames,
    domRef,
    indicator,
    children,
    title,
    subtitle,
    startContent,
    isOpen,
    isDisabled,
    hideIndicator,
    keepContentMounted,
    disableAnimation,
    motionProps,
    getBaseProps,
    getHeadingProps,
    getButtonProps,
    getContentProps,
    getIndicatorProps,
    getTitleProps,
    getSubtitleProps
  };
}

export {
  useAccordionItem
};
