"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export function ConditionalNavbar() {
  const pathname = usePathname();
  const isIframe = pathname.startsWith("/iframe");

  if (isIframe) {
    return null;
  }

  return <Navbar />;
}
