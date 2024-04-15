import * as react from 'react';
import { ContextType } from './use-avatar-group.js';
import '@nextui-org/system';
import '@nextui-org/react-utils';
import './avatar.js';
import './use-avatar.js';
import 'tailwind-variants';
import '@nextui-org/theme';

declare const AvatarGroupProvider: react.Provider<ContextType>;
declare const useAvatarGroupContext: () => ContextType;

export { AvatarGroupProvider, useAvatarGroupContext };
