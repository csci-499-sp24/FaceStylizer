import * as _nextui_org_system from '@nextui-org/system';
import * as react from 'react';
import { UsePopoverProps } from './use-popover.js';
import '@nextui-org/theme';
import 'framer-motion';
import '@nextui-org/react-utils';
import '@react-stately/overlays';
import '@react-types/overlays';
import './use-aria-popover.js';
import '@react-aria/overlays';
import '@nextui-org/aria-utils';

interface FreeSoloPopoverProps extends UsePopoverProps {
    children: react.ReactNode;
}
declare const FreeSoloPopover: _nextui_org_system.InternalForwardRefRenderFunction<"div", FreeSoloPopoverProps, never>;

export { FreeSoloPopoverProps, FreeSoloPopover as default };
