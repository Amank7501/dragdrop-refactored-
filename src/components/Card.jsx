import React from 'react'

const Card = ({title,description}) => {
  return (
    <div className=''>
        <div className=''>
        <label htmlFor="title" className='fs-4'>{title}</label>
        {/* <input type="text" name='title' /> */}
        </div>
        <div>
            <label htmlFor="description">{description}</label>
            {/* <textarea name="description" id=""></textarea> */}
        </div>

    </div>
  )
}

export default Card