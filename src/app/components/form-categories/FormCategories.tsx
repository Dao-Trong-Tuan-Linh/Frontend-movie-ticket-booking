"use client"
import React,{useState} from "react";
import { Box, Button, TextField } from "@mui/material";
import { CategoryParams, ICategory } from "@/app/redux/category/categoryInterface";


interface FormCategoriesProps {
  onSubmit:(params:CategoryParams) => void
}

export default function FormCategories({onSubmit}:FormCategoriesProps) {
  const [value,setValue] = useState("")
  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit({name:value})
    setValue("")
  }
  return (
    <form onSubmit={handleSubmit} style={{display:'flex',alignItems:'center',marginBottom:'35px'}}>
      <TextField sx={{backgroundColor:'#fff',width:'250px'}} type="text" placeholder="Nhập danh mục cần thêm" size="small" value={value} onChange={(e) => setValue(e.target.value)}/>
      <Button type="submit" color="success" variant="contained" size="large">
        Thêm danh mục
      </Button>
    </form>
  );
}
