"use client";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ReplayIcon from "@mui/icons-material/Replay";
import { styled } from "@mui/material";

import Time from "@/components/elements/time";

const TimeContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  gap: "1rem",
  [theme.breakpoints.down("sm")]: {
    gap: 0,
    flexDirection: "column"
  }
}));

export type BlogTimeProps = {
  label?: boolean,
  publishedTimestamp: number,
  modifiedTimestamp?: number,
  timezone?: string
};

export default function BlogTime({
  label = false,
  publishedTimestamp,
  modifiedTimestamp,
  timezone
}: BlogTimeProps) {
  return (
    <TimeContainer>
      <Time
        icon={<AccessTimeIcon fontSize="small" />}
        label={label ? "公開" : undefined}
        timestamp={publishedTimestamp}
        timezone={timezone}
      />
      {modifiedTimestamp !== undefined && (
        <Time
          icon={<ReplayIcon fontSize="small" />}
          label={label ? "最終更新" : undefined}
          timestamp={modifiedTimestamp}
          timezone={timezone}
        />
      )}
    </TimeContainer>
  );
}
