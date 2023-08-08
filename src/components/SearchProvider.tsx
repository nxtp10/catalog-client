import { createContext, useContext, useEffect, useState } from 'react';
import { TSearchParams, TProduct, TShop } from "../api/api_pb";
import { ApiCtx, TApiCtx } from '../api/ApiProvider'
import * as config from '../settings/config'
import { Int32Value } from "google-protobuf/google/protobuf/wrappers_pb";



//----------- Переменные, константы ------------------------------------------------------
export const ProductSearchCtx = createContext<TProductSearchCtx | undefined>(undefined)

export const DEFAULT_MAP_CONFIG: TMapConfig = { Zoom: 8, Display: true }
const SEARCH_PARAMS_ALIAS = "SearchParams"
const MAP_CONFIG_ALIAS = "mapConfig"

const SEARCH_ERROR = "Ошибка получения данных с сервера"





//------------ Структуры -----------------------------------------------------------------
export type TProductSearchCtx = {
    searchParams: TSearchParams.AsObject | undefined
    setSearchParams: React.Dispatch<React.SetStateAction<TSearchParams.AsObject | undefined>>
    products: TProduct.AsObject[]
    mapConfig: TMapConfig | undefined
    setMapConfig: React.Dispatch<React.SetStateAction<TMapConfig | undefined>>
    isLoading: boolean
    err: string
    findMoreProducts: () => void
    endOfData: boolean
    shop: TShop.AsObject | undefined
    findShop: (shop_id: number) => void
}
type TMapConfig = {
    Zoom: number
    Display: boolean
}


export function ProductSearchProvider({ children, localStorageName }: any): JSX.Element {
    const [searchParams, setSearchParams] = useState<TSearchParams.AsObject | undefined>(undefined)//параметры запроса для поиска
    const [products, setProducts] = useState<TProduct.AsObject[]>([])               //товары
    const [mapConfig, setMapConfig] = useState<TMapConfig | undefined>(undefined)   //конфиг для карты
    const [init, setInit] = useState<boolean>(false)                                //флаг завершения инициализации провайдера
    const [isLoading, setIsLoading] = useState(false)                               //флаг "идет загрузка"
    const [err, setErr] = useState<string>('')                                      //текст ошибки
    const [endOfData, setEndOfData] = useState(true)                                //флаг конец данных в выборке
    const [shop, setShop] = useState<TShop.AsObject | undefined>(undefined)         //информация по магазину
    const [oldLSSearchParams, setOldLSSearchParams] = useState<TSearchParams.AsObject | undefined>()//предыдущие параметры запроса для поиска

    const api = useContext(ApiCtx) as TApiCtx


    //--- useEffect -----------------------------------------------------------------

    //инициализация провайдера
    useEffect(() => {
        setSearchParams(GetSearchParamsFromLocalStorage(localStorageName + '_' + SEARCH_PARAMS_ALIAS))
        setMapConfig(GetMapConfigFromLocalStorage(localStorageName + '_' + MAP_CONFIG_ALIAS))
        setTimeout(() => {
            setInit(true)
        }, 200);
    }, [])
    //обновляет товары после инициализации
    useEffect(() => {
        if (init) {
            findProducts(false)
        }
    }, [init])
    //обновляет товары и сохраняет настройки в LocalStorage при изменении searchParams и после инициализации
    useEffect(() => {
        if (init) {
            findProducts(false)
            saveSettings()
        }
    }, [searchParams])

    //--------------------------------------------------------------------

    if (!searchParams) {
        return <></>
    }

    //--- поиск -----------------------------------------------------------------
    //поиск товаров, add=true - добавляет товары к имеющимся
    function findProducts(add: boolean) {
        if (!searchParams) {
            return
        }
        if (isLoading) {
            return
        }
        setIsLoading(true)
        setErr('')
        if (!add) {
            setEndOfData(false)
        }
        let request = new TSearchParams()
        request.setFilterstr(searchParams.filterstr)
        request.setMaxprice(searchParams.maxprice)
        request.setMinprice(searchParams.minprice)
        request.setShopid(searchParams.shopid)
        request.setSortby(searchParams.sortby)
        request.setLatitude(searchParams.latitude)
        request.setLongitude(searchParams.longitude)
        request.setRadius(searchParams.radius)
        request.setLimit(searchParams.limit)
        if (add) {//задаём отступ поиска товаров
            request.setOffset(searchParams.offset + products.length)
        } else {
            request.setOffset(searchParams.offset)
        }

        api.guestClient.getProducts(request,null)
            .then((resp) => {
                let p = resp.toObject().valueList
                if (p.length < request.getLimit()) {
                    setEndOfData(true)
                }
                if (add) {
                    p = [...products, ...p]
                }
                setProducts(p)
            })
            .catch(() => {
                setErr(SEARCH_ERROR)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }
    //найти информацию по магазину
    function findShop(shop_id: number) {
        if (shop_id > 0) {
            const req = new Int32Value()
            req.setValue(shop_id)
            api.guestClient.getShopById(req, null)
                .then((resp) => {
                    const sh = resp.toObject()
                    if (sh && sh.location) {
                        setShop(sh)
                        if (searchParams) {
                            setSearchParams({
                                ...searchParams,
                                shopid: sh.id,
                                latitude: sh.location.lat,
                                longitude: sh.location.lng,
                            })
                        }
                    }
                })
                .catch((err) => {

                })
                .finally(() => {

                })
        }
    }
    //дополнить список товаров
    function findMoreProducts() {
        findProducts(true)
        saveSettings()
    }

    //------------ LocalStorage ----------------------------------------------------------------------

    //чтение SearchParams из LocalStorage
    function GetSearchParamsFromLocalStorage(localStorageKey: string): TSearchParams.AsObject {
        let LStorageSearchParams = localStorage.getItem(localStorageKey)
        if (!LStorageSearchParams || LStorageSearchParams === '') {
            return config.DEFAULT_SEARCH_PARAMS
        }
        let params = JSON.parse(LStorageSearchParams) as TSearchParams.AsObject
        if (!params) {
            return config.DEFAULT_SEARCH_PARAMS
        }
        return params
    }
    //чтение MapConfig из LocalStorage
    function GetMapConfigFromLocalStorage(localStorageKey: string): TMapConfig {
        let LStorageSearchParams = localStorage.getItem(localStorageKey)
        if (!LStorageSearchParams || LStorageSearchParams === '') {
            return DEFAULT_MAP_CONFIG
        }
        let params = JSON.parse(LStorageSearchParams) as TMapConfig
        if (!params) {
            return DEFAULT_MAP_CONFIG
        }
        return params
    }
    //сохранить настройки в LocalStorage
    function saveSettings() {
        WriteSearchParamsToLocalStorage(localStorageName + '_' + SEARCH_PARAMS_ALIAS, searchParams)
        WriteMapConfigToLocalStorage(localStorageName + "_" + MAP_CONFIG_ALIAS, mapConfig)
    }
    //сохранение SearchParams в LocalStorage
    function WriteSearchParamsToLocalStorage(localStorageKey: string, params: TSearchParams.AsObject | undefined) {
        if (!params) {
            return
        }
        const p = { ...params }
        p.filterstr = ""
        p.shopid = 0
        p.offset = 0
        p.minprice = 0
        p.maxprice = 0
        if (!oldLSSearchParams ||
            oldLSSearchParams.limit !== p.limit ||
            oldLSSearchParams.latitude !== p.latitude ||
            oldLSSearchParams.longitude !== p.longitude ||
            oldLSSearchParams.radius !== p.radius ||
            oldLSSearchParams.sortby !== p.sortby
        ) {
            localStorage.setItem(localStorageKey, JSON.stringify(p))
            setOldLSSearchParams({ ...p })
        }
    }

    //сохранение MapConfig в LocalStorage
    function WriteMapConfigToLocalStorage(localStorageKey: string, params: TMapConfig | undefined) {
        if (!params) {
            return
        }
        localStorage.setItem(localStorageKey, JSON.stringify(params))
    }

    //----------------------------------------------------------------------------------

    return (
        <ProductSearchCtx.Provider
            value={{
                searchParams,
                setSearchParams,
                products,
                mapConfig,
                setMapConfig,
                isLoading,
                err,
                findMoreProducts,
                endOfData,
                shop,
                findShop
            }}
        >
            {children}
        </ProductSearchCtx.Provider>
    )

}



