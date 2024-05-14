import express from "express";
import Category from "../models/Category.js";
import Menus from "../models/Menu.js"


const router = express.Router()

// Test route
router.get('', (req, res) => {
  return res.status(200).json({ "code": 200, "status": "Route woking" })
})

// Get all categories
router.get('/getcategories', async (req, res) => {
  try {
    const catList = await Category.find()

    if (catList.length > 0) {
      return res.status(200).json(catList)
    }
    else {
      return res.status(200).send('No categories added so far')
    }
  } catch (error) {
    console.error(error)
    return res.status(500).send('Internal server error')
  }
})

// Add New Category
router.post('/addcategory', async (req, res) => {

  const { category, cat_img } = req.body
  try {
    let cat = await Category.findOne({ category: category })
    if (cat) {
      return res.status(403).send('Category already exist!')
    }
    const newCategory = await new Category({
      category: category,
      cat_img: cat_img
    })
    const newCat = await newCategory.save()
    res.status(201).json(newCat)
  } catch (error) {
    console.error(error)
    return res.status(500).send('Internal server error')
  }
})

// Delete Category
router.delete('/deletecategory/:id', async (req, res) => {
  const delId = req.params.id
  try {
    let delCat = await Category.findOneAndDelete({ _id: delId })
    if (delCat) {
      return res.status(200).json(delCat._id)
    }
  } catch (error) {
    console.error(error)
    return res.status(500).send('Internal server error')
  }

})

// Get all menu item
router.get('/allmenu', async (req, res) => {
  // console.log('Get all menu route')
  try {
    const allmenu = await Menus.find()
    if (allmenu.length > 0) {
      return res.status(200).json(allmenu)
    } else {
      return res.status(200).json([])
    }
  } catch (error) {
    console.error(error)
    return res.status(500).send('Internal server error')
  }
})

// Add new menu item
router.post('/addmenuitem', async (req, res) => {
  const { title, ratings, image, price, prepTime, description, category } = req.body
  try {
    let menuItem = await Menus.findOne({ title: title })
    if (menuItem) {
      return res.status(403).send('Menu item already exist!')
    }
    const newMenuItem = await new Menus({
      title, ratings, image, price, prepTime, description, category
    })

    const newMenu = await newMenuItem.save()
    res.status(201).json(newMenu)
  } catch (error) {
    console.error(error)
    return res.status(500).send('Internal server error')
  }

})

// Delete menu item
router.delete('/deletemenuitem/:id', async (req, res) => {
  const delId = req.params.id
  try {
    let delMenu = await Menus.findOneAndDelete({ _id: delId })
    if (delMenu) {
      return res.status(200).json(delMenu._id)
    }
  } catch (error) {
    console.error(error)
    return res.status(500).send('Internal server error')
  }
})

export default router;