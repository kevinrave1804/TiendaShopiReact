import { useContext } from 'react';
import { ShoppingCartContext } from '../../Context';
import Layout from '../../Components/Layout'

function SignIn() {
  const context = useContext(ShoppingCartContext);
    //Account
    const account=localStorage.getItem('account')
    const parsedAccount=JSON.parse(account)

    //Has an account
    const noAccountLS=parsedAccount ? Object.keys(parsedAccount).length===0 : true
    const noAccountContext=context.account ? Object.keys(context.account).length===0 : true
    const UserAccount=!noAccountLS || !noAccountContext
  return (
    <Layout>
        <h2 className='text-2xl font-bold'>Welcome to Shopi</h2>

        <div 
        className='flex flex-col items-center justify-evenly w-1/2 h-[300px] m-12 border-2 border-black rounded-xl'>
          <div className='flex flex-col w-1/2 h-20 justify-between'>
            <input type="text" placeholder='E-mail' className='rounded-md h-9 shadow-lg'/>
            <input type="password" placeholder='Password' className='rounded-md h-9 shadow-lg'/>
          </div>
          <div className='w-1/2 text-center'>
            <button 
            className='text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 w-full rounded-md disabled:text-black/50 disabled:border-black/40'
            disabled={!UserAccount}>
              Log In
            </button>
            <p>or</p>
            <button 
            className='text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 w-full rounded-md disabled:text-black/40 disabled:border-black/40'
            disabled={UserAccount}>
              Sign In
            </button>
          </div>
        </div>
      
    </Layout>
  )
}

export default SignIn