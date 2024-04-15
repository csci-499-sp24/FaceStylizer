"use client";

// src/use-navbar.ts
import { mapPropsVariants } from "@nextui-org/system";
import { navbar } from "@nextui-org/theme";
import { useDOMRef } from "@nextui-org/react-utils";
import { clsx, dataAttr } from "@nextui-org/shared-utils";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { mergeProps, useResizeObserver } from "@react-aria/utils";
import { useScrollPosition } from "@nextui-org/use-scroll-position";
import { useControlledState } from "@react-stately/utils";
function useNavbar(originalProps) {
  var _a;
  const [props, variantProps] = mapPropsVariants(originalProps, navbar.variantKeys);
  const {
    ref,
    as,
    parentRef,
    height = "4rem",
    shouldHideOnScroll = false,
    disableScrollHandler = false,
    onScrollPositionChange,
    isMenuOpen: isMenuOpenProp,
    isMenuDefaultOpen,
    onMenuOpenChange = () => {
    },
    motionProps,
    className,
    classNames,
    ...otherProps
  } = props;
  const Component = as || "nav";
  const domRef = useDOMRef(ref);
  const prevWidth = useRef(0);
  const navHeight = useRef(0);
  const [isHidden, setIsHidden] = useState(false);
  const handleMenuOpenChange = useCallback(
    (isOpen) => {
      onMenuOpenChange(isOpen || false);
    },
    [onMenuOpenChange]
  );
  const [isMenuOpen, setIsMenuOpen] = useControlledState(
    isMenuOpenProp,
    isMenuDefaultOpen,
    handleMenuOpenChange
  );
  const updateWidth = () => {
    if (domRef.current) {
      const width = domRef.current.offsetWidth;
      if (width !== prevWidth.current) {
        prevWidth.current = width;
      }
    }
  };
  useResizeObserver({
    ref: domRef,
    onResize: () => {
      var _a2;
      const currentWidth = (_a2 = domRef.current) == null ? void 0 : _a2.offsetWidth;
      if (currentWidth !== prevWidth.current) {
        updateWidth();
        setIsMenuOpen(false);
      }
    }
  });
  useEffect(() => {
    var _a2;
    updateWidth();
    navHeight.current = ((_a2 = domRef.current) == null ? void 0 : _a2.offsetHeight) || 0;
  }, []);
  const slots = useMemo(
    () => navbar({
      ...variantProps,
      hideOnScroll: shouldHideOnScroll
    }),
    [...Object.values(variantProps), shouldHideOnScroll]
  );
  const baseStyles = clsx(classNames == null ? void 0 : classNames.base, className);
  useScrollPosition({
    elementRef: parentRef,
    isEnabled: shouldHideOnScroll || !disableScrollHandler,
    callback: ({ prevPos, currPos }) => {
      onScrollPositionChange == null ? void 0 : onScrollPositionChange(currPos.y);
      if (shouldHideOnScroll) {
        setIsHidden((prev) => {
          const next = currPos.y > prevPos.y && currPos.y > navHeight.current;
          return next !== prev ? next : prev;
        });
      }
    }
  });
  const getBaseProps = (props2 = {}) => ({
    ...mergeProps(otherProps, props2),
    "data-hidden": dataAttr(isHidden),
    "data-menu-open": dataAttr(isMenuOpen),
    ref: domRef,
    className: slots.base({ class: clsx(baseStyles, props2 == null ? void 0 : props2.className) }),
    style: {
      "--navbar-height": height,
      ...otherProps == null ? void 0 : otherProps.style,
      ...props2 == null ? void 0 : props2.style
    }
  });
  const getWrapperProps = (props2 = {}) => ({
    ...props2,
    "data-menu-open": dataAttr(isMenuOpen),
    className: slots.wrapper({ class: clsx(classNames == null ? void 0 : classNames.wrapper, props2 == null ? void 0 : props2.className) })
  });
  return {
    Component,
    slots,
    domRef,
    height,
    isHidden,
    disableAnimation: (_a = originalProps.disableAnimation) != null ? _a : false,
    shouldHideOnScroll,
    isMenuOpen,
    classNames,
    setIsMenuOpen,
    motionProps,
    getBaseProps,
    getWrapperProps
  };
}

export {
  useNavbar
};
