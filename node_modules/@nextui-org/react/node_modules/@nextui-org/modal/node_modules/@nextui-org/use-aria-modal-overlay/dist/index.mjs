// src/index.ts
import {
  ariaHideOutside,
  useOverlay,
  useOverlayFocusContain
} from "@react-aria/overlays";
import { mergeProps } from "@react-aria/utils";
import { useEffect } from "react";
function useAriaModalOverlay(props = {}, state, ref) {
  let { overlayProps, underlayProps } = useOverlay(
    {
      ...props,
      isOpen: state.isOpen,
      onClose: state.close
    },
    ref
  );
  useOverlayFocusContain();
  useEffect(() => {
    if (state.isOpen && ref.current) {
      return ariaHideOutside([ref.current]);
    }
  }, [state.isOpen, ref]);
  return {
    modalProps: mergeProps(overlayProps),
    underlayProps
  };
}
export {
  useAriaModalOverlay
};
