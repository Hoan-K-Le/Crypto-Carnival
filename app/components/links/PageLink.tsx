import React, { useRef, useEffect } from "react";
import Link from "next/link";

type PageLinkProps = {
  text?: string;
  href: string;
  id?: string;
  children?: React.ReactNode;
} & React.ComponentProps<"a">;

export default function PageLink({
  text,
  href,
  id,
  children,
  className,
}: PageLinkProps) {
  const linkRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    const focusLinkId =
      window.location.pathname === "/" ? "coinsLink" : "portfolioLink";
    if (linkRef.current) {
      if (linkRef.current.id === id && linkRef.current.id === focusLinkId) {
        linkRef.current.focus();
      }
    }
  }, [id]);

  return (
    <Link id={id} ref={linkRef} className={className} href={href}>
      {children}
      {text}
    </Link>
  );
}
