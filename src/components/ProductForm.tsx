import { TProduct, TSearchParams } from "../api/api_pb";
import { useState, useContext, useEffect } from "react";
import { TApiCtx, ApiCtx } from '../api/ApiProvider'
import { Button } from '../components/input'
import * as Styles from '../components/styles'
import { Link } from 'react-router-dom'
import * as CONST from '../settings/constants'
import { ModalCtx, TModalCtx, Modal } from './Modal'


//------------- CONST -------------------------------------------------------------------

//-------- TYPES ---------------------------------------------------------------------------------

export function ProductsTable(
    SearchParams: TSearchParams.AsObject,
    products: TProduct.AsObject[],
    setProducts: React.Dispatch<React.SetStateAction<TProduct.AsObject[]>>
): JSX.Element {
    const apiCtx = useContext(ApiCtx) as TApiCtx
    const mCtx = useContext(ModalCtx) as TModalCtx
    console.log("ProductsTable(): mCtx=", mCtx)
    const [isLoading, setIsLoading] = useState(false)
    const [LoadingError, setLoadingError] = useState('')
    const [ShowMoreBtn, setShowMoreBtn] = useState(true)
    const [SelectedImgIndex, setSelectedImgIndex] = useState<number>(0)
    const btnMore = Button(
        'Ещё',
        () => { update(false) },
        [],
        { className: [Styles.Btn.Green1, Styles.Btn.Size1, 'text-white'].join(' ') }
    )


    useEffect(() => {
        update(true)
    }, [])


    //--------------- PUBLIC ----------------------------------------------------------------------------

    function update(newSearch: boolean) {
        setIsLoading(true)
        setLoadingError('')
        setShowMoreBtn(false)
        if (SearchParams == undefined) {
            setLoadingError('Ошибка загрузки данных: неверный запрос')
            return
        }
        let request = new TSearchParams()
        request.setFilterstr(SearchParams.filterstr)
        request.setLimit(SearchParams.limit)
        request.setMaxprice(SearchParams.maxprice)
        request.setMinprice(SearchParams.minprice)
        request.setShopid(SearchParams.shopid)
        request.setSortby(SearchParams.sortby)
        request.setLatitude(SearchParams.latitude)
        request.setLongitude(SearchParams.longitude)
        request.setRadius(SearchParams.radius)
        if (newSearch) {
            request.setOffset(0)
        } else {
            request.setOffset(products.length)
        }

        apiCtx.guestClient.getProducts(request, null)
            .then((resp) => {
                setShowMoreBtn(true)
                let prods: TProduct.AsObject[] = []
                if (!newSearch) {
                    prods.push(...products)
                }
                prods.push(...resp.toObject().valueList)
                setProducts(prods)
                if (resp.toObject().valueList.length < SearchParams.limit) {
                    setShowMoreBtn(false)
                }
            })
            .catch((err) => {
                setLoadingError('Ошибка загрузки данных: ' + err)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }
    //------------- PRIVATE ----------------------------------------------------------------------

    function productMiniBox(prod: TProduct.AsObject): JSX.Element {
        const OpenModal = (prod: TProduct.AsObject) => {
            mCtx?.setSelectedProduct(prod)
            mCtx?.setIsOpened(true)
            console.log('OpenModal()', mCtx)
        }
        return (
            <div className="inline-table m-1 p-1 w-44 h-72 border-2 rounded-md"
                key={prod.id}>
                <div className="w-full h-64">
                    <Link className="text-sm mb-1" to={`/shop/${prod.shopId}`}>{prod.shopname}</Link>
                    <img
                        className='h-40 w-40 cursor-pointer'
                        src={SrcImageMed(prod.imagesList)}
                        alt=""
                        onClick={() => OpenModal(prod)}
                    />
                    <p className="text-base font-semibold text-center cursor-pointer"
                        onClick={() => OpenModal(prod)}>
                        {prod.name.slice(0, 40)}</p>
                </div>
                <p className='font-bold'>
                    Цена: <span className="text-red-600">{prod.price.toFixed(2)}</span> </p>
            </div>
        );
    }

    function productModal(): JSX.Element {
        const prod = mCtx?.selectedProduct
        function close() { }
        // function closeCallback() {mCtx?.setSelectedProduct(undefined)}

        return (
                <Modal closeCallback={close}>
                    {prod
                        ? <>
                            <p className="text-lg font-semibold">{prod.name}</p>
                            {imageViewer(prod.imagesList)
                            }
                            <p className="">{prod.description1}</p>
                            <p>{prod.description2}</p>
                            <p className='font-bold'>Цена: <span className="text-red-600">{prod.price.toFixed(2)}</span></p>
                        </>
                        : <span>Ошибка. Нет данных.</span>
                    }
                </Modal>
        )
    }

    function imageViewer(images: Array<number>) {
        function ImgCell(image: number, index: number) {
            let img = [CONST.IMAGES_ROOT_DIR, 'min', image.toString()]
            return (
                <img className='m-1 h-16 w-16 block cursor-pointer'
                    key={'ImgCell_min' + image}
                    onClick={() => { setSelectedImgIndex(index) }}
                    src={img.join("/")}
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
                                {(images.length == 0 || SelectedImgIndex < 0)
                                    ? <img className='m-2 h-80 w-80 ' src={CONST.NO_IMAGE_MAX} alt="" />
                                    : <img className='m-2 h-80 w-80 ' src={CONST.IMAGES_ROOT_DIR + 'max/' + images[SelectedImgIndex]} alt="" />
                                }
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }

    //------------- return ----------------------------------------------------------------------
    return (
            <div className="w-full m-2 ">
                {products.map((product) => { return productMiniBox(product) })}
                {isLoading && <p>Поиск товаров...</p>}
                {(LoadingError != '') && <p>{LoadingError}</p>}
                {(!isLoading && products.length == 0) && <p>Товары не найдены</p>}
                {(mCtx && mCtx.isOpened) && productModal()}
                <br />
                {(ShowMoreBtn && !isLoading) && btnMore.render()}
            </div>
    )
}




function SrcImageMed(images: Array<number>) {
    if (images.length == 0) { //нет фото
        return CONST.IMAGES_ROOT_DIR + CONST.NO_IMAGE_MED
    }
    return CONST.IMAGES_ROOT_DIR + 'med/' + images[0]
}
