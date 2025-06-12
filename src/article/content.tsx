"use client";

import Box from "@mui/material/Box";
import { useRouter } from "next/navigation";
import { type PropsWithChildren, useEffect } from "react";
import styles from "#src/article/content.module.scss";

export default function Content({ children }: PropsWithChildren) {
  const router = useRouter();

  useEffect(() => {
    const controller = new AbortController();
    const handleClick = (event: Event): void => {
      if (!(event.currentTarget instanceof HTMLAnchorElement)) return;

      event.preventDefault();

      router.push(event.currentTarget.href);
    };

    for (const elem of document.querySelectorAll(
      `${styles.content} a:not(:has(.externalLink))`,
    )) {
      elem.addEventListener("click", handleClick);
    }

    return () => {
      controller.abort();
    };
  });

  return <Box className={styles.content}>{children}</Box>;
}
