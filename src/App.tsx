import { MainPage } from "./pages/MainPage";
import { Route, Routes, createBrowserRouter, createRoutesFromElements, RouterProvider, matchPath } from 'react-router-dom'
import { ApiProvider } from './api/ApiProvider'
import { Layout } from './components/Layout'
import { ShopPage } from './pages/ShopPage'
import { Contacts } from './components/contacts'
import { About } from './components/about'
import { ModalProvider } from './components/Modal'





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
  //<Route path='login' element={<LoginForm />} />
  //<Route path='registration' element={<RegForm />} />
  //<Route path='UserAccount/*' element={<RequireAuth><UserAccount /></RequireAuth>} />
  // <AuthProvider>
  //   <AcountConfigProvider>
  //   </AcountConfigProvider>
  // </AuthProvider>
  const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Layout />} >
      <Route index element={
        <ModalProvider>
          <MainPage />
        </ModalProvider>
      } />
      <Route path='shop/:shopid' element={
        <ModalProvider>
          <ShopPage />
        </ModalProvider>
      } />
      <Route path='contacts' element={<Contacts />} />
      <Route path='about' element={<About />} />
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

