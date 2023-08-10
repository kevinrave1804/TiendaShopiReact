import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { ShoppingBagIcon } from '@heroicons/react/24/solid'
import { ShoppingCartContext } from '../../Context'

const Navbar = () => {
  const context = useContext(ShoppingCartContext)
  const activeStyle = 'underline underline-offset-4'

  //Sign out
  const signOut=localStorage.getItem('sign_out')
  const parsedSignOut=JSON.parse(signOut)
  const isUserSignOut=context.signOut || parsedSignOut

  const signOutFuntion=()=>{
    if(isUserSignOut) {
      return(<li>
          <NavLink
            to='/sign-in'
            onClick={()=>{
              localStorage.setItem("sign_out",JSON.stringify(true))
              context.setSign_out(true)
            }}
            className={({ isActive }) => 
              isActive ? activeStyle : undefined
            }>
            Log In/Sign In
          </NavLink>
        </li>)
    }else{
      return (<>
        <li className='text-black/60'>
            kevinrave1804@gmail.com
          </li>
          <li>
            <NavLink
              to='/my-orders'
              className={({ isActive }) =>
                isActive ? activeStyle : undefined
              }>
              My Orders
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/my-account'
              className={({ isActive }) =>
                isActive ? activeStyle : undefined
              }>
              My Account
            </NavLink>
          </li>
          <li>
          <NavLink
            to='/sign-in'
            onClick={()=>{
              localStorage.setItem("sign_out",JSON.stringify(true))
              context.setSign_out(true)
            }}
            className={({ isActive }) => 
              isActive ? activeStyle : undefined
            }>
            Sign Out
          </NavLink>
        </li>
      </>)
    }
  }

  return (
    <nav className='flex justify-between items-center fixed z-10 top-0 w-full py-5 px-8 text-sm font-light'>
      <ul className='flex items-center gap-3 '>
        <li className='font-semibold text-lg'>
          <NavLink to='/'>
            Shopi
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/'
            onClick={()=>context.setsearchByCategory("")}
            className={({ isActive }) =>
            isActive ? activeStyle : undefined
            }>
            All
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/clothes'
            onClick={()=>context.setsearchByCategory("clothes")}
            className={({ isActive }) =>
            isActive ? activeStyle : undefined
          }>
            Clothes
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/electronics'
            onClick={()=>context.setsearchByCategory("electronics")}
            className={({ isActive }) =>
            isActive ? activeStyle : undefined
          }>
            Electronics
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/furnitures'
            onClick={()=>context.setsearchByCategory("furnitures")}
            className={({ isActive }) =>
            isActive ? activeStyle : undefined
          }>
            Furnitures
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/toys'
            onClick={()=>context.setsearchByCategory("toys")}
            className={({ isActive }) =>
            isActive ? activeStyle : undefined
          }>
            Toys
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/others'
            onClick={()=>context.setsearchByCategory("others")}
            className={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>
            Others
          </NavLink>
        </li>
      </ul>
      <ul className='flex items-center gap-3'>
          {signOutFuntion()}
        <li className='flex items-center'>
          <ShoppingBagIcon className='h-6 w-6 text-black'></ShoppingBagIcon>
          <div>{context.cartProducts.length}</div>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar