import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import SearchInput from "./search-input";

export interface SearchDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function SearchDialog({ open, onClose }: SearchDialogProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Dialog
      fullWidth
      fullScreen={fullScreen}
      slotProps={{
        paper: {
          elevation: 1,
          sx: {
            maxHeight: "100%",
            height: fullScreen ? undefined : "500px",
          },
        },
      }}
      open={open}
      onClose={() => {
        onClose();
      }}
    >
      <DialogTitle>検索</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <TextField
            size="small"
            slotProps={{
              input: {
                startAdornment: (
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    paddingRight={1}
                  >
                    <SearchIcon />
                  </Stack>
                ),
              },
            }}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            onClose();
          }}
        >
          閉じる
        </Button>
      </DialogActions>
    </Dialog>
  );
}
