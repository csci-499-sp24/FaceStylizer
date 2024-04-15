import * as _nextui_org_system_rsc from '@nextui-org/system-rsc';
import { ReactNode } from 'react';
import { UseBadgeProps } from './use-badge.js';
import 'tailwind-variants';
import '@nextui-org/theme';
import '@nextui-org/react-utils';

interface BadgeProps extends UseBadgeProps {
    children: ReactNode;
}
declare const Badge: _nextui_org_system_rsc.InternalForwardRefRenderFunction<"span", BadgeProps, never>;

export { BadgeProps, Badge as default };
