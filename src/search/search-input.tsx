"use client";

import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import { type Ref, useState } from "react";
import {
  type AutocompleteInput,
  type AutocompleteOption,
  useAutocomplete,
} from "#src/search/search";
import styles from "./search-input.module.scss";

export interface SearchInputProps {
  options: AutocompleteOption[];
  placeholder: string;
  small?: boolean;
}

export default function SearchInput(props: SearchInputProps) {
  const [input, setInput] = useState<AutocompleteInput>();
  const autocomplete = useAutocomplete({
    options: props.options,
  });

  return (
    <TextField
      variant="outlined"
      size="small"
      fullWidth
      inputRef={(elem) => {
        if (elem) {
          setInput(elem);
          autocomplete.ref(elem);
        }
      }}
      placeholder={props.placeholder}
      slotProps={{
        input: {
          className: styles.input,
          startAdornment: <SearchIcon fontSize="small" />,
        },
        htmlInput: {
          className: styles.htmlInput,
        },
      }}
    />
  );
}
