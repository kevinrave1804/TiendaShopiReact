import React from 'react'

function CardProductos({ data }) {
    return (
        <div
            className='bg-white cursor-pointer w-56 h-60 rounded-lg'>
            <figure className='relative mb-2 w-full h-4/5'>
                <span className='absolute bottom-0 left-0 bg-white/60 rounded-lg text-black text-xs m-2 px-3 py-0.5'>{data.categoryName}</span>
                <img className='w-full h-full object-cover rounded-lg' src={data.galleryImages[0].baseUrl} alt={data.name} />
            </figure>
            <p className='flex justify-between items-center'>
                <span className='text-sm font-light'>{data.name}</span>
                <span className='text-lg font-medium'>${data.price.value}</span>
            </p>
        </div>
    )
}

export default CardProductos