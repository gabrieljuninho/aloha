import { PropsWithChildren } from "@/common/types";

export type LayoutsPropsType = PropsWithChildren;

export interface IAuthLayoutProps extends PropsWithChildren {
  backButtonLabel: string;
  backButtonHref: string;
  type: "Sign in" | "Sign up";
  showSocial?: boolean;
}
