import { useState, useEffect, useContext } from "react";
import { ProductsTable } from '../components/ProductForm'
import { TSearchParams, TProduct, TShop } from "../api/api_pb";
import { ShopMap } from '../components/Map'
import { SearchForm } from '../components/SearchForm'
import { ApiCtx, TApiCtx } from '../api/ApiProvider'
import { useParams } from "react-router-dom";
import { Int32Value } from "google-protobuf/google/protobuf/wrappers_pb";
import * as CONST from '../settings/constants'
import { ModalProvider } from '../components/Modal'



export function ShopPage() {
    const apiCtx = useContext(ApiCtx) as TApiCtx
    const { shopid: shop_id } = useParams()
    const [Shop, setShop] = useState<TShop.AsObject>()
    const [ShowMap, setShowMap] = useState(true)
    const [Error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [SearchParams, setSearchParams] = useState<TSearchParams.AsObject>(CONST.DEFAULT_SEARCH_PARAMS)
    const [products, setProducts] = useState<TProduct.AsObject[]>([])
    const productsTable = ProductsTable(SearchParams, products, setProducts)
 /*   const searchForm = SearchForm(
        SearchParams,
        setSearchParams,
        () => { },     //TODO: обновление таблицы
        () => { setShowMap(!ShowMap) },
        {
            FindButtonPostfix: `в этом магазине`,
            Radius: false,
            MapBtn: true,
            PriceRange: true
        }
    )*/



    //------------- useEffect --------------------------------------------------
    useEffect(() => {
        if (shop_id && Number(shop_id) != NaN && Number(shop_id) > 0) {
            setIsLoading(true)
            const req = new Int32Value()
            req.setValue(Number(shop_id))
            apiCtx.guestClient.getShopById(req, null)
                .then((resp) => {
                    const sh = resp.toObject()
                    setShop(sh)
                    setSearchParams({
                        ...SearchParams,
                        shopid: sh.id,
                        latitude: sh.location?.lat || CONST.DEFAUFT_LOCATION.lat,
                        longitude: sh.location?.lng || CONST.DEFAUFT_LOCATION.lng,
                    })
                })
                .catch((err) => {
                    setError('Ошибка открытия страницы')
                })
                .finally(() => {
                    setIsLoading(false)
                })
        }
    }, [shop_id])

    useEffect(() => {
        if (SearchParams.shopid > 0) {
            //TODO: обновление таблицы
        }
    }, [SearchParams.shopid])


    //------------- RETURN --------------------------------------------------
    return (
        <>
            {isLoading && <p>Загрузка данных...</p>}
            {Error && <p>{Error}</p>}
            {(Shop && !isLoading && Error == '') &&
                <>
                    <table className="w-full">
                        <tbody>
                            <tr>
                                <td className="w-1/5"></td>
                                <td className=""><h2 className="font-semibold text-4xl text-center m-5">{Shop.name}</h2></td>
                                <td className="w-1/3">
                                    <p className="m-2 text-lg">
                                        <span className="font-semibold">Адрес: </span>
                                        {[Shop.address].join(', ')}
                                    </p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    {//searchForm
                    }
                    {(ShowMap) && <ShopMap mapContainerName="map-container"
                        className="p-2 w-full h-96"
                        Shop={Shop} />
                    }
                {productsTable}
                </>
            }
        </>
    )
}