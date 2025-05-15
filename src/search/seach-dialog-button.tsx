"use client";

import SearchIcon from "@mui/icons-material/Search";
import Chip from "@mui/material/Chip";
import NextLink from "next/link";
import { useEffect, useState } from "react";
import SearchDialog from "./search-dialog";

export default function SearchDialogButton() {
  const [searchDialog, setSearchDialog] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return;

  return (
    <>
      <SearchDialog
        open={searchDialog}
        onClose={() => {
          setSearchDialog(false);
        }}
      />
      <Chip
        icon={<SearchIcon />}
        clickable
        label="検索"
        onClick={() => {
          setSearchDialog(true);
        }}
      />
    </>
  );
}
