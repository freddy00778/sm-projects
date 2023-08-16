import * as ReactRouterDom from "react-router-dom";
import { ChangeEvent } from "react";
declare module "react-router-dom" {
  export interface NavLinkProps
    extends Omit<ReactRouterDom.NavLinkProps, "activeClassName" | "exact"> {
    activeClassName?: string;
    exact?: boolean;
    isActive?:
      | string
      | boolean
      | ((event: ChangeEvent<HTMLInputElement>) => void);
  }
}
