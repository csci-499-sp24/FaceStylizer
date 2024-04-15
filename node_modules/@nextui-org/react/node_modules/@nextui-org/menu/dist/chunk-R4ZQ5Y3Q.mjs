"use client";

// src/use-menu.ts
import { useMenu as useAriaMenu } from "@react-aria/menu";
import { menu } from "@nextui-org/theme";
import { useTreeState } from "@react-stately/tree";
import { filterDOMProps, useDOMRef } from "@nextui-org/react-utils";
import { useMemo } from "react";
import { clsx } from "@nextui-org/shared-utils";
function useMenu(props) {
  const {
    as,
    ref,
    variant,
    color,
    children,
    disableAnimation,
    onAction,
    closeOnSelect,
    itemClasses,
    className,
    state: propState,
    topContent,
    bottomContent,
    hideEmptyContent = false,
    hideSelectedIcon = false,
    emptyContent = "No items.",
    menuProps: userMenuProps,
    onClose,
    classNames,
    ...otherProps
  } = props;
  const Component = as || "ul";
  const domRef = useDOMRef(ref);
  const shouldFilterDOMProps = typeof Component === "string";
  const innerState = useTreeState({ ...otherProps, children });
  const state = propState || innerState;
  const { menuProps } = useAriaMenu(otherProps, state, domRef);
  const slots = useMemo(() => menu({ className }), [className]);
  const baseStyles = clsx(classNames == null ? void 0 : classNames.base, className);
  const getBaseProps = (props2 = {}) => {
    return {
      ref: domRef,
      "data-slot": "base",
      className: slots.base({ class: baseStyles }),
      ...filterDOMProps(otherProps, {
        enabled: shouldFilterDOMProps
      }),
      ...props2
    };
  };
  const getListProps = (props2 = {}) => {
    return {
      "data-slot": "list",
      className: slots.list({ class: classNames == null ? void 0 : classNames.list }),
      ...userMenuProps,
      ...menuProps,
      ...props2
    };
  };
  const getEmptyContentProps = (props2 = {}) => {
    return {
      children: emptyContent,
      className: slots.emptyContent({ class: classNames == null ? void 0 : classNames.emptyContent }),
      ...props2
    };
  };
  return {
    Component,
    state,
    variant,
    color,
    disableAnimation,
    onAction,
    onClose,
    topContent,
    bottomContent,
    closeOnSelect,
    className,
    itemClasses,
    getBaseProps,
    getListProps,
    hideEmptyContent,
    hideSelectedIcon,
    getEmptyContentProps
  };
}

export {
  useMenu
};
