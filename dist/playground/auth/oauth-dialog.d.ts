import type { OpenAPIV3_1 } from 'openapi-types';
import { type ReactNode } from 'react';
export interface AuthDialogProps {
    scheme: OpenAPIV3_1.OAuth2SecurityScheme;
    scopes: string[];
    open: boolean;
    setOpen: (v: boolean) => void;
    setToken: (token: string) => void;
    children: ReactNode;
}
export declare function OauthDialog({ scheme, scopes, setToken, children, open, setOpen, }: AuthDialogProps): import("react/jsx-runtime").JSX.Element;
export declare const OauthDialogTrigger: import("react").ForwardRefExoticComponent<import("@radix-ui/react-dialog").DialogTriggerProps & import("react").RefAttributes<HTMLButtonElement>>;
//# sourceMappingURL=oauth-dialog.d.ts.map