import { useContext } from 'react'
import Layout from '../../Components/Layout'
import Card from '../../Components/Card'
import ProductDetail from '../../Components/ProductDetail'
import { ShoppingCartContext } from '../../Context'
import Lemkia from '../../Components/Lemkia'
import CardProductos from '../../Components/Lemkia/CardProductos'

function Home() {
  const context = useContext(ShoppingCartContext)
  const { productosRopa } = context

  const renderView = () => {
    if (context.filtereditems?.length > 0) {
      return (
        context.filtereditems?.map(item => (
          <Card key={item.id} data={item} />
        ))
      )
    } else {
      return (<div className='font-bold text-2xl bg-slate-400 rounded-xl p-5'>
        We don't have anything
      </div>)
    }
  }

  const renderProductosRopa = () => {
    // const { productosRopa } = context
    // if (productosRopa?.length > 0) {
    return (
      productosRopa?.results?.map((producto) => (
        <CardProductos key={producto.code} data={producto} />
      )
      ))
    // }

  }

  return (
    <Layout>
      <Lemkia />
      <div className='flex items-center justify-center relative w-80 mb-4'>
        <h1 className='font-medium text-xl'>Exclusive Products</h1>
      </div>

      <input
        type="text"
        placeholder='Search product'
        className='rounded-lg border-black w-80 p-4 mb-4'
        onChange={(event) => context.setsearchByTitle(event.target.value)} />

      <div className='grid gap-4 grid-cols-4 w-full max-w-screen-lg'>
        {renderProductosRopa()}
        {renderView()}
      </div>
      <ProductDetail />
    </Layout>
  )
}

export default Home