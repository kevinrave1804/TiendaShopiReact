import { useState, useContext, useEffect } from 'react'
import { useFormik } from 'formik'
import { PhotoIcon, MicrophoneIcon, CameraIcon } from '@heroicons/react/24/solid'
import { Tab } from '@headlessui/react'
import { ShoppingCartContext } from '../../Context'
import Loading from '../Loading/Loading'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRecordVinyl } from '@fortawesome/free-solid-svg-icons'
import { BsSoundwave } from 'react-icons/bs';
import Lectura from '../Lectura/Lectura'
import { useNavigate } from 'react-router-dom'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Busqueda() {
    const context = useContext(ShoppingCartContext)
    const { isOpen, setIsOpen } = context

    const [loadingImagen, setLoadingImagen] = useState(false)
    const [loadingVoz, setLoadingVoz] = useState(false)
    const [mostrarMensaje, setMostrarMensaje] = useState(false)

    const navigate = useNavigate()

    let [categories] = useState({
        Imagen: {
            solicitud: "Imagen",
        },
        Voz: {
            solicitud: "Microfono",
        }
    })

    const formik = useFormik({
        initialValues: {
            imagen: undefined
        },
        onSubmit: values => {
            setLoadingImagen(true)
            const time = setTimeout(() => {
                setIsOpen(false)
                navigate('/producto')
            }, 4000)
        },
    })

    const Temporizador = () => {
        setLoadingVoz(true)
        const time = setTimeout(() => {
            setMostrarMensaje(true)
        }, 3000)

        const time2 = setTimeout(() => {
            setIsOpen(false)
            navigate('/producto')
        }, 5000)
        return () => clearTimeout(time)
    }

    return (
        <div className="w-full max-w-md px-2 sm:px-0">
            <Tab.Group>
                <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
                    {Object.keys(categories).map((category) => (
                        <Tab
                            key={category}
                            className={({ selected }) =>
                                classNames(
                                    'flex justify-center w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-300',
                                    'ring-white/60 ring-offset-2 ring-offset-blue-200 focus:outline-none focus:ring-2',
                                    selected
                                        ? 'bg-white shadow'
                                        : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                                )
                            }
                        >
                            {category === 'Imagen' ? <PhotoIcon className='w-6 h-6 fill-[#25A7AF]' /> : <MicrophoneIcon className='w-6 h-6 fill-[#25A7AF]' />}
                        </Tab>
                    ))}
                </Tab.List>
                <Tab.Panels className="flex flex-col justify-center items-center mt-4">
                    {Object.values(categories).map((posts, idx) => {
                        return (
                            <Tab.Panel
                                key={idx}
                                className={`rounded-xl p-3 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 bg-[#25A7AF] cursor-pointer`
                                }
                            >
                                <div>
                                    {posts.solicitud === 'Imagen' ?
                                        <div>
                                            {loadingImagen ? <Loading /> :
                                                <form onSubmit={formik.handleSubmit} className='flex  flex-col justify-between items-center' >
                                                    <div className='flex justify-between'>
                                                        <CameraIcon className='w-6 h-6 mr-3' />
                                                        <input
                                                            id='imagen'
                                                            type="file"
                                                            onChange={() => formik.handleChange}
                                                            value={formik.values.imagen} />
                                                    </div>
                                                    <button className='mt-4 rounded-md px-3 bg-[#D9D9D9]' type='submit'>Buscar</button>
                                                </form>}
                                        </div> :
                                        <div className='text-center'>
                                            {loadingVoz ?
                                                <div>
                                                    <p>Escuchando solicitud</p>
                                                    <div className='flex'>
                                                        < BsSoundwave size={100} />
                                                        < BsSoundwave size={100} />
                                                        < BsSoundwave size={100} />
                                                        < BsSoundwave size={100} />
                                                    </div>
                                                    {mostrarMensaje && <Lectura />}
                                                </div>
                                                :
                                                <>
                                                    <div className='flex justify-center items-center'>
                                                        <MicrophoneIcon className='w-6 h-6 fill-black' />
                                                        <p className='text-white'>Dime lo que deseas encontrar.</p>
                                                    </div>
                                                    <div className='flex justify-center items-center mt-3' onClick={Temporizador}>
                                                        <p className='mr-2'>Grabar</p>
                                                        <FontAwesomeIcon icon={faRecordVinyl} fade style={{ color: 'red' }} />
                                                    </div>
                                                </>}
                                        </div>
                                    }
                                </div>
                            </Tab.Panel>
                        )
                    })}
                    <p className='text-white'>Te traeré los resultados más similares a lo que necesitas.</p>
                </Tab.Panels>
            </Tab.Group>
        </div>
    )
}
