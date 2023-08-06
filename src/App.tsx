import { MainPage } from "./pages/MainPage";
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import { ApiProvider } from './api/ApiProvider'
import { Layout } from './components/Layout'
import { ShopPage } from './pages/ShopPage'
import { ProductSearchProvider } from './components/SearchProvider'



//----------- Переменные, константы ------------------------------------------------------
const SHOP_PAGE_ALIAS = "shopPage"
const MAIN_PAGE_ALIAS = "mainPage"


function App() {


  return (
    <div className='w-full flex justify-center'>
      <div className='w-4/5'>
        <Router />
      </div>
    </div>
  );
}

function Router() {
  const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Layout />} >
      <Route index element={
        <ProductSearchProvider localStorageName={MAIN_PAGE_ALIAS}>
          <MainPage />
        </ProductSearchProvider>
      } />
      <Route path='shop/:shopid' element={
        <ProductSearchProvider localStorageName={SHOP_PAGE_ALIAS}>          
          <ShopPage />
        </ProductSearchProvider>
      } />
    </Route >
  ))
  return (
    <>
      <ApiProvider>
        <RouterProvider router={router} />
      </ApiProvider>
    </>
  )
}




export default App;

