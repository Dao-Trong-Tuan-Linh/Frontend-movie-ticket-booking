"use client";
import React, { useState, ChangeEvent, useEffect,useMemo } from "react";
import { styled } from "@mui/system";
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  FormControl,
  InputLabel,
} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useAppDispatch, useAppSelector } from "@/app/redux/store";
import { useRouter } from "next/navigation";
import { ICategory } from "../redux/category/categoryInterface";
import { IMenu } from "../redux/menu/menuInterface";
import { getMenuThunk, getMenusThunk, updateMenuThunk } from "../redux/menu/menuAction";

const Container = styled("div")({
  position: "relative",
  width: "100%",
  backgroundColor: "#fff",
  marginRight: "auto",
  marginLeft: "auto",
  paddingLeft: "15px",
  paddingRight: "15px",
});

interface AdminUpdateMenuProps {
  id: string;
}
export default function AdminUpdateMenu({ id }: AdminUpdateMenuProps) {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const [name, setName] = useState("");
  const [level, setLevel] = useState(0);
  const [order, setOrder] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [parentId, setParentId] = useState("");
  const [parentMenu, setParentMenu] = useState<{parentID:string,parentName:string}[]>([{parentID:'0',parentName:'Không'}]);
  const [link, setLink] = useState("");
  
  const resultMenu = useAppSelector((state) => state.menu);
  const { dataMenu } = resultMenu;
  const { detailMenu,allMenu } = dataMenu;

  const allParent = useMemo(() => allMenu.filter((menu) => menu.level == 1),[allMenu])
  
  useEffect(() => {
    setParentMenu([{parentID:'0',parentName:'Không'}])
    dispatch(getMenuThunk(id))
  },[])

  useEffect(() => {
    const newParents = allParent.map((menu) =>  ({parentID:`${menu._id}`,parentName:`${menu.name}`}))
    if(parentMenu.length === 1) {
      setParentMenu((prev) => [...prev,...newParents])
    }
  },[allParent])

  useEffect(() => {
    setName(detailMenu.name)
    setLevel(detailMenu.level)
    setOrder(detailMenu.order)
    setIsActive(detailMenu.isActive)
    setParentId(detailMenu.parentID)
    setLink(detailMenu.link)
  }, [detailMenu]);

  

  const handleChange = (event: SelectChangeEvent) => {
    setParentId(event.target.value as string);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const menu = {name,isActive,level,order,parentID:parentId,link}
    await dispatch(updateMenuThunk({id,menu}))
    setName("")
    setLevel(0)
    setOrder(0)
    setIsActive(false)
    setParentId("")
    setLink("")
    router.push('/admin/menu')
  }


  return (
    <Container>
      <Box
        sx={{
          width: "100%",
          overflow: "hidden",
          padding: "100px 0 150px",
          marginLeft: "-15px",
          marginRight: "-15px",
        }}
      >
        <Box
          sx={{
            position: "relative",
            paddingLeft: "15px",
            paddingRight: "15px",
          }}
        >
          <Box
            sx={{
              width: "100%",
              position: "relative",
              mb: "30px",
            }}
          >
            <Typography align="center" fontWeight={"600"} variant="h5">
              Sửa menu
            </Typography>
          </Box>
          <Box
            sx={{
              width: "100%",
              position: "relative",
            }}
          >
            <form onSubmit={handleSubmit}>
              <Stack direction={"column"} gap={"20px"}>
                <FormControl>
                  <InputLabel shrink>Tên menu</InputLabel>
                  <TextField
                  sx={{marginTop:'10px'}}
                    type="text"
                    fullWidth
                    placeholder="Tên menu"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </FormControl>
                <FormControlLabel
                  control={
                    <Switch
                      checked={isActive}
                      onChange={(e) => setIsActive(e.target.checked)}
                    />
                  }
                  label="Trạng thái"
                />
                <FormControl>
                  <InputLabel shrink>Mức độ</InputLabel>
                  <TextField
                  sx={{marginTop:'10px'}}
                    type="text"
                    fullWidth
                    placeholder="Mức độ"
                    value={level}
                    onChange={(e) => setLevel(Number(e.target.value))}
                  />
                </FormControl>
                <FormControl>
                  <InputLabel shrink>Thư tự</InputLabel>
                  <TextField
                  sx={{marginTop:'10px'}}
                    type="text"
                    fullWidth
                    placeholder="Thứ tự"
                    value={order}
                    onChange={(e) => setOrder(Number(e.target.value))}
                  />
                </FormControl>
                <FormControl>
                  <InputLabel shrink>Id cha</InputLabel>
                  <Select
                  sx={{marginTop:'10px'}}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={parentId}
                    label="ParentId"
                    onChange={handleChange}
                  >
                    {parentMenu.map((menu) => (
                      <MenuItem key={menu.parentID} value={menu.parentID}>
                        {menu.parentName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl>
                  <InputLabel shrink>Link</InputLabel>
                  <TextField
                  sx={{marginTop:'10px'}}
                    type="text"
                    fullWidth
                    placeholder="Link"
                    onChange={(e) => setLink(e.target.value)}
                    value={link}
                  />
                </FormControl>

                <Button
                  type="submit"
                  sx={{ textAlign: "center", marginTop: "10px" }}
                  color="success"
                  variant="contained"
                >
                  Sửa
                </Button>
              </Stack>
            </form>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
