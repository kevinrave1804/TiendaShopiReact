import { Fragment, useState, useContext } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ShoppingCartContext } from '../../Context'

export default function LemkiaMini() {
    const context = useContext(ShoppingCartContext)
    const { isOpen, setIsOpen } = context


    function closeModal() {
        setIsOpen(true)
    }

    return (
        <>
            {!isOpen &&
                <div className='fixed right-0 top-[70px] w-[358px] bg-black/70 rounded-lg p-6'>
                    <div className='flex flex-col justify-center items-center'>
                        <h1 className='text-lg font-medium leading-6 text-white'>LEMKIA</h1>
                        <p className="text-sm text-white">
                            TU BUSCADOR CON INTELIGENCIA ARTIFICIAL
                        </p>
                        <button className='mt-4 rounded-md px-3 bg-[#25A7AF]' onClick={closeModal}>Buscar</button>
                    </div>

                    <picture className="flex justify-center items-center mt-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="321" height="75" viewBox="0 0 321 75" fill="none">
                            <path d="M1.55765 25.6522C-2.21688 12.8407 7.38634 0 20.7423 0H300.698C314.219 0 323.844 13.1391 319.767 26.0313L308.696 61.0313C306.066 69.3475 298.35 75 289.628 75H31.054C22.1853 75 14.3757 69.1594 11.8693 60.6522L1.55765 25.6522Z" fill="#25A7AF" />
                        </svg>
                        <img src="/images/lemkia.png" alt="" className='fixed' />
                    </picture>
                </div>}
        </>
    )
}
