"use client";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Stack } from "@mui/material";
import { useAppSelector } from "@/app/redux/store";

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
  open: boolean;
  onClose: () => void;
  onSubmit: (id: string) => void;
}
export default function DeleteItem({
  open,
  onClose,
  onSubmit,
}: DeleteItemProps) {
  const [id, setId] = useState("");

  const resultCategory = useAppSelector((state) => state.category);
  const { dataCategory } = resultCategory;
  const { detailCategory } = dataCategory;

  const resultFilm = useAppSelector((state) => state.film)
  const {dataFilm} = resultFilm
  const {detailFilm} = dataFilm

  useEffect(() => {
    if (detailCategory._id) {
      setId(detailCategory._id);
    }
  }, [detailCategory]);

  useEffect(() => {
    if (detailFilm._id) {
      setId(detailFilm._id);
    }
  }, [detailFilm]);

  useEffect(() => {
    if(!open) {
      setId("")
    }
  },[open])

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
          Xóa {`${detailCategory.name || detailFilm.name}`} ?
        </Typography>

        <Stack direction={"row"} justifyContent={"center"}>
          <Button onClick={onClose} color="warning">
            Hủy
          </Button>
          <Button
            onClick={() => {
              if (id) {
                onSubmit(id);
              }
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
