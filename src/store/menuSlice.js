import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { food_list } from '../assets/assets.js'


const initialState = {
  menus: [],
  filterMenu: [],
  selectedcategory: null,
  loading: false,
  error: null,
  page: 1,
  totalPages: 0,
  totalmenuItems: 0
}

export const getallmenu = createAsyncThunk('getallmenu', async (loadpage) => {
  const req = await fetch(`${process.env.REACT_APP_API_URL}/api/menu/allmenu?page=${loadpage}`)
  const data = await req.json()
  // console.log(data)
  return data
})

export const addmenuitem = createAsyncThunk('addmenuitem', async (menuitem) => {
  const req = await fetch(`${process.env.REACT_APP_API_URL}/api/menu/addmenuitem`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(menuitem)
  })
  const data = await req.json()
  return data
})

export const deletemenu = createAsyncThunk('deletemenu', async (id) => {
  // console.log(id)
  const req = await fetch(`${process.env.REACT_APP_API_URL}/api/menu/deletemenuitem/${id}`, {
    method: 'DELETE'
  })
  const data = await req.json()
  return data
})

export const editMenu = createAsyncThunk('editMenu', async (editedItem) => {
  // console.log(editedItem)
  const req = await fetch(`${process.env.REACT_APP_API_URL}/api/menu/editmenuitem`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(editedItem)
  })
  const data = await req.json()
  return data
})

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    filterbyCategoty: (state, action) => {
      const category = action.payload
      // console.log(category)
      if (category === state.selectedcategory) {
        state.filterMenu = []
        state.selectedcategory = null
        // console.log(state.filterMenu, state.selectedcategory)
      } else {
        state.filterMenu = state.menus.filter(menuItem => menuItem.category === category)
        state.selectedcategory = category
        // console.log(state.filterMenu, state.selectedcategory)
      }
    },
    searchMenu: (state, action) => {
      const search = action.payload
      if (!search || search === '') {
        state.filterMenu = []
      } else {
        state.filterMenu = state.menus.filter(menu => menu.title.toLowerCase().includes(search.toLowerCase()))
        // console.log(state.filterMenu)
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getallmenu.pending, (state) => {
      state.loading = true
    })
      .addCase(getallmenu.fulfilled, (state, action) => {
        state.loading = false
        // console.log(action.payload)
        const { allmenu, totalMenuItems, page, totalPages } = action.payload
        const uniqueMenu = allmenu.filter(
          (menuItem) => !state.menus.some((item) => item._id === menuItem._id)
        )
        state.menus = [...state.menus, ...uniqueMenu]
        state.page = page
        state.totalPages = totalPages
        state.totalmenuItems = totalMenuItems

      })
      .addCase(getallmenu.rejected, (state, action) => {
        state.loading = false
        state.error = action.error
      })
    builder.addCase(addmenuitem.pending, (state) => {
      state.loading = true
    })
      .addCase(addmenuitem.fulfilled, (state, action) => {
        state.loading = false
        // console.log(action.payload)
        state.menus.push(action.payload)
      })
      .addCase(addmenuitem.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
    builder.addCase(deletemenu.pending, (state) => {
      state.loading = true
    })
      .addCase(deletemenu.fulfilled, (state, action) => {
        state.loading = false
        // console.log(action.payload)
        state.menus = state.menus.filter(menu => menu._id !== action.payload)
      })
      .addCase(deletemenu.rejected, (state, action) => {
        state.loading = false
        state.error = action.error
      })
    builder.addCase(editMenu.pending, (state) => {
      state.loading = true
    })
      .addCase(editMenu.fulfilled, (state, action) => {
        state.loading = false
        const updatedItem = action.payload
        const edited = state.menus.findIndex(menu => menu._id === updatedItem._id)
        state.menus[edited] = updatedItem
      })
      .addCase(editMenu.rejected, (state, action) => {
        state.loading = false
        state.error = action.error
      })
  }
})

export const { filterbyCategoty, searchMenu } = menuSlice.actions

export default menuSlice.reducer