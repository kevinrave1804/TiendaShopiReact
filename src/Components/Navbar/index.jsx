import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { ShoppingBagIcon } from '@heroicons/react/24/solid'
import { ShoppingCartContext } from '../../Context'
import { ShoppingCart } from '../ShoppingCart'

const Navbar = () => {
  const context = useContext(ShoppingCartContext)
  const activeStyle = 'underline underline-offset-4'

  //Sign out
  const signOut = localStorage.getItem('sign_out')
  const parsedSignOut = JSON.parse(signOut)
  const isUserSignOut = context.signOut || parsedSignOut


  //Account
  const account = localStorage.getItem('account')
  const parsedAccount = JSON.parse(account)

  //Has an account
  const noAccountLS = parsedAccount ? Object.keys(parsedAccount).length === 0 : true
  const noAccountContext = context.account ? Object.keys(parsedAccount).length === 0 : true
  const noAccount = !noAccountLS || !noAccountContext

  const signOutFuntion = () => {
    if (noAccount && !isUserSignOut) {
      return (<>
        <li className='text-black/60'>
          {parsedAccount?.email}
        </li>
        <li>
          <NavLink
            to='/my-orders'
            className={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>
            Mis Ordenes
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/my-account'
            className={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>
            Mi Cuenta
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/sign-in'
            onClick={() => {
              localStorage.setItem("sign_out", JSON.stringify(true))
              context.setSign_out(true)
            }}
            className={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>
            Cerrar Sesion
          </NavLink>
        </li>
      </>)
    } else {
      return (<li>
        <NavLink
          to='/sign-in'
          onClick={() => {
            localStorage.setItem("sign_out", JSON.stringify(true))
            context.setSign_out(true)
          }}
          className={({ isActive }) =>
            isActive ? activeStyle : undefined
          }>
          Log In/Sign In
        </NavLink>
      </li>)
    }
  }

  return (
    <nav className='flex justify-between items-center fixed z-10 top-0 w-full py-5 px-8 text-sm font-light bg-white'>
      <ul className='flex items-center gap-3 '>
        <li className='font-semibold text-lg'>
          <NavLink to={`${isUserSignOut ? '/sign-in' : '/'}`}>
            Shopi
          </NavLink>
        </li>
      </ul>
      <ul className='flex items-center gap-3'>
        {signOutFuntion()}
        <li className='flex items-center'>
          <ShoppingCart />
        </li>
      </ul>
    </nav>
  )
}

export default Navbar