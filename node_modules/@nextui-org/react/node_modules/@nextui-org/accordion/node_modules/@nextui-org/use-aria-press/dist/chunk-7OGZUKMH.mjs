import {
  __privateAdd,
  __privateGet,
  __privateSet,
  __publicField
} from "./chunk-7D66DBGQ.mjs";

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

export {
  PressEvent
};
