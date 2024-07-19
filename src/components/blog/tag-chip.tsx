import TagIcon from "@mui/icons-material/Tag";
import Chip from "@mui/material/Chip";
import Tooltip from "@mui/material/Tooltip";
import Link from "next/link";

import type { Tag } from "@/utils/blog";

export type TagChipProps = {
  tag: Tag;
};

export default function TagChip({ tag }: TagChipProps) {
  return (
    <Link href={`/tag/${encodeURIComponent(tag.id)}`}>
      <Tooltip title={`${tag.displayName}の記事一覧へ`}>
        <Chip
          size="small"
          clickable
          icon={<TagIcon />}
          label={tag.displayName}
        />
      </Tooltip>
    </Link>
  );
}
