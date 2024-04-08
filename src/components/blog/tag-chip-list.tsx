import Stack from "@mui/material/Stack";

import TagChip from "@/components/blog/tag-chip";

import type { Tag } from "@/utils/blog";

export type TagChipListProps = {
  tags: Tag[]
};

export default function TagChipList({ tags }: TagChipListProps) {
  return (
    <Stack flexWrap="wrap" direction="row" spacing={1}>
      {tags.map(tag => (
        <TagChip
          key={tag.id}
          tag={tag}
        />
      ))}
    </Stack>
  );
}
