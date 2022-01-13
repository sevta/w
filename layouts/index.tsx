import classNames from "classnames";
import { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
  className?: string;
};

export default function Layout({ children, className }: LayoutProps) {
  return (
    <div
      className={classNames(
        "w-full min-h-screen the-layout font-inter p-10",
        className
      )}
    >
      {children}
    </div>
  );
}
