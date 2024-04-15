"use client";

// src/use-menu-item.ts
import { useMemo, useRef, useCallback } from "react";
import { menuItem } from "@nextui-org/theme";
import { mapPropsVariants } from "@nextui-org/system";
import { useFocusRing } from "@react-aria/focus";
import { filterDOMProps } from "@nextui-org/react-utils";
import { clsx, dataAttr, removeEvents } from "@nextui-org/shared-utils";
import { useMenuItem as useAriaMenuItem } from "@react-aria/menu";
import { chain, mergeProps } from "@react-aria/utils";
import { useHover } from "@react-aria/interactions";
import { usePress } from "@nextui-org/use-aria-press";
import { useIsMobile } from "@nextui-org/use-is-mobile";
function useMenuItem(originalProps) {
  const [props, variantProps] = mapPropsVariants(originalProps, menuItem.variantKeys);
  const {
    as,
    item,
    state,
    shortcut,
    description,
    startContent,
    endContent,
    isVirtualized,
    selectedIcon,
    className,
    classNames,
    onAction,
    autoFocus,
    onPress,
    onClick,
    hideSelectedIcon = false,
    isReadOnly = false,
    closeOnSelect,
    onClose,
    ...otherProps
  } = props;
  const disableAnimation = originalProps.disableAnimation;
  const domRef = useRef(null);
  const Component = as || ((otherProps == null ? void 0 : otherProps.href) ? "a" : "li");
  const shouldFilterDOMProps = typeof Component === "string";
  const { rendered, key } = item;
  const isDisabled = state.disabledKeys.has(key) || originalProps.isDisabled;
  const isSelectable = state.selectionManager.selectionMode !== "none";
  const isMobile = useIsMobile();
  const { pressProps, isPressed } = usePress({
    ref: domRef,
    isDisabled,
    onPress
  });
  const { isHovered, hoverProps } = useHover({
    isDisabled
  });
  const { isFocusVisible, focusProps } = useFocusRing({
    autoFocus
  });
  const {
    isFocused,
    isSelected,
    menuItemProps,
    labelProps,
    descriptionProps,
    keyboardShortcutProps
  } = useAriaMenuItem(
    {
      key,
      onClose,
      isDisabled,
      "aria-label": props["aria-label"],
      closeOnSelect,
      isVirtualized,
      onAction
    },
    state,
    domRef
  );
  let itemProps = menuItemProps;
  const slots = useMemo(
    () => menuItem({
      ...variantProps,
      isDisabled,
      disableAnimation
    }),
    [...Object.values(variantProps), isDisabled, disableAnimation]
  );
  const baseStyles = clsx(classNames == null ? void 0 : classNames.base, className);
  if (isReadOnly) {
    itemProps = removeEvents(itemProps);
  }
  const getItemProps = (props2 = {}) => ({
    ref: domRef,
    ...mergeProps(
      itemProps,
      isReadOnly ? {} : mergeProps(focusProps, pressProps),
      hoverProps,
      filterDOMProps(otherProps, {
        enabled: shouldFilterDOMProps
      }),
      props2
    ),
    "data-focus": dataAttr(isFocused),
    "data-selectable": dataAttr(isSelectable),
    "data-hover": dataAttr(isMobile ? isHovered || isPressed : isHovered),
    "data-disabled": dataAttr(isDisabled),
    "data-selected": dataAttr(isSelected),
    "data-pressed": dataAttr(isPressed),
    "data-focus-visible": dataAttr(isFocusVisible),
    className: slots.base({ class: clsx(baseStyles, props2.className) }),
    onClick: chain(pressProps.onClick, onClick)
  });
  const getLabelProps = (props2 = {}) => ({
    ...mergeProps(labelProps, props2),
    className: slots.title({ class: classNames == null ? void 0 : classNames.title })
  });
  const getDescriptionProps = (props2 = {}) => ({
    ...mergeProps(descriptionProps, props2),
    className: slots.description({ class: classNames == null ? void 0 : classNames.description })
  });
  const getKeyboardShortcutProps = (props2 = {}) => ({
    ...mergeProps(keyboardShortcutProps, props2),
    className: slots.shortcut({ class: classNames == null ? void 0 : classNames.shortcut })
  });
  const getSelectedIconProps = useCallback(
    (props2 = {}) => {
      return {
        "aria-hidden": dataAttr(true),
        "data-disabled": dataAttr(isDisabled),
        className: slots.selectedIcon({ class: classNames == null ? void 0 : classNames.selectedIcon }),
        ...props2
      };
    },
    [isDisabled, slots, classNames]
  );
  return {
    Component,
    domRef,
    slots,
    classNames,
    isSelectable,
    isSelected,
    isDisabled,
    rendered,
    shortcut,
    description,
    startContent,
    endContent,
    selectedIcon,
    disableAnimation,
    getItemProps,
    getLabelProps,
    hideSelectedIcon,
    getDescriptionProps,
    getKeyboardShortcutProps,
    getSelectedIconProps
  };
}

export {
  useMenuItem
};
