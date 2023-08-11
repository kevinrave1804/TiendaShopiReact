import { useContext,useState,useRef } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCartContext } from '../../Context';
import Layout from '../../Components/Layout'

function SignIn() {
  const context = useContext(ShoppingCartContext);

  // const user={"name":"KevinR","email":"kevin@example.com","password":123}

  //State to view
  const [view,setView]=useState("userInfo")

  //Recuperar Informacion del formulario
  const form=useRef(null)

  //Account
  const account=localStorage.getItem('account')
  const parsedAccount=JSON.parse(account)

  //Has an account
  const noAccountLS=parsedAccount ? Object.keys(parsedAccount).length===0 : true
  const noAccountContext=context.account ? Object.keys(context.account).length===0 : true
  const UserAccount=!noAccountLS || !noAccountContext  // Object.keys(object(Usuario)) me permite obtener las key de un json

  const createAnAccount = () => {
		const formData = new FormData(form.current)
		const data = {
			name: formData.get('name'),
			email: formData.get('email'),
			password: formData.get('password')
		}
  }

  const LoginInfo=()=>{
    return(
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
            onClick={()=>setView("createUserInfo")}
            disabled={UserAccount}
            >
              Sign Up
            </button>
          </div>
        </div>
      )
  }

  const SigninInfo=()=>{
    return(
      <form ref={form} className='flex flex-col gap-4 w-80'>
        <div className='flex flex-col gap-1'>
          <label htmlFor="name" className='font-light text-sm'>Your name:</label>
          <input
            type="text"
            id="name"
            name="name"
            defaultValue={parsedAccount?.name}
            placeholder="Peter"
            className='rounded-lg border border-black placeholder:font-light
            placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4'
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor="email" className='font-light text-sm'>Your email:</label>
          <input
            type="text"
            id="email"
            name="email"
            defaultValue={parsedAccount?.email}
            placeholder="hi@helloworld.com"
            className='rounded-lg border border-black
            placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4'
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor="password" className='font-light text-sm'>Your password:</label>
          <input
            type="text"
            id="password"
            name="password"
            defaultValue={parsedAccount?.password}
            placeholder="******"
            className='rounded-lg border border-black
            placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4'
          />
        </div>
        <Link to="/">
          <button
            className='bg-black text-white w-full rounded-lg py-3'
            onClick={() => createAnAccount()}>
            Create
          </button>
        </Link>
      </form>
      )
  }
  const renderView=()=>view === "userInfo" ? LoginInfo() : SigninInfo()
    
  return (
    <Layout>
        <h2 className='text-2xl font-bold'>Welcome to Shopi</h2>
        {renderView()}
    </Layout>
  )
}

export default SignIn