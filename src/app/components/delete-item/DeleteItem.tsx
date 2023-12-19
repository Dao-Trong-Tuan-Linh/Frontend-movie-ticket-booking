import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Stack } from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface DeleteItemProps {
  id:string,
  open: boolean;
  onClose: () => void;
  onSubmit: (id: string) => void;
}
export default function DeleteItem({
  id,
  open,
  onClose,
  onSubmit,
}: DeleteItemProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          textAlign={"center"}
        >
          {`Bạn có muốn xóa ${id} này không ?`}
        </Typography>

        <Stack direction={"row"} justifyContent={"center"}>
          <Button onClick={onClose} color="warning">
            Hủy
          </Button>
          <Button
            onClick={() => {
              onSubmit(id)
              onClose()
            }}
            color="error"
          >
            Xóa
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}
