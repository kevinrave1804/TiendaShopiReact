import React, { useContext } from 'react'
import { ShoppingCartContext } from '../Context'
import Layout from '../Components/Layout'
import CardProductos from '../Components/Lemkia/CardProductos'

function InfoProducto() {
    const context = useContext(ShoppingCartContext)
    const { productosRopa } = context

    // const item1 = productosRopa?.results[1]
    // const item2 = productosRopa?.results[3]
    // const item3 = productosRopa?.results[5]

    // const productos = [item1, item2, item3]

    // localStorage.setItem("productos", JSON.stringify(productos))

    const productosSugeridos = localStorage.getItem("productos")
    const productosFinales = JSON.parse(productosSugeridos || "[]")

    return (
        <Layout>
            <h1 className='font-bold text-2xl text-[#25A7AF] mb-4'>Estos fueron los resultados que encontre</h1>
            <div className='grid grid-cols-2 gap-2'>
                {productosFinales.map((producto) => (
                    <CardProductos key={producto.code} data={producto} />
                ))}
            </div>
        </Layout>
    )
}

export default InfoProducto
