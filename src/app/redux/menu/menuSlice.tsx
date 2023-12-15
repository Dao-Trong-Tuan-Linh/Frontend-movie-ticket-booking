import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getMenuThunk, getMenusThunk, updateMenuThunk } from "./menuAction";
import { toast } from "react-toastify";
import { IMenu, MenuState } from "./menuInterface";

const initialMenuState: MenuState = {
  loading: false,
  error: "",
  dataMenu: {
    allMenu: [],
    detailMenu: {
      _id: "",
      name: "",
      isActive: true,
      level: 0,
      order: 0,
      parentID: "",
      link: "",
    },
  },
};

export const menuSlice = createSlice({
  name: "menu",
  initialState: initialMenuState,
  reducers: {
    resetDetailMenu: (state, action) => {
      state.dataMenu.detailMenu = {
        _id: "",
        name: "",
        isActive: true,
        level: 0,
        order: 0,
        parentID: "",
        link: "",
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMenusThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getMenusThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.dataMenu.allMenu = action.payload;
    });
    builder.addCase(getMenusThunk.rejected, (state, action) => {
      state.loading = false;
      toast.error("Lỗi trong khi tải trang");
    });
    builder.addCase(getMenuThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getMenuThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.dataMenu.detailMenu = action.payload;
    });
    builder.addCase(getMenuThunk.rejected, (state, action) => {
      state.loading = false;
      toast.error("Lỗi trong khi tải trang");
    });
    builder.addCase(updateMenuThunk.fulfilled, (state, action) => {
      const payload = action.payload as IMenu;
      const prevData = state.dataMenu.allMenu;
      const newData = prevData.map((menu) => {
        return menu._id === payload._id ? payload : menu;
      });
      state.dataMenu.allMenu = newData;
      toast.success(`Đã cập nhập ${payload.name} thành công`);
    });

    builder.addCase(updateMenuThunk.rejected, (state, action:PayloadAction<any>) => {
      toast.error(action.payload);
    });
  },
});

const { reducer: menuReducer } = menuSlice;

export { menuReducer };
