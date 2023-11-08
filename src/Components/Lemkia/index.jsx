import { Fragment, useContext } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ShoppingCartContext } from '../../Context'
import Busqueda from './Busqueda'


export default function Lemkia() {
    const context = useContext(ShoppingCartContext)

    const { isOpen, setIsOpen } = context

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-[644px] transform overflow-hidden rounded-3xl bg-black/70 border border-black p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-4xl text-center font-normal leading-6 text-white"
                                    >
                                        HOLA, SOY LEMKIA
                                    </Dialog.Title>
                                    <div className="mt-[14px] text-center flex flex-col">
                                        <p className="text-sm text-white font-normal">
                                            TU BUSCADOR CON INTELIGENCIA ARTIFICIAL
                                        </p>
                                        <p className="mt-2 text-sm text-white font-normal">
                                            Ahora  entiendo imágenes para ayudarte a encontrar
                                            mas rápido lo que buscas.
                                        </p>
                                    </div>

                                    <div className=" flex  justify-around mt-11">
                                        <Busqueda />
                                    </div>
                                    <picture className='flex justify-center items-center mt-[46px]'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="321" height="75" viewBox="0 0 321 75" fill="none">
                                            <path d="M1.55765 25.6522C-2.21688 12.8407 7.38634 0 20.7423 0H300.698C314.219 0 323.844 13.1391 319.767 26.0313L308.696 61.0313C306.066 69.3475 298.35 75 289.628 75H31.054C22.1853 75 14.3757 69.1594 11.8693 60.6522L1.55765 25.6522Z" fill="#25A7AF" />
                                        </svg>
                                        <img src="/images/lemkia.png" alt="" className='fixed' />
                                    </picture>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
