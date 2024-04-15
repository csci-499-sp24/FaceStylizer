// src/use-badge.ts
import { badge } from "@nextui-org/theme";
import { mapPropsVariants } from "@nextui-org/system-rsc";
import { clsx } from "@nextui-org/shared-utils";
import { useMemo } from "react";
function useBadge(originalProps) {
  const [props, variantProps] = mapPropsVariants(originalProps, badge.variantKeys);
  const { as, children, className, content, classNames, ...otherProps } = props;
  const Component = as || "span";
  const isOneChar = useMemo(
    () => {
      var _a;
      return ((_a = String(content)) == null ? void 0 : _a.length) === 1 || (originalProps == null ? void 0 : originalProps.isOneChar);
    },
    [content, originalProps == null ? void 0 : originalProps.isOneChar]
  );
  const isDot = useMemo(() => {
    var _a;
    return ((_a = String(content)) == null ? void 0 : _a.length) === 0;
  }, [content]);
  const baseStyles = clsx(classNames == null ? void 0 : classNames.badge, className);
  const slots = useMemo(
    () => badge({
      ...variantProps,
      showOutline: !!(originalProps == null ? void 0 : originalProps.disableOutline) ? !(originalProps == null ? void 0 : originalProps.disableOutline) : originalProps == null ? void 0 : originalProps.showOutline,
      isOneChar,
      isDot
    }),
    [...Object.values(variantProps), isOneChar, isDot]
  );
  const getBadgeProps = () => {
    return {
      className: slots.badge({ class: baseStyles }),
      "data-invisible": originalProps.isInvisible,
      ...otherProps
    };
  };
  return {
    Component,
    children,
    content,
    slots,
    classNames,
    disableAnimation: originalProps == null ? void 0 : originalProps.disableAnimation,
    isInvisible: originalProps == null ? void 0 : originalProps.isInvisible,
    getBadgeProps
  };
}

export {
  useBadge
};
