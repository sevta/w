import classNames from "classnames";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
  className?: string;
  title?: string;
};

export default function LayoutAdmin({
  children,
  className,
  title = "Admin",
}: LayoutProps) {
  const { data: session, status }: any = useSession();

  const router = useRouter();

  if (status === "loading" && !session) return <div>loading...</div>;

  if (status === "unauthenticated") router.push("/login");

  if (status === "authenticated" && session?.user?.role !== "ADMIN")
    router.push("/");

  async function handleLogout(): Promise<any> {
    await signOut({ callbackUrl: "/login" });
  }

  console.log({ session });

  return (
    <div
      data-theme=""
      className={classNames(
        "w-full min-h-screen the-layout bg-base-200 text-base-content font-inter",
        className
      )}
    >
      <div className="rounded-lg shadow bg-base-200 drawer drawer-mobile h-screen">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="flex flex-col p-6 px-10 drawer-content">
          <label
            htmlFor="my-drawer-2"
            className="mb-4 btn btn-primary drawer-button lg:hidden"
          >
            open menu
          </label>
          <div>
            <div className="title">{title}</div>
            <main className="mt-5">{children}</main>
          </div>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 overflow-y-auto w-72 bg-base-100 text-base-content text-sm">
            <NavLink href="/admin">Home</NavLink>
            <NavLink href="/admin/template">Template</NavLink>
            <NavLink href="/admin/users">users</NavLink>
            <NavLink onClick={handleLogout}>Logout</NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
}

type NavLinkProps = {
  href?: string;
  children: ReactNode;
  onClick?: (x: any) => void;
};

function NavLink({ href, children, ...rest }: NavLinkProps) {
  return (
    <li className="capitalize" {...rest}>
      {href ? (
        <Link href={href} passHref>
          <a className="text-sm">{children}</a>
        </Link>
      ) : (
        <a className="text-sm">{children}</a>
      )}
    </li>
  );
}
