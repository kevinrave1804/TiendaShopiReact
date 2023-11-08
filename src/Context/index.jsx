import { createContext, useState, useEffect } from 'react'

export const ShoppingCartContext = createContext()

// export function obtenerProductosSugeridos() {
//   try {
//     const productos = localStorage.getItem("productos")
//     return JSON.parse(productos || "[]")
//   } catch (error) {
//     console.error(error);
//   }
// }

// export function agregarProductosSugeridos(producto) {
//   try {
//     const productosSugeridos=obtenerProductosSugeridos()
//     productosSugeridos.push(producto)
//   } catch (error) {
//     console.error(error);
//   }
// }

export const initializedlocalStorage = () => {
  const accountLS = localStorage.getItem("account")
  const sign_outLS = localStorage.getItem("sign_out")
  let accountInLocalStorage
  let sign_outInLocalStorage

  if (!accountLS) {
    localStorage.setItem("account", JSON.stringify({}))
    accountInLocalStorage = {}
  } else {
    accountInLocalStorage = JSON.stringify(accountLS)
  }

  if (!sign_outLS) {
    localStorage.setItem("sign_out", JSON.stringify(false))
    sign_outInLocalStorage = false
  } else {
    sign_outInLocalStorage = JSON.stringify(sign_outLS)
  }
}

export const ShoppingCartProvider = ({ children }) => {
  //Lemkia
  const [isOpen, setIsOpen] = useState(true)

  //Lemkia Productos
  const [productosRopa, setProductosRopa] = useState([])
  //LocalStorage
  const [account, setAccount] = useState({})
  const [sign_out, setSign_out] = useState(false)

  // Shopping Cart · Increment quantity
  const [count, setCount] = useState(0)

  // Product Detail · Open/Close
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false)
  const openProductDetail = () => setIsProductDetailOpen(true)
  const closeProductDetail = () => setIsProductDetailOpen(false)

  // Checkout Side Menu · Open/Close
  const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] = useState(false)
  const openCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(true)
  const closeCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(false)

  // Product Detail · Show product
  const [productToShow, setProductToShow] = useState({})

  // Shopping Cart · Add products to cart
  const [cartProducts, setCartProducts] = useState([])

  // Shopping Cart · Order
  const [order, setOrder] = useState([])

  //Get Products
  const [items, setItems] = useState(null)
  const [filtereditems, setfilteredItems] = useState(null)

  //Search products
  const [searchByTitle, setsearchByTitle] = useState(null)

  const [searchByCategory, setsearchByCategory] = useState(null)

  useEffect(() => {
    fetch('https://api.escuelajs.co/api/v1/products')
      .then(response => response.json())
      .then(data => setItems(data))
  }, [])

  const filteredItemsByTitle = (items, searchByTitle) => {
    return items?.filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()))
  }

  const filteredItemsByCategory = (items, searchByCategory) => {
    return items?.filter(item => item.category.name.toLowerCase().includes(searchByCategory.toLowerCase()))
  }

  const filterBy = (searchType, items, searchByTitle, searchByCategory) => {
    if (searchType === "Bytitle") {
      return filteredItemsByTitle(items, searchByTitle)
    }

    if (searchType === "Bycategory") {
      return filteredItemsByCategory(items, searchByCategory)
    }

    if (searchType === "Bytitleandcategory") {
      return filteredItemsByCategory(items, searchByCategory).filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()))
    }

    if (!searchType) {
      return items
    }
  }

  useEffect(() => {
    if (searchByCategory && searchByTitle) setfilteredItems(filterBy("Bytitleandcategory", items, searchByTitle, searchByCategory))
    if (searchByTitle && !searchByCategory) setfilteredItems(filterBy("Bytitle", items, searchByTitle, searchByCategory))
    if (searchByCategory && !searchByTitle) setfilteredItems(filterBy("Bycategory", items, searchByTitle, searchByCategory))
    if (!searchByCategory && !searchByTitle) setfilteredItems(filterBy(null, items, searchByTitle, searchByCategory))
  }, [items, searchByTitle, searchByCategory])

  const url = 'https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/list?country=mx&lang=es&currentpage=0&pagesize=30&concepts=H%26M%20MAN';
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '25c0e2dbc5msh2ff3851a89bc38bp1a111djsn0ebba46abb64',
      'X-RapidAPI-Host': 'apidojo-hm-hennes-mauritz-v1.p.rapidapi.com'
    }
  };

  try {
    useEffect(() => {
      (async () => {
        const response = await fetch(url, options)
        const data = await response.json()
        setProductosRopa(data)
      })()
    }, [])
  } catch (error) {
    console.error(error);
  }

  return (
    <ShoppingCartContext.Provider value={{
      count, setCount,
      openProductDetail, closeProductDetail,
      isProductDetailOpen, productToShow,
      setProductToShow, cartProducts,
      setCartProducts, isCheckoutSideMenuOpen,
      openCheckoutSideMenu, closeCheckoutSideMenu,
      order, setOrder,
      items, setItems,
      searchByTitle, setsearchByTitle,
      filtereditems, setfilteredItems,
      searchByCategory, setsearchByCategory,
      account, setAccount, sign_out, setSign_out,
      isOpen, setIsOpen,
      productosRopa
    }}>
      {children}
    </ShoppingCartContext.Provider>
  )
}

