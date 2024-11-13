import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  loading: false,
  error: null,
};

export const getCategories = createAsyncThunk("getCategories", async () => {
  // console.log(process.env.REACT_APP_API_URL)
  const res = await fetch(
    `${process.env.REACT_APP_API_URL}/api/menu/getcategories`
  );
  const data = await res.json();
  // console.log(data)
  return data;
});

export const addNew = createAsyncThunk("addnew", async (newcat) => {
  const newCategory = {
    category: newcat.title,
    cat_img: newcat.imgUrl,
  };
  // console.log(newCategory)
  const req = await fetch(
    `${process.env.REACT_APP_API_URL}/api/menu/addcategory`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCategory),
    }
  );
  const data = await req.json();
  return data;
});

export const deleteCat = createAsyncThunk("deleteCat", async (id) => {
  // console.log(id)
  const req = await fetch(
    `${process.env.REACT_APP_API_URL}/api/menu/deletecategory/${id}`,
    {
      method: "DELETE",
    }
  );
  const data = await req.json();
  return data;
});

export const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
    builder
      .addCase(addNew.pending, (state) => {
        state.loading = true;
      })
      .addCase(addNew.fulfilled, (state, action) => {
        state.loading = false;
        state.categories.push(action.payload);
      })
      .addCase(addNew.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
    builder
      .addCase(deleteCat.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCat.fulfilled, (state, action) => {
        state.loading = false;
        // console.log(action.payload)
        state.categories = state.categories.filter(
          (category) => category._id !== action.payload
        );
      })
      .addCase(deleteCat.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export const {} = categorySlice.actions;
export default categorySlice.reducer;
