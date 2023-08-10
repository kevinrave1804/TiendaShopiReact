import { ChevronRightIcon } from '@heroicons/react/24/solid'

const OrdersCard = props => {
  const { totalPrice, totalProducts } = props

  return (
    <div className="flex justify-between items-center border border-black rounded-lg p-4 w-80 mb-3">
      <div className='flex justify-between w-full'>
        <p className='flex flex-col'>
          <span>01.02.23</span>
          <span>{totalProducts} Articles</span>
        </p>

        <p className='flex items-center gap-3'>
          <span className='font-medium text-2xl'>${totalPrice}</span>
          <ChevronRightIcon
                className='h-6 w-6 text-black cursor-pointer'/>
        </p>
        
      </div>
    </div>
  )
}

export default OrdersCard