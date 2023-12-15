"use client";
import { useState,useEffect } from "react";
import CategoriesTable from "@/app/components/categories-table/CategoriesTable";
import FormCategories from "@/app/components/form-categories/FormCategories";
import { Box, Button, TextField, Typography } from "@mui/material";
import EditCategories from "../components/edit-categories/EditCategories";
import { useAppSelector, useAppDispatch } from "@/app/redux/store";
import { createCategoryThunk, deleteCategoryThunk, getCategoriesThunk,getCategoryThunk,updateCategoryThunk } from "../redux/category/categoryAction";
import { resetDetail } from "../redux/category/categorySlice";
import { CategoryParams } from "../redux/category/categoryInterface";
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteItem from "../components/delete-item/DeleteItem";


export default function AdminCategories() {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const handleOpenEdit = async (id:string) => {
    await dispatch(getCategoryThunk(id))
    setOpenEdit(true);
  }
  const handleCloseEdit = () => {
    setOpenEdit(false);
    dispatch(resetDetail(''))
  }
  const handleOpenDelete = async (id:string) => {
    await dispatch(getCategoryThunk(id))
    setOpenDelete(true);
  }
  const handleCloseDelete = () => setOpenDelete(false);

  const dispatch = useAppDispatch()
  const resultCategories = useAppSelector((state) => state.category)
  const {dataCategory} = resultCategories
  const {allCategories} = dataCategory

  const handleAdd = (params:CategoryParams) => {
    dispatch(createCategoryThunk(params))
  }
  
  const handleUpdate = (id:string,params:CategoryParams) => {
    dispatch(updateCategoryThunk({id,params}))
    handleCloseEdit()
  }

  const handleDelete = (id:string) => {
    dispatch(deleteCategoryThunk(id))
    handleCloseDelete()
  }

  useEffect(() => {
    dispatch(getCategoriesThunk())
  },[])
  
  
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        padding: "80px 100px 0 100px",
      }}
    >
      <Box sx={{ width: "100%" }}>
        <Typography
          variant="h5"
          sx={{ color: "#fff", textAlign: "center", marginBottom: "20px" }}
        >
          Danh mục phim
        </Typography>
      </Box>
      <FormCategories onSubmit={handleAdd}/>
      <CategoriesTable
        allCategories={allCategories}
        handleOpenEdit={handleOpenEdit}
        handleOpenDelete={handleOpenDelete}
      />
      <EditCategories open={openEdit} handleClose={handleCloseEdit} onSubmit={handleUpdate}/>
      <DeleteItem open={openDelete} onClose={handleCloseDelete} onSubmit={handleDelete}/>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Box>
  );
}
