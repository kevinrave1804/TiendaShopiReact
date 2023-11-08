import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

function Loading() {
    return (
        <div className='flex flex-col justify-center items-center'>
            <FontAwesomeIcon icon={faSpinner} spinPulse className=' w-6 h-6 text-white' />
            <p className='text-white'>Por supuesto!</p>
            <p className='text-white'>Dame un segundo mientras busco.</p>
        </div>
    )
}

export default Loading
