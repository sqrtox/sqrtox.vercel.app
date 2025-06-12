"use client";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import styles from "#src/article/content.module.scss";
import type { CompileResult } from "./markdown";

export interface Note {
  file: string;
  result: CompileResult;
}

export interface NotesProps {
  notes: Note[];
}

export default function Notes({ notes }: NotesProps) {
  const [note, setNote] = useState<Note>();
  const i = note ? notes.indexOf(note) : -1;

  return (
    <>
      {note && (
        <Modal open onClose={() => setNote(undefined)} sx={{ zIndex: 9999 }}>
          <Paper
            sx={{
              flex: 1,
              height: "100%",
              maxHeight: "80%",
              spacing: 5,
              maxWidth: "90%",
              width: 400,
              position: "fixed",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <Stack spacing={1} height="100%">
              <Box
                className={styles.content}
                padding={3}
                flex={1}
                height="100%"
              >
                {note.result.element}
              </Box>
              {notes.length >= 2 && (
                <Stack
                  width="100%"
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  spacing={2}
                  padding={2}
                >
                  <IconButton
                    size="large"
                    disabled={i === 0}
                    onClick={() => setNote(notes[i - 1])}
                  >
                    <ChevronLeftIcon fontSize="large" />
                  </IconButton>
                  <Typography color="textSecondary">
                    {i + 1} / {notes.length}
                  </Typography>
                  <IconButton
                    size="large"
                    disabled={i >= notes.length - 1}
                    onClick={() => setNote(notes[i + 1])}
                  >
                    <ChevronRightIcon fontSize="large" />
                  </IconButton>
                </Stack>
              )}
            </Stack>
          </Paper>
        </Modal>
      )}
      <Stack
        direction="row"
        spacing={3}
        width="100%"
        overflow="auto"
        paddingY={3}
      >
        {notes.length <= 0 && <Typography>メモはまだありません……</Typography>}
        {/* TODO: notes sort */}
        {notes.map((note) => (
          <Card key={note.file} sx={{ flexShrink: 0, boxShadow: "none" }}>
            <CardActionArea disableRipple onClick={() => setNote(note)}>
              <Box width={250} height={250} padding={3}>
                <Typography
                  maxWidth="100%"
                  maxHeight="100%"
                  overflow="hidden"
                  textOverflow="ellipsis"
                  sx={{
                    display: "-webkit-box",
                    lineClamp: 8,
                    boxOrient: "vertical",
                    MozBoxOrient: "vertical",
                    WebkitLineClamp: 8,
                  }}
                >
                  {note.result.text}
                </Typography>
              </Box>
            </CardActionArea>
          </Card>
        ))}
      </Stack>
    </>
  );
}
