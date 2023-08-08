import { TProduct } from "../api/api_pb";
import { useContext, useState } from "react";
import { Link } from 'react-router-dom'
import * as config from '../settings/config'
import { ProductSearchCtx, TProductSearchCtx } from './SearchProvider'
import * as Styles from './styles'

//------------ Функции -------------------------------------------------------------------

export function ProductsTable(): JSX.Element {

    const ctx = useContext(ProductSearchCtx) as TProductSearchCtx
    const [selectedProduct, setSelectedProduct] = useState<TProduct.AsObject | undefined>(undefined)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedImgIndex, setSelectedImgIndex] = useState<number>(0)


    function productMiniBox(prod: TProduct.AsObject, index: number): JSX.Element {

        return (
            <div className="inline-table m-1 p-1 w-44 h-72 border-2 rounded-md"
                key={'product_' + index}>
                <div className="w-full h-64">
                    <Link className="text-sm mb-1" to={`/shop/${prod.shopId}`}>{prod.shopname.substring(0,20)}</Link>
                    <img
                        className='h-40 w-40 cursor-pointer'
                        src={urlImageMed(prod.imagesList, 0)}
                        alt=""
                        onClick={() => { openModal(prod) }}
                    />
                    <p className="text-base font-semibold text-center cursor-pointer"
                        onClick={() => { openModal(prod) }}>
                        {prod.name.substring(0, 50)}</p>
                </div>
                <p className='font-bold'>
                    Цена: <span className="text-red-600">{prod.price.toFixed(2)}</span> </p>
            </div>
        );
    }

    //---- модальное окно -----------------------------
    function ProductModal(): JSX.Element {
        return (
            <Modal closeCallback={closeModal}>
                <>
                    {selectedProduct
                        ? <>
                            <p className="text-lg font-semibold">{selectedProduct.name}</p>
                            {imageViewer(selectedProduct.imagesList)
                            }
                            <p className="">{selectedProduct.description1}</p>
                            <p>{selectedProduct.description2}</p>
                            <p className='font-bold'>Цена: <span className="text-red-600">{selectedProduct.price.toFixed(2)}</span></p>
                        </>
                        : <span>Ошибка. Нет данных.</span>
                    }
                </>
            </Modal>
        )
    }
    function Modal({ children, closeCallback }: any) {
        return (
            <>
                <div className='fixed bg-black/50 top-0 bottom-0 right-0 left-0 flex justify-center'
                    onClick={() => { }}
                >
                    <div className='m-2 overflow-y-auto min-h-min rounded-md bg-white'
                        style={{ maxWidth: '80%', height: 'min-content' }}
                        onClick={() => { }}
                    >
                        <div className="bg-gray-500 h-10 p-1 rounded-t-md  ">
                            <input className='p-1 text-white rounded-md cursor-pointer font-bold'
                                type="button"
                                value="X"
                                onClick={closeCallback}
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
    function imageViewer(images: Array<number>) {
        function ImgCell(image: number, index: number) {
            return (
                <img className='m-1 h-16 w-16 block cursor-pointer'
                    key={'ImgCell_min' + image}
                    onClick={() => { setSelectedImgIndex(index) }}
                    src={urlImageMin(images, index)}
                    alt="" />
            )
        }

        return (
            <div className="">
                <table>
                    <tbody className="">
                        <tr className="h-80 ">
                            <td className="">
                                <div className="overflow-y-auto">
                                    {(images.length > 1) &&
                                        images.map((img, i) => {
                                            return ImgCell(img, i)
                                        })
                                    }
                                </div>
                            </td>
                            <td>
                                {<img className='m-2 h-80 w-80 ' src={urlImageMax(images, selectedImgIndex)} alt="" />}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
    function closeModal() {
        setIsModalOpen(false);
        setSelectedProduct(undefined)
    }
    function openModal(prod: TProduct.AsObject) {
        setSelectedProduct(prod);
        setIsModalOpen(true)
    }

    return (
        <div className="w-full m-2 ">
            {(ctx.isLoading) && <p>Поиск товаров...</p>}
            {(!ctx.isLoading && ctx.products.length === 0 && ctx.err === '') &&
                <p>Найдено 0 товаров</p>
            }
            {(ctx.err === '') && <p>{ctx.err}</p>}
            {(ctx.products.length > 0 && ctx.err === '') &&
                ctx.products.map((product, i) => { return productMiniBox(product, i) })}
            {isModalOpen && ProductModal()}
            {(!ctx.endOfData && !ctx.isLoading && ctx.products.length > 0) &&
                <button
                    onClick={ctx.findMoreProducts}
                    className={[Styles.Btn.Green1, Styles.Btn.Size1, 'text-white', 'block'].join(' ')}
                >Ещё</button>

            }
        </div>
    )
}


//----- url для изображений ---------------------------------
function urlImageMin(images: Array<number>, index: number): string {
    if (images.length === 0 || index > images.length - 1) { //нет фото
        return config.NO_IMAGE_MIN
    }
    return config.IMAGES_MIN_DIR + images[index]
}
function urlImageMed(images: Array<number>, index: number): string {
    if (images.length === 0 || index > images.length - 1) { //нет фото
        return config.NO_IMAGE_MED
    }
    return config.IMAGES_MED_DIR + images[index]
}
function urlImageMax(images: Array<number>, index: number): string {
    if (images.length === 0 || index > images.length - 1) { //нет фото
        return config.NO_IMAGE_MAX
    }
    return config.IMAGES_MAX_DIR + images[index]
}
