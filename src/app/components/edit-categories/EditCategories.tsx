"use client";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Stack, TextField } from "@mui/material";
import {  useAppSelector } from "@/app/redux/store";
import { CategoryParams } from "@/app/redux/category/categoryInterface";

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

interface EditCategoriesProps {
  open: boolean;
  handleClose: () => void;
  onSubmit: (id: string, params: CategoryParams) => void;
}

export default function EditCategories({
  open,
  handleClose,
  onSubmit,
}: EditCategoriesProps) {
  const resultCategory = useAppSelector((state) => state.category);
  const { dataCategory } = resultCategory;
  const { detailCategory } = dataCategory;

  const [id, setId] = useState(detailCategory._id);
  const [value, setValue] = useState(detailCategory.name);
  useEffect(() => {
    setId(detailCategory._id ? detailCategory._id : "");
    setValue(detailCategory.name ? detailCategory.name : "");
  }, [detailCategory]);

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (id && value) {
      onSubmit(id, { name: value });
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          marginBottom={"20px"}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Sửa danh mục
          </Typography>
          <Button onClick={handleClose} color="error">
            Hủy
          </Button>
        </Stack>
        <form
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "35px",
          }}
          onSubmit={handleSubmit}
        >
          <TextField
            sx={{ backgroundColor: "#fff", width: "250px" }}
            type="text"
            placeholder="Sửa lại danh mục"
            size="small"
            onChange={(e) => setValue(e.target.value)}
            value={value}
            disabled={detailCategory.name?.length == 0}
          />
          <Button
            type="submit"
            color="success"
            variant="contained"
            size="large"
            disabled={value?.length === 0}
          >
            Sửa
          </Button>
        </form>
      </Box>
    </Modal>
  );
}
