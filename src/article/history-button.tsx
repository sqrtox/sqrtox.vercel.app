"use client";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HistoryIcon from "@mui/icons-material/History";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Divider from "@mui/material/Divider";
import MuiLink from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import { useEffect, useState } from "react";
import type { ArticleHistory } from "./history/history";
import ArticleHistoryList from "./history/history-list";

export interface ArticleHistoryButtonProps {
  slug: string;
  base: string;
  history: ArticleHistory;
}

export default function ArticleHistoryButton({
  slug,
  base,
  history,
}: ArticleHistoryButtonProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const historyHref = `${base ? `/${base}` : ""}/${slug}/history`;
  const details = (
    <AccordionDetails>
      <Stack padding={1} spacing={2} alignItems="flex-start">
        <MuiLink href={historyHref} display="inline-flex" alignItems="center">
          別ページで見る
          <ChevronRightIcon />
        </MuiLink>
        <Divider flexItem />
        <ArticleHistoryList history={history} />
      </Stack>
    </AccordionDetails>
  );

  return (
    <Accordion
      variant="outlined"
      component={mounted ? "div" : "a"}
      href={mounted ? undefined : historyHref}
    >
      <AccordionSummary
        expandIcon={mounted ? <ExpandMoreIcon /> : <ChevronRightIcon />}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <HistoryIcon />
          履歴
        </Stack>
      </AccordionSummary>
      {mounted && details}
    </Accordion>
  );
}
