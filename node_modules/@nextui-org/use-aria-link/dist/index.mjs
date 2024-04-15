// src/index.ts
import { filterDOMProps, mergeProps, useRouter, shouldClientNavigate } from "@react-aria/utils";
import { useFocusable } from "@react-aria/focus";
import { usePress } from "@nextui-org/use-aria-press";
function useAriaLink(props, ref) {
  let {
    elementType = "a",
    onPress,
    onPressStart,
    onPressEnd,
    onClick: deprecatedOnClick,
    isDisabled,
    ...otherProps
  } = props;
  let linkProps = {};
  if (elementType !== "a") {
    linkProps = {
      role: "link",
      tabIndex: !isDisabled ? 0 : void 0
    };
  }
  let { focusableProps } = useFocusable(props, ref);
  let { pressProps, isPressed } = usePress({ onPress, onPressStart, onPressEnd, isDisabled, ref });
  let domProps = filterDOMProps(otherProps, { labelable: true, isLink: elementType === "a" });
  let interactionHandlers = mergeProps(focusableProps, pressProps);
  let router = useRouter();
  return {
    isPressed,
    linkProps: mergeProps(domProps, {
      ...interactionHandlers,
      ...linkProps,
      "aria-disabled": isDisabled || void 0,
      "aria-current": props["aria-current"],
      onClick: (e) => {
        var _a;
        (_a = pressProps.onClick) == null ? void 0 : _a.call(pressProps, e);
        if (deprecatedOnClick) {
          deprecatedOnClick(e);
        }
        if (!router.isNative && e.currentTarget instanceof HTMLAnchorElement && e.currentTarget.href && !e.isDefaultPrevented() && shouldClientNavigate(e.currentTarget, e)) {
          e.preventDefault();
          router.open(e.currentTarget, e);
        }
      }
    })
  };
}
export {
  useAriaLink
};
