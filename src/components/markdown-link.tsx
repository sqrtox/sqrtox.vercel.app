import { type AnchorHTMLAttributes } from "react";
import { isExternalLink } from "@/utils/link";

export default function MarkdownLink({ href = "/", children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const externalLink = isExternalLink(href);

  return (
    <a
      {...props}
      href={href}
      target={externalLink ? "_blank" : undefined}
      rel={externalLink ? "noopener noreferrer" : undefined}
      style={{
        color: "var(--mui-palette-primary-main)"
      }}
    >
      {children}
      {externalLink && <span className="icon-open-in-new" />}
    </a>
  );
}
