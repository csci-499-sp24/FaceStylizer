"use client";
import {
  useAvatarGroupContext
} from "./chunk-PM5WBSHT.mjs";

// src/use-avatar.ts
import { avatar } from "@nextui-org/theme";
import { mergeProps } from "@react-aria/utils";
import { useDOMRef } from "@nextui-org/react-utils";
import { clsx, safeText, dataAttr } from "@nextui-org/shared-utils";
import { useFocusRing } from "@react-aria/focus";
import { useMemo, useCallback } from "react";
import { useImage } from "@nextui-org/use-image";
import { useHover } from "@react-aria/interactions";
function useAvatar(props = {}) {
  var _a, _b, _c, _d, _e;
  const groupContext = useAvatarGroupContext();
  const isInGroup = !!groupContext;
  const {
    as,
    ref,
    src,
    name,
    icon,
    classNames,
    fallback,
    alt = name || "avatar",
    imgRef: imgRefProp,
    color = (_a = groupContext == null ? void 0 : groupContext.color) != null ? _a : "default",
    radius = (_b = groupContext == null ? void 0 : groupContext.radius) != null ? _b : "full",
    size = (_c = groupContext == null ? void 0 : groupContext.size) != null ? _c : "md",
    isBordered = (_d = groupContext == null ? void 0 : groupContext.isBordered) != null ? _d : false,
    isDisabled = (_e = groupContext == null ? void 0 : groupContext.isDisabled) != null ? _e : false,
    isFocusable = false,
    getInitials = safeText,
    ignoreFallback = false,
    showFallback: showFallbackProp = false,
    ImgComponent = "img",
    imgProps,
    className,
    onError,
    ...otherProps
  } = props;
  const Component = as || "span";
  const domRef = useDOMRef(ref);
  const imgRef = useDOMRef(imgRefProp);
  const { isFocusVisible, isFocused, focusProps } = useFocusRing();
  const { isHovered, hoverProps } = useHover({ isDisabled });
  const imageStatus = useImage({ src, onError, ignoreFallback });
  const isImgLoaded = imageStatus === "loaded";
  const showFallback = (!src || !isImgLoaded) && showFallbackProp;
  const slots = useMemo(
    () => {
      var _a2;
      return avatar({
        color,
        radius,
        size,
        isBordered,
        isDisabled,
        isInGroup,
        isInGridGroup: (_a2 = groupContext == null ? void 0 : groupContext.isGrid) != null ? _a2 : false
      });
    },
    [color, radius, size, isBordered, isDisabled, isInGroup, groupContext == null ? void 0 : groupContext.isGrid]
  );
  const baseStyles = clsx(classNames == null ? void 0 : classNames.base, className);
  const canBeFocused = useMemo(() => {
    return isFocusable || as === "button";
  }, [isFocusable, as]);
  const getAvatarProps = useCallback(
    (props2 = {}) => ({
      ref: domRef,
      tabIndex: canBeFocused ? 0 : -1,
      "data-hover": dataAttr(isHovered),
      "data-focus": dataAttr(isFocused),
      "data-focus-visible": dataAttr(isFocusVisible),
      className: slots.base({
        class: clsx(baseStyles, props2 == null ? void 0 : props2.className)
      }),
      ...mergeProps(otherProps, hoverProps, canBeFocused ? focusProps : {})
    }),
    [canBeFocused, slots, baseStyles, focusProps, otherProps]
  );
  const getImageProps = useCallback(
    (props2 = {}) => ({
      ref: imgRef,
      src,
      "data-loaded": dataAttr(isImgLoaded),
      className: slots.img({ class: classNames == null ? void 0 : classNames.img }),
      ...mergeProps(imgProps, props2)
    }),
    [slots, isImgLoaded, imgProps, src, imgRef]
  );
  return {
    Component,
    ImgComponent,
    src,
    alt,
    icon,
    name,
    imgRef,
    slots,
    classNames,
    fallback,
    isImgLoaded,
    showFallback,
    ignoreFallback,
    getInitials,
    getAvatarProps,
    getImageProps
  };
}

export {
  useAvatar
};
