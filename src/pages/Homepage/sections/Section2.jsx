import React from 'react'
import { menu_list } from '../../../assets/assets.js'
import { useDispatch, useSelector } from 'react-redux'
import { filterbyCategoty } from '../../../store/menuSlice.js';

function Section2() {

  const dispatch = useDispatch();

  const categories = useSelector((state) => state.categories.categories)

  function handleFilter(category) {
    dispatch(filterbyCategoty(category))
  }

  return (
    <>
      <div className='section_main'>
        <div className='section_desc'>
          <p className='section_title'>Explore our menu</p>
          <p className='section_description'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident molestiae laudantium architecto cum reiciendis est ducimus ex dolor officia! Repellendus earum nam mollitia tempora, molestiae animi maiores officia repellat impedit?</p>
        </div>
        <div className='menu_list'>
          {categories.map(item => (
            <div className='menu_list_item' key={item._id} onClick={() => handleFilter(item.category)}>
              <div style={{ backgroundImage: `url(${item.cat_img})` }} className='menu_list_image'></div>
              <p>{item.category}</p>
            </div>

          ))}
        </div>
        <hr />
      </div>
    </>
  )
}

export default Section2
