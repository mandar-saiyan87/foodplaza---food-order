import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCategories } from '../../store/categorySlice'

const CategorySection = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCategories())
  })

  return (
    <>
      <div className='categories_main'>
        Categories Page
      </div>
    </>
  )
}

export default CategorySection