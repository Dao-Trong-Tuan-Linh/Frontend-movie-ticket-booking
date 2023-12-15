"use client";
import React, { useState, useEffect, useMemo, memo } from "react";
import {
  AppBar,
  Button,
  Stack,
  Typography,
  Popover,
  Menu,
  Box,
} from "@mui/material";
import Link from "next/link";
import { useAppSelector, useAppDispatch } from "@/app/redux/store";
import { logOut, resetUser } from "@/app/redux/auth/authSlice";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getMenusThunk } from "@/app/redux/menu/menuAction";
import { IMenu } from "@/app/redux/menu/menuInterface";

interface Props {
  window?: () => Window;
}
const drawerWidth = 240;
const navLinks = [
  {
    name: "Đăng nhập",
    href: "/login",
  },
  {
    name: "Đăng ký",
    href: "/register",
  },
];

export default memo(function Header() {
  const dispatch = useAppDispatch();
  const resultAuth = useAppSelector((state) => state.auth);
  const resultMenus = useAppSelector((state) => state.menu);
  const { dataAuth } = resultAuth;
  const { dataMenu } = resultMenus;
  const { allMenu } = dataMenu;

  const router = useRouter();

  const mainMenus = useMemo(
    () =>
      allMenu
        ? allMenu.filter((item) => item.isActive == true && item.level == 1)
        : [],
    [allMenu]
  );
  const childrenMenus = useMemo(
    () =>
      allMenu
        ? allMenu.filter((item) => item.isActive == true && item.level == 2)
        : [],
    [allMenu]
  );
  

  useEffect(() => {
    dispatch(getMenusThunk());
    dispatch(resetUser());
  }, []);

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  function secondaryMenu(id: string) {
    const children = childrenMenus.filter((menu: IMenu) => menu.parentID == id);

    return (
      <Stack
        sx={{ padding: "10px 20px", backgroundColor: "#ccc" }}
        direction={"column"}
        gap={"5px"}
      >
        {children.map((link) => (
          <Link className="link-header" key={link._id} href={link.link}>
            {link.name}
          </Link>
        ))}
      </Stack>
    );
  }

  return (
    <AppBar
      sx={{
        width: "100%",
        minWidth: "1200px",
        backgroundColor: "#1e1f1e",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        height: "70px",
        padding: "0 100px",
      }}
    >
      <Stack
        direction={"row"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={"1rem"}
      >
        <Link className="logo" href={dataAuth.user?.role == 1 ? '/admin/home' : "/"}>
          M&E
        </Link>
        {dataAuth.user?.role == 1 ? (
          <></>
        ) : (
          <>
            {mainMenus.map((menu) =>
              menu.link.length > 0 ? (
                <Link key={menu._id} className="link-header" href={menu.link}>
                  {menu.name}
                </Link>
              ) : (
                <Box key={menu._id} onMouseLeave={handleClose}>
                  <Typography
                    sx={{
                      padding: "0",
                      fontWeight: "600",
                      textTransform: "uppercase",
                      cursor: "pointer",
                      fontSize: "16px",
                      color: "#fff",
                      ":hover": {
                        color: "#cd8c3c",
                      },
                      position: "relative",
                    }}
                    onMouseEnter={handleOpen}
                  >
                    {menu.name}
                  </Typography>
                  <Box
                    sx={{
                      position: "absolute",
                      display: open ? "block" : "none",
                    }}
                    onMouseEnter={handleOpen}
                  >
                    {secondaryMenu(menu._id)}
                  </Box>
                </Box>
              )
            )}
          </>
        )}
      </Stack>
      <Stack
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        direction={"row"}
        gap={"1rem"}
      >
        {!dataAuth.token ? (
          navLinks.map((link, index) => (
            <Link className="link-header" key={index} href={link.href}>
              {link.name}
            </Link>
          ))
        ) : (
          <>
            <Link className="link-user" href="/">
              Xin chào,{dataAuth.user?.name}
            </Link>
            <Button
              onClick={() => {
                dispatch(logOut());
                router.push("/login");
              }}
              sx={{
                color: "white",
                ":hover": {
                  color: "#cd8c3c",
                },
              }}
            >
              Đăng xuất
            </Button>
          </>
        )}
      </Stack>
    </AppBar>
  );
});
