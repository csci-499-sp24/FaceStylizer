"use client";
import {
  HiddenSelect
} from "./chunk-6D5IY2EM.mjs";
import {
  useSelect
} from "./chunk-RWOKMYW7.mjs";

// src/select.tsx
import { Listbox } from "@nextui-org/listbox";
import { FreeSoloPopover } from "@nextui-org/popover";
import { ChevronDownIcon } from "@nextui-org/shared-icons";
import { Spinner } from "@nextui-org/spinner";
import { forwardRef } from "@nextui-org/system";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import { cloneElement, useMemo } from "react";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import { AnimatePresence } from "framer-motion";
import { jsx, jsxs } from "react/jsx-runtime";
function Select(props, ref) {
  const {
    Component,
    state,
    label,
    hasHelper,
    isLoading,
    triggerRef,
    selectorIcon = /* @__PURE__ */ jsx(ChevronDownIcon, {}),
    description,
    errorMessage,
    startContent,
    endContent,
    placeholder,
    renderValue,
    shouldLabelBeOutside,
    disableAnimation,
    getBaseProps,
    getLabelProps,
    getTriggerProps,
    getValueProps,
    getListboxProps,
    getPopoverProps,
    getSpinnerProps,
    getMainWrapperProps,
    getInnerWrapperProps,
    getHiddenSelectProps,
    getHelperWrapperProps,
    getListboxWrapperProps,
    getDescriptionProps,
    getErrorMessageProps,
    getSelectorIconProps
  } = useSelect({ ...props, ref });
  const labelContent = label ? /* @__PURE__ */ jsx("label", { ...getLabelProps(), children: label }) : null;
  const clonedIcon = cloneElement(selectorIcon, getSelectorIconProps());
  const helperWrapper = useMemo(() => {
    if (!hasHelper)
      return null;
    return /* @__PURE__ */ jsx("div", { ...getHelperWrapperProps(), children: errorMessage ? /* @__PURE__ */ jsx("div", { ...getErrorMessageProps(), children: errorMessage }) : description ? /* @__PURE__ */ jsx("div", { ...getDescriptionProps(), children: description }) : null });
  }, [
    hasHelper,
    errorMessage,
    description,
    getHelperWrapperProps,
    getErrorMessageProps,
    getDescriptionProps
  ]);
  const renderSelectedItem = useMemo(() => {
    if (!state.selectedItems)
      return placeholder;
    if (renderValue && typeof renderValue === "function") {
      const mappedItems = [...state.selectedItems].map((item) => ({
        key: item.key,
        data: item.value,
        type: item.type,
        props: item.props,
        textValue: item.textValue,
        rendered: item.rendered,
        "aria-label": item["aria-label"]
      }));
      return renderValue(mappedItems);
    }
    return state.selectedItems.map((item) => item.textValue).join(", ");
  }, [state.selectedItems, renderValue, placeholder]);
  const renderIndicator = useMemo(() => {
    if (isLoading) {
      return /* @__PURE__ */ jsx(Spinner, { ...getSpinnerProps() });
    }
    return clonedIcon;
  }, [isLoading, clonedIcon, getSpinnerProps]);
  const popoverContent = useMemo(
    () => state.isOpen ? /* @__PURE__ */ jsx(FreeSoloPopover, { ...getPopoverProps(), state, triggerRef, children: /* @__PURE__ */ jsx(ScrollShadow, { ...getListboxWrapperProps(), children: /* @__PURE__ */ jsx(Listbox, { ...getListboxProps() }) }) }) : null,
    [state.isOpen, getPopoverProps, state, triggerRef, getListboxWrapperProps, getListboxProps]
  );
  return /* @__PURE__ */ jsxs("div", { ...getBaseProps(), children: [
    /* @__PURE__ */ jsx(HiddenSelect, { ...getHiddenSelectProps() }),
    shouldLabelBeOutside ? labelContent : null,
    /* @__PURE__ */ jsxs("div", { ...getMainWrapperProps(), children: [
      /* @__PURE__ */ jsxs(Component, { ...getTriggerProps(), children: [
        !shouldLabelBeOutside ? labelContent : null,
        /* @__PURE__ */ jsxs("div", { ...getInnerWrapperProps(), children: [
          startContent,
          /* @__PURE__ */ jsxs("span", { ...getValueProps(), children: [
            renderSelectedItem,
            state.selectedItems && /* @__PURE__ */ jsx(VisuallyHidden, { children: "," })
          ] }),
          endContent
        ] }),
        renderIndicator
      ] }),
      helperWrapper
    ] }),
    disableAnimation ? popoverContent : /* @__PURE__ */ jsx(AnimatePresence, { children: popoverContent })
  ] });
}
var select_default = forwardRef(Select);
Select.displayName = "NextUI.Select";

export {
  select_default
};
