import * as react from 'react';
import { ReactNode } from 'react';
import * as _nextui_org_system from '@nextui-org/system';
import { PropGetter, HTMLNextUIProps } from '@nextui-org/system';
import { ReactRef } from '@nextui-org/react-utils';
import { AvatarProps } from './avatar.js';
import './use-avatar.js';
import 'tailwind-variants';
import '@nextui-org/theme';

interface Props extends HTMLNextUIProps<"div"> {
    /**
     * Ref to the DOM node.
     */
    ref?: ReactRef<HTMLDivElement | null>;
    /**
     * Whether the avatars should be displayed in a grid
     */
    isGrid?: boolean;
    /**
     * The maximum number of visible avatars
     * @default 5
     */
    max?: number;
    /**
     * Control the number of avatar not visible
     */
    total?: number;
    /**
     * This allows you to render a custom count component.
     */
    renderCount?: (count: number) => ReactNode;
}
type UseAvatarGroupProps = Props & Partial<Pick<AvatarProps, "size" | "color" | "radius" | "isDisabled" | "isBordered">>;
type ContextType = {
    size?: AvatarProps["size"];
    color?: AvatarProps["color"];
    radius?: AvatarProps["radius"];
    isGrid?: boolean;
    isBordered?: AvatarProps["isBordered"];
    isDisabled?: AvatarProps["isDisabled"];
};
declare function useAvatarGroup(props?: UseAvatarGroupProps): {
    Component: _nextui_org_system.As<any>;
    context: ContextType;
    remainingCount: number;
    clones: react.ReactElement<any, string | react.JSXElementConstructor<any>>[];
    renderCount: ((count: number) => ReactNode) | undefined;
    getAvatarGroupProps: PropGetter<Record<string, unknown>, _nextui_org_system.DOMAttributes<_nextui_org_system.DOMElement>>;
};
type UseAvatarReturn = ReturnType<typeof useAvatarGroup>;

export { ContextType, UseAvatarGroupProps, UseAvatarReturn, useAvatarGroup };
