import {  useEffect, useContext } from "react";
import { ProductsTable } from '../components/ProductTable'
import { Map,  MAP_TYPE_SHOP } from '../components/Map'
import { SearchForm } from '../components/SearchForm'
import { ShopTitle } from '../components/ShopTitle'
import { useParams } from "react-router-dom";
import { ProductSearchCtx, TProductSearchCtx } from '../components/SearchProvider'



const MAP_CONTAINER = "map-shop-container"


export function ShopPage() {
    const { shopid: shop_id } = useParams()
    const ctx = useContext(ProductSearchCtx) as TProductSearchCtx

    //------------- useEffect --------------------------------------------------
    useEffect(() => {
        const id = Number(shop_id)
        if (id && id > 0) {
            ctx.findShop(id)
        }
    }, [])

    //------------- RETURN --------------------------------------------------
    return (
        <>
            {ShopTitle(ctx.shop)}
            {SearchForm(false)}
            <div className="m-2">
                <div id={MAP_CONTAINER} className="p-2 w-full h-96 " >
                </div>
            </div>
            {Map(MAP_CONTAINER, MAP_TYPE_SHOP, Number(shop_id))}
            {ProductsTable()}
        </>
    )
}