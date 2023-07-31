
import { useState, useEffect, useContext } from "react";
import { ProductsTable } from '../components/ProductForm'
import { TSearchParams, TProduct, TShop } from "../api/api_pb";
import { MainMap } from '../components/Map'
import { ModalProvider } from '../components/Modal'
import { SearchForm } from '../components/SearchForm'
import { ApiCtx, TApiCtx } from '../api/ApiProvider'
import * as CONST from '../settings/constants'



export function MainPage(): JSX.Element {
    let initOK = false
    const apiCtx = useContext(ApiCtx) as TApiCtx
    const [ShowMap, setShowMap] = useState(true)
    const [SearchParams, setSearchParams] = useState<TSearchParams.AsObject>(CONST.DEFAULT_SEARCH_PARAMS)
    const [products, setProducts] = useState<TProduct.AsObject[]>([])
    const [Shops, setShops] = useState<TShop.AsObject[]>([])
    const productsTable = ProductsTable(SearchParams, products, setProducts)
    // const map = Map('MainPageMap','map-container','m-2 p-2 w-full h-96',SearchParams,true)
    const searchForm = SearchForm(
        SearchParams,
        setSearchParams,
        () => {
            setProducts([])
            //TODO: обновить таблицу
            updateShops()
            WriteSearchParamsToLocalStorage(SearchParams)
        },
        () => { setShowMap(!ShowMap) },
        {
            FindButtonPostfix: '',
            Radius: true,
            MapBtn: true,
            PriceRange: true
        }
    )

    useEffect(() => {
        if (initOK) {
            //TODO: обновить таблицу
            WriteSearchParamsToLocalStorage(SearchParams)
        }
    }, [SearchParams.latitude, SearchParams.longitude])

    useEffect(() => {
        //TODO: обновить таблицу
        updateShops()
        setSearchParams(GetSearchParamsFromLocalStorage())
        initOK = true
    }, [])

    //------------- FUNC --------------------------------------------------

    function updateShops() {
        //console.log('MainPage(): updateShops(): ',)
        if (SearchParams == undefined) {
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

        apiCtx.guestClient.getShopsBySearchParams(request, null)
            .then((resp) => {
                setShops(resp.toObject().valueList)
            })
            .catch(() => { })
    }
    
    function GetSearchParamsFromLocalStorage(): TSearchParams.AsObject {
        let LStorageSearchParams = localStorage.getItem('SearchParams')
        if (LStorageSearchParams == null || LStorageSearchParams == '') {
            console.log("GetSearchParamsFromLocalStorage(): (LStorageSearchParams == null || LStorageSearchParams == '')")
            return CONST.DEFAULT_SEARCH_PARAMS
        }
        let params = JSON.parse(LStorageSearchParams) as TSearchParams.AsObject
        if (params == undefined) {
            console.log("GetSearchParamsFromLocalStorage(): (params == undefined)")
            return CONST.DEFAULT_SEARCH_PARAMS
        }
        console.log("GetSearchParamsFromLocalStorage(): params: ", params)
        return params
    }
    function WriteSearchParamsToLocalStorage(params: TSearchParams.AsObject) {
        //console.log('WriteSearchParamsToLocalStorage')
        const p: TSearchParams.AsObject = { ...params, filterstr: '', shopid: 0, minprice: 0, maxprice: 0 }
        localStorage.setItem('SearchParams', JSON.stringify(p))
    }


    //--------------- RETURN ---------------------------------------------
    return (
        <>
            {searchForm}
            {ShowMap && <MainMap LocalStorageKey="MainPageMap"
                mapContainerName="map-container"
                className="p-2 w-full h-96"
                searchParams={SearchParams}
                setSearchParams={setSearchParams}
                products={products}
                Shops={Shops} />
            }
            {ProductsTable(SearchParams, products, setProducts)}
        </>
    )
}

