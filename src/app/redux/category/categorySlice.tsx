import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  getCategoriesThunk,
  getCategoryThunk,
  createCategoryThunk,
  updateCategoryThunk,
  deleteCategoryThunk,
} from "./categoryAction";
import { CategoryState, ICategory } from "./categoryInterface";
import { toast } from "react-toastify";

const initialCategoryState: CategoryState = {
  loading: false,
  dataCategory: {
    allCategories: [],
    detailCategory: {
      _id: "",
      name: "",
    },
  },
};

export const categorySlice = createSlice({
  name: "category",
  initialState: initialCategoryState,
  reducers: {
    resetDetail: (state, action) => {
      state.dataCategory.detailCategory = {
        _id: "",
        name: "",
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCategoriesThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCategoriesThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.dataCategory.allCategories = action.payload;
    });
    builder.addCase(
      getCategoriesThunk.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        toast.error(action.payload);
      }
    );
    builder.addCase(getCategoryThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCategoryThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.dataCategory.detailCategory = action.payload;
    });
    builder.addCase(
      getCategoryThunk.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        toast.error(action.payload);
      }
    );
    builder.addCase(createCategoryThunk.fulfilled, (state, action) => {
      state.dataCategory.allCategories = [
        action.payload,
        ...state.dataCategory.allCategories
      ];
      toast.success("Đã thêm mới thành công");
    });
    builder.addCase(
      createCategoryThunk.rejected,
      (state, action: PayloadAction<any>) => {
        toast.error(action.payload);
      }
    );
    builder.addCase(updateCategoryThunk.fulfilled, (state, action) => {
      const payload = action.payload as ICategory;
      const prevData = state.dataCategory.allCategories;
      const newData = prevData.map((category) => {
        return category._id === payload._id
          ? { ...category, name: payload.name }
          : category;
      });
      state.dataCategory.allCategories = newData;
      toast.success(`Đã cập nhập ${payload.name} thành công`)
    });
    builder.addCase(
      updateCategoryThunk.rejected,
      (state, action: PayloadAction<any>) => {
        toast.error(action.payload);
      }
    );
    builder.addCase(deleteCategoryThunk.fulfilled, (state, action) => {
      const payload = action.payload as ICategory;
      const prevData = state.dataCategory.allCategories;
      const newData = prevData.filter(
        (category) => category._id !== payload._id
      );
      state.dataCategory.allCategories = newData;
      toast.success(`Đã xóa ${payload.name} thành công`)
    });
    builder.addCase(
      deleteCategoryThunk.rejected,
      (state, action: PayloadAction<any>) => {
        toast.error(action.payload);
      }
    );
  },
});

const { reducer: categoryReducer } = categorySlice;
export const { resetDetail } = categorySlice.actions;

export { categoryReducer };
