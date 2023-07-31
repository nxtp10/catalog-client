
import { useState, createContext, useContext } from 'react'
import { TProduct } from "../api/api_pb";


export type TModalCtx = {
  selectedProduct: TProduct.AsObject | undefined
  setSelectedProduct: React.Dispatch<React.SetStateAction<TProduct.AsObject | undefined>>
  isOpened: boolean
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>
}
export const ModalCtx = createContext<TModalCtx | undefined>(undefined)

export function ModalProvider({ children }: any) {
  const [selectedProduct, setSelectedProduct] = useState<TProduct.AsObject | undefined>(undefined)
  const [isOpened, setIsOpened] = useState(false)
  return (
    <ModalCtx.Provider value={{ selectedProduct, setSelectedProduct, isOpened, setIsOpened }}>
      {children}
    </ModalCtx.Provider>
  )
}

export function Modal({ children }: any) {
  const mCtx = useContext(ModalCtx) as TModalCtx
  return (
    <>
      <div className='fixed bg-black/50 top-0 bottom-0 right-0 left-0 flex justify-center'>
        <div className='m-2 overflow-y-auto min-h-min rounded-md bg-white' style={{ maxWidth: '80%', height: 'min-content' }} >
          <div className="bg-gray-500 h-10 p-1 rounded-t-md  ">
            <input className='p-1 text-white rounded-md cursor-pointer font-bold'
              type="button"
              value="X"
              onClick={() => { mCtx.setIsOpened(false); mCtx.setSelectedProduct(undefined) }}
            />
          </div>
          <div className="px-5 py-2">
            {children}
          </div>
        </div>
      </div>
    </>
  )
}