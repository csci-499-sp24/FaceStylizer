"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};

// src/index.ts
var src_exports = {};
__export(src_exports, {
  usePress: () => usePress
});
module.exports = __toCommonJS(src_exports);
var import_utils2 = require("@react-aria/utils");
var import_react2 = require("react");

// src/dom-helpers.ts
var getOwnerDocument = (el) => {
  var _a;
  return (_a = el == null ? void 0 : el.ownerDocument) != null ? _a : document;
};
var getOwnerWindow = (el) => {
  var _a, _b;
  return (_b = (_a = el == null ? void 0 : el.ownerDocument) == null ? void 0 : _a.defaultView) != null ? _b : window;
};

// src/text-selection.ts
var import_utils = require("@react-aria/utils");
var state = "default";
var savedUserSelect = "";
var modifiedElementMap = /* @__PURE__ */ new WeakMap();
function disableTextSelection(target) {
  if ((0, import_utils.isIOS)()) {
    if (state === "default") {
      const documentObject = getOwnerDocument(target);
      savedUserSelect = documentObject.documentElement.style.webkitUserSelect;
      documentObject.documentElement.style.webkitUserSelect = "none";
    }
    state = "disabled";
  } else if (target instanceof HTMLElement || target instanceof SVGElement) {
    modifiedElementMap.set(target, target.style.userSelect);
    target.style.userSelect = "none";
  }
}
function restoreTextSelection(target) {
  if ((0, import_utils.isIOS)()) {
    if (state !== "disabled") {
      return;
    }
    state = "restoring";
    setTimeout(() => {
      (0, import_utils.runAfterTransition)(() => {
        if (state === "restoring") {
          const documentObject = getOwnerDocument(target);
          if (documentObject.documentElement.style.webkitUserSelect === "none") {
            documentObject.documentElement.style.webkitUserSelect = savedUserSelect || "";
          }
          savedUserSelect = "";
          state = "default";
        }
      });
    }, 300);
  } else if (target instanceof HTMLElement || target instanceof SVGElement) {
    if (target && modifiedElementMap.has(target)) {
      let targetOldUserSelect = modifiedElementMap.get(target);
      if (target.style.userSelect === "none" && targetOldUserSelect) {
        target.style.userSelect = targetOldUserSelect;
      }
      if (target.getAttribute("style") === "") {
        target.removeAttribute("style");
      }
      modifiedElementMap.delete(target);
    }
  }
}

// src/events.ts
var _shouldStopPropagation;
var PressEvent = class {
  constructor(type, pointerType, originalEvent) {
    __publicField(this, "type");
    __publicField(this, "pointerType");
    __publicField(this, "target");
    __publicField(this, "shiftKey");
    __publicField(this, "ctrlKey");
    __publicField(this, "metaKey");
    __publicField(this, "altKey");
    __privateAdd(this, _shouldStopPropagation, true);
    this.type = type;
    this.pointerType = pointerType;
    this.target = originalEvent.currentTarget;
    this.shiftKey = originalEvent.shiftKey;
    this.metaKey = originalEvent.metaKey;
    this.ctrlKey = originalEvent.ctrlKey;
    this.altKey = originalEvent.altKey;
  }
  continuePropagation() {
    __privateSet(this, _shouldStopPropagation, false);
  }
  get shouldStopPropagation() {
    return __privateGet(this, _shouldStopPropagation);
  }
};
_shouldStopPropagation = new WeakMap();

// src/context.ts
var import_react = __toESM(require("react"));
var PressResponderContext = import_react.default.createContext(null);
PressResponderContext.displayName = "PressResponderContext";

// src/index.ts
function usePressResponderContext(props) {
  let context = (0, import_react2.useContext)(PressResponderContext);
  if (context) {
    let { register, ...contextProps } = context;
    props = (0, import_utils2.mergeProps)(contextProps, props);
    register();
  }
  (0, import_utils2.useSyncRef)(context, props.ref);
  return props;
}
var LINK_CLICKED = Symbol("linkClicked");
function usePress(props) {
  let {
    onPress,
    onPressChange,
    onPressStart,
    onPressEnd,
    onPressUp,
    isDisabled,
    isPressed: isPressedProp,
    preventFocusOnPress,
    shouldCancelOnPointerExit,
    allowTextSelectionOnPress,
    ref: _,
    ...domProps
  } = usePressResponderContext(props);
  let [isPressed, setPressed] = (0, import_react2.useState)(false);
  let ref = (0, import_react2.useRef)({
    isPressed: false,
    ignoreEmulatedMouseEvents: false,
    ignoreClickAfterPress: false,
    didFirePressStart: false,
    isTriggeringEvent: false,
    activePointerId: null,
    target: null,
    isOverTarget: false,
    pointerType: null
  });
  let { addGlobalListener, removeAllGlobalListeners } = (0, import_utils2.useGlobalListeners)();
  let triggerPressStart = (0, import_utils2.useEffectEvent)((originalEvent, pointerType) => {
    let state2 = ref.current;
    if (isDisabled || state2.didFirePressStart) {
      return;
    }
    let shouldStopPropagation = true;
    state2.isTriggeringEvent = true;
    if (onPressStart) {
      let event = new PressEvent("pressstart", pointerType, originalEvent);
      onPressStart(event);
      shouldStopPropagation = event.shouldStopPropagation;
    }
    if (onPressChange) {
      onPressChange(true);
    }
    state2.isTriggeringEvent = false;
    state2.didFirePressStart = true;
    setPressed(true);
    return shouldStopPropagation;
  });
  let triggerPressEnd = (0, import_utils2.useEffectEvent)(
    (originalEvent, pointerType, wasPressed = true) => {
      let state2 = ref.current;
      if (!state2.didFirePressStart) {
        return;
      }
      state2.ignoreClickAfterPress = true;
      state2.didFirePressStart = false;
      state2.isTriggeringEvent = true;
      let shouldStopPropagation = true;
      if (onPressEnd) {
        let event = new PressEvent("pressend", pointerType, originalEvent);
        onPressEnd(event);
        shouldStopPropagation = event.shouldStopPropagation;
      }
      if (onPressChange) {
        onPressChange(false);
      }
      setPressed(false);
      if (onPress && wasPressed && !isDisabled) {
        let event = new PressEvent("press", pointerType, originalEvent);
        onPress(event);
        shouldStopPropagation && (shouldStopPropagation = event.shouldStopPropagation);
      }
      state2.isTriggeringEvent = false;
      return shouldStopPropagation;
    }
  );
  let triggerPressUp = (0, import_utils2.useEffectEvent)((originalEvent, pointerType) => {
    let state2 = ref.current;
    if (isDisabled) {
      return;
    }
    if (onPressUp) {
      state2.isTriggeringEvent = true;
      let event = new PressEvent("pressup", pointerType, originalEvent);
      onPressUp(event);
      state2.isTriggeringEvent = false;
      return event.shouldStopPropagation;
    }
    return true;
  });
  let cancel = (0, import_utils2.useEffectEvent)((e) => {
    let state2 = ref.current;
    if (state2.isPressed) {
      if (state2.isOverTarget && state2.target) {
        triggerPressEnd(createEvent(state2.target, e), state2.pointerType, false);
      }
      state2.isPressed = false;
      state2.isOverTarget = false;
      state2.activePointerId = null;
      state2.pointerType = null;
      removeAllGlobalListeners();
      if (!allowTextSelectionOnPress && state2.target) {
        restoreTextSelection(state2.target);
      }
    }
  });
  let cancelOnPointerExit = (0, import_utils2.useEffectEvent)((e) => {
    if (shouldCancelOnPointerExit) {
      cancel(e);
    }
  });
  let pressProps = (0, import_react2.useMemo)(() => {
    let state2 = ref.current;
    let pressProps2 = {
      onKeyDown(e) {
        var _a;
        if (isValidKeyboardEvent(e.nativeEvent, e.currentTarget) && e.currentTarget.contains(e.target)) {
          if (shouldPreventDefaultKeyboard(e.target, e.key)) {
            e.preventDefault();
          }
          let shouldStopPropagation = true;
          if (!state2.isPressed && !e.repeat) {
            state2.target = e.currentTarget;
            state2.isPressed = true;
            shouldStopPropagation = triggerPressStart(e, "keyboard");
            addGlobalListener(getOwnerDocument(e.currentTarget), "keyup", onKeyUp, false);
          }
          if (shouldStopPropagation) {
            e.stopPropagation();
          }
          if (e.metaKey && (0, import_utils2.isMac)()) {
            (_a = state2.metaKeyEvents) == null ? void 0 : _a.set(e.key, e.nativeEvent);
          }
        } else if (e.key === "Meta") {
          state2.metaKeyEvents = /* @__PURE__ */ new Map();
        }
      },
      onKeyUp(e) {
        if (state2.target && isValidKeyboardEvent(e.nativeEvent, e.currentTarget) && !e.repeat && e.currentTarget.contains(e.target)) {
          triggerPressUp(createEvent(state2.target, e), "keyboard");
        }
      },
      onClick(e) {
        if (e && !e.currentTarget.contains(e.target)) {
          return;
        }
        if (e && e.button === 0 && !state2.isTriggeringEvent && !import_utils2.openLink.isOpening) {
          let shouldStopPropagation = true;
          if (isDisabled) {
            e.preventDefault();
          }
          if (!state2.ignoreClickAfterPress && !state2.ignoreEmulatedMouseEvents && !state2.isPressed && (state2.pointerType === "virtual" || (0, import_utils2.isVirtualClick)(e.nativeEvent))) {
            if (!isDisabled && !preventFocusOnPress) {
              (0, import_utils2.focusWithoutScrolling)(e.currentTarget);
            }
            let stopPressStart = triggerPressStart(e, "virtual");
            let stopPressUp = triggerPressUp(e, "virtual");
            let stopPressEnd = triggerPressEnd(e, "virtual");
            shouldStopPropagation = stopPressStart && stopPressUp && stopPressEnd;
          }
          state2.ignoreEmulatedMouseEvents = false;
          state2.ignoreClickAfterPress = false;
          if (shouldStopPropagation) {
            e.stopPropagation();
          }
        }
      }
    };
    let onKeyUp = (e) => {
      var _a, _b;
      if (state2.isPressed && state2.target && isValidKeyboardEvent(e, state2.target)) {
        if (shouldPreventDefaultKeyboard(e.target, e.key)) {
          e.preventDefault();
        }
        let target = e.target;
        let shouldStopPropagation = triggerPressEnd(
          createEvent(state2.target, e),
          "keyboard",
          state2.target.contains(target)
        );
        removeAllGlobalListeners();
        if (shouldStopPropagation) {
          e.stopPropagation();
        }
        if (e.key !== "Enter" && isHTMLAnchorLink(state2.target) && state2.target.contains(target) && !e[LINK_CLICKED]) {
          e[LINK_CLICKED] = true;
          (0, import_utils2.openLink)(state2.target, e, false);
        }
        state2.isPressed = false;
        (_a = state2.metaKeyEvents) == null ? void 0 : _a.delete(e.key);
      } else if (e.key === "Meta" && ((_b = state2.metaKeyEvents) == null ? void 0 : _b.size)) {
        let events = state2.metaKeyEvents;
        state2.metaKeyEvents = null;
        for (let event of events.values()) {
          state2.target && state2.target.dispatchEvent(new KeyboardEvent("keyup", event));
        }
      }
    };
    if (typeof PointerEvent !== "undefined") {
      pressProps2.onPointerDown = (e) => {
        if (e.button !== 0 || !e.currentTarget.contains(e.target)) {
          return;
        }
        if ((0, import_utils2.isVirtualPointerEvent)(e.nativeEvent)) {
          state2.pointerType = "virtual";
          return;
        }
        if (shouldPreventDefault(e.currentTarget)) {
          e.preventDefault();
        }
        state2.pointerType = e.pointerType;
        let shouldStopPropagation = true;
        if (!state2.isPressed) {
          state2.isPressed = true;
          state2.isOverTarget = true;
          state2.activePointerId = e.pointerId;
          state2.target = e.currentTarget;
          if (!isDisabled && !preventFocusOnPress) {
            (0, import_utils2.focusWithoutScrolling)(e.currentTarget);
          }
          if (!allowTextSelectionOnPress) {
            disableTextSelection(state2.target);
          }
          shouldStopPropagation = triggerPressStart(e, state2.pointerType);
          addGlobalListener(getOwnerDocument(e.currentTarget), "pointermove", onPointerMove, false);
          addGlobalListener(getOwnerDocument(e.currentTarget), "pointerup", onPointerUp, false);
          addGlobalListener(
            getOwnerDocument(e.currentTarget),
            "pointercancel",
            onPointerCancel,
            false
          );
        }
        if (shouldStopPropagation) {
          e.stopPropagation();
        }
      };
      pressProps2.onMouseDown = (e) => {
        if (!e.currentTarget.contains(e.target)) {
          return;
        }
        if (e.button === 0) {
          if (shouldPreventDefault(e.currentTarget)) {
            e.preventDefault();
          }
          e.stopPropagation();
        }
      };
      pressProps2.onPointerUp = (e) => {
        if (!e.currentTarget.contains(e.target) || state2.pointerType === "virtual") {
          return;
        }
        if (e.button === 0 && isOverTarget(e, e.currentTarget)) {
          triggerPressUp(e, state2.pointerType || e.pointerType);
        }
      };
      let onPointerMove = (e) => {
        if (e.pointerId !== state2.activePointerId || !state2.target) {
          return;
        }
        if (isOverTarget(e, state2.target)) {
          if (!state2.isOverTarget) {
            state2.isOverTarget = true;
            triggerPressStart(createEvent(state2.target, e), state2.pointerType);
          }
        } else if (state2.isOverTarget) {
          state2.isOverTarget = false;
          triggerPressEnd(createEvent(state2.target, e), state2.pointerType, false);
          cancelOnPointerExit(e);
        }
      };
      let onPointerUp = (e) => {
        if (e.pointerId === state2.activePointerId && state2.isPressed && e.button === 0 && state2.target) {
          if (isOverTarget(e, state2.target)) {
            triggerPressEnd(createEvent(state2.target, e), state2.pointerType);
          } else if (state2.isOverTarget) {
            triggerPressEnd(createEvent(state2.target, e), state2.pointerType);
          }
          state2.isPressed = false;
          state2.isOverTarget = false;
          state2.activePointerId = null;
          state2.pointerType = null;
          removeAllGlobalListeners();
          if (!allowTextSelectionOnPress) {
            restoreTextSelection(state2.target);
          }
        }
      };
      let onPointerCancel = (e) => {
        cancel(e);
      };
      pressProps2.onDragStart = (e) => {
        if (!e.currentTarget.contains(e.target)) {
          return;
        }
        cancel(e);
      };
    } else {
      pressProps2.onMouseDown = (e) => {
        if (e.button !== 0 || !e.currentTarget.contains(e.target)) {
          return;
        }
        if (shouldPreventDefault(e.currentTarget)) {
          e.preventDefault();
        }
        if (state2.ignoreEmulatedMouseEvents) {
          e.stopPropagation();
          return;
        }
        state2.isPressed = true;
        state2.isOverTarget = true;
        state2.target = e.currentTarget;
        state2.pointerType = (0, import_utils2.isVirtualClick)(e.nativeEvent) ? "virtual" : "mouse";
        if (!isDisabled && !preventFocusOnPress) {
          (0, import_utils2.focusWithoutScrolling)(e.currentTarget);
        }
        let shouldStopPropagation = triggerPressStart(e, state2.pointerType);
        if (shouldStopPropagation) {
          e.stopPropagation();
        }
        addGlobalListener(getOwnerDocument(e.currentTarget), "mouseup", onMouseUp, false);
      };
      pressProps2.onMouseEnter = (e) => {
        if (!e.currentTarget.contains(e.target)) {
          return;
        }
        let shouldStopPropagation = true;
        if (state2.isPressed && !state2.ignoreEmulatedMouseEvents) {
          state2.isOverTarget = true;
          shouldStopPropagation = triggerPressStart(e, state2.pointerType);
        }
        if (shouldStopPropagation) {
          e.stopPropagation();
        }
      };
      pressProps2.onMouseLeave = (e) => {
        if (!e.currentTarget.contains(e.target)) {
          return;
        }
        let shouldStopPropagation = true;
        if (state2.isPressed && !state2.ignoreEmulatedMouseEvents) {
          state2.isOverTarget = false;
          shouldStopPropagation = triggerPressEnd(e, state2.pointerType, false);
          cancelOnPointerExit(e);
        }
        if (shouldStopPropagation) {
          e.stopPropagation();
        }
      };
      pressProps2.onMouseUp = (e) => {
        if (!e.currentTarget.contains(e.target)) {
          return;
        }
        if (!state2.ignoreEmulatedMouseEvents && e.button === 0) {
          triggerPressUp(e, state2.pointerType || "mouse");
        }
      };
      let onMouseUp = (e) => {
        if (e.button !== 0) {
          return;
        }
        state2.isPressed = false;
        removeAllGlobalListeners();
        if (state2.ignoreEmulatedMouseEvents) {
          state2.ignoreEmulatedMouseEvents = false;
          return;
        }
        if (!state2.target) {
          return;
        }
        if (isOverTarget(e, state2.target)) {
          triggerPressEnd(createEvent(state2.target, e), state2.pointerType);
        } else if (state2.isOverTarget) {
          triggerPressEnd(createEvent(state2.target, e), state2.pointerType, false);
        }
        state2.isOverTarget = false;
      };
      pressProps2.onTouchStart = (e) => {
        if (!e.currentTarget.contains(e.target)) {
          return;
        }
        let touch = getTouchFromEvent(e.nativeEvent);
        if (!touch) {
          return;
        }
        state2.activePointerId = touch.identifier;
        state2.ignoreEmulatedMouseEvents = true;
        state2.isOverTarget = true;
        state2.isPressed = true;
        state2.target = e.currentTarget;
        state2.pointerType = "touch";
        if (!isDisabled && !preventFocusOnPress) {
          (0, import_utils2.focusWithoutScrolling)(e.currentTarget);
        }
        if (!allowTextSelectionOnPress) {
          disableTextSelection(state2.target);
        }
        let shouldStopPropagation = triggerPressStart(e, state2.pointerType);
        if (shouldStopPropagation) {
          e.stopPropagation();
        }
        addGlobalListener(getOwnerWindow(e.currentTarget), "scroll", onScroll, true);
      };
      pressProps2.onTouchMove = (e) => {
        if (!e.currentTarget.contains(e.target)) {
          return;
        }
        if (!state2.isPressed) {
          e.stopPropagation();
          return;
        }
        let touch = getTouchById(e.nativeEvent, state2.activePointerId);
        let shouldStopPropagation = true;
        if (touch && isOverTarget(touch, e.currentTarget)) {
          if (!state2.isOverTarget) {
            state2.isOverTarget = true;
            shouldStopPropagation = triggerPressStart(e, state2.pointerType);
          }
        } else if (state2.isOverTarget) {
          state2.isOverTarget = false;
          shouldStopPropagation = triggerPressEnd(e, state2.pointerType, false);
          cancelOnPointerExit(e);
        }
        if (shouldStopPropagation) {
          e.stopPropagation();
        }
      };
      pressProps2.onTouchEnd = (e) => {
        if (!e.currentTarget.contains(e.target)) {
          return;
        }
        if (!state2.isPressed) {
          e.stopPropagation();
          return;
        }
        let touch = getTouchById(e.nativeEvent, state2.activePointerId);
        let shouldStopPropagation = true;
        if (touch && isOverTarget(touch, e.currentTarget)) {
          triggerPressUp(e, state2.pointerType);
          shouldStopPropagation = triggerPressEnd(e, state2.pointerType);
        } else if (state2.isOverTarget) {
          shouldStopPropagation = triggerPressEnd(e, state2.pointerType, false);
        }
        if (shouldStopPropagation) {
          e.stopPropagation();
        }
        state2.isPressed = false;
        state2.activePointerId = null;
        state2.isOverTarget = false;
        state2.ignoreEmulatedMouseEvents = true;
        if (!allowTextSelectionOnPress && state2.target) {
          restoreTextSelection(state2.target);
        }
        removeAllGlobalListeners();
      };
      pressProps2.onTouchCancel = (e) => {
        if (!e.currentTarget.contains(e.target)) {
          return;
        }
        e.stopPropagation();
        if (state2.isPressed) {
          cancel(e);
        }
      };
      let onScroll = (e) => {
        if (state2.isPressed && e.target.contains(state2.target)) {
          cancel({
            currentTarget: state2.target,
            shiftKey: false,
            ctrlKey: false,
            metaKey: false,
            altKey: false
          });
        }
      };
      pressProps2.onDragStart = (e) => {
        if (!e.currentTarget.contains(e.target)) {
          return;
        }
        cancel(e);
      };
    }
    return pressProps2;
  }, [
    addGlobalListener,
    isDisabled,
    preventFocusOnPress,
    removeAllGlobalListeners,
    allowTextSelectionOnPress,
    cancel,
    cancelOnPointerExit,
    triggerPressEnd,
    triggerPressStart,
    triggerPressUp
  ]);
  (0, import_react2.useEffect)(() => {
    return () => {
      if (!allowTextSelectionOnPress && ref.current.target) {
        restoreTextSelection(ref.current.target);
      }
    };
  }, [allowTextSelectionOnPress]);
  return {
    isPressed: isPressedProp || isPressed,
    pressProps: (0, import_utils2.mergeProps)(domProps, pressProps)
  };
}
function isHTMLAnchorLink(target) {
  return target.tagName === "A" && target.hasAttribute("href");
}
function isValidKeyboardEvent(event, currentTarget) {
  const { key, code } = event;
  const element = currentTarget;
  const role = element.getAttribute("role");
  return (key === "Enter" || key === " " || key === "Spacebar" || code === "Space") && !(element instanceof getOwnerWindow(element).HTMLInputElement && !isValidInputKey(element, key) || element instanceof getOwnerWindow(element).HTMLTextAreaElement || element.isContentEditable) && !((role === "link" || !role && isHTMLAnchorLink(element)) && key !== "Enter");
}
function getTouchFromEvent(event) {
  const { targetTouches } = event;
  if (targetTouches.length > 0) {
    return targetTouches[0];
  }
  return null;
}
function getTouchById(event, pointerId) {
  const changedTouches = event.changedTouches;
  for (let i = 0; i < changedTouches.length; i++) {
    const touch = changedTouches[i];
    if (touch.identifier === pointerId) {
      return touch;
    }
  }
  return null;
}
function createEvent(target, e) {
  return {
    currentTarget: target,
    shiftKey: e.shiftKey,
    ctrlKey: e.ctrlKey,
    metaKey: e.metaKey,
    altKey: e.altKey
  };
}
function getPointClientRect(point) {
  let offsetX = !!point.width ? point.width / 2 : point.radiusX || 0;
  let offsetY = !!point.height ? point.height / 2 : point.radiusY || 0;
  return {
    top: point.clientY - offsetY,
    right: point.clientX + offsetX,
    bottom: point.clientY + offsetY,
    left: point.clientX - offsetX
  };
}
function areRectanglesOverlapping(a, b) {
  if (a.left > b.right || b.left > a.right) {
    return false;
  }
  if (a.top > b.bottom || b.top > a.bottom) {
    return false;
  }
  return true;
}
function isOverTarget(point, target) {
  let rect = target.getBoundingClientRect();
  let pointRect = getPointClientRect(point);
  return areRectanglesOverlapping(rect, pointRect);
}
function shouldPreventDefault(target) {
  return !(target instanceof HTMLElement) || !target.hasAttribute("draggable");
}
function shouldPreventDefaultKeyboard(target, key) {
  if (target instanceof HTMLInputElement) {
    return !isValidInputKey(target, key);
  }
  if (target instanceof HTMLButtonElement) {
    return target.type !== "submit" && target.type !== "reset";
  }
  if (isHTMLAnchorLink(target)) {
    return false;
  }
  return true;
}
var nonTextInputTypes = /* @__PURE__ */ new Set([
  "checkbox",
  "radio",
  "range",
  "color",
  "file",
  "image",
  "button",
  "submit",
  "reset"
]);
function isValidInputKey(target, key) {
  return target.type === "checkbox" || target.type === "radio" ? key === " " : nonTextInputTypes.has(target.type);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  usePress
});
