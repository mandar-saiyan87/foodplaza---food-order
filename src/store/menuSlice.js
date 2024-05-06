import { createSlice } from '@reduxjs/toolkit'
import { food_list } from '../assets/assets.js'


const initialState = {
  menus: food_list,
  filterMenu: [],
  selectedcategory: null
}

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
        state.filterMenu = state.menus.filter(menu => menu.name.toLowerCase().includes(search.toLowerCase()))
        // console.log(state.filterMenu)
      }
    }
  }
})

export const { filterbyCategoty, searchMenu } = menuSlice.actions

export default menuSlice.reducer