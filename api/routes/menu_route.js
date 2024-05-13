import express from "express";
import Category from "../models/Category.js";


const router = express.Router()

// Get all categories

router.get('', (req, res) => {
  return res.status(200).json({ "code": 200, "status": "Route woking" })
})

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

router.get('/allmenu', async (req, res) => {
  console.log('Get all menu route')
  return res.status(200).json({ "code": 200, "status": "All menu route working" })
})

export default router;