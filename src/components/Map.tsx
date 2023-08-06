import DG from "2gis-maps";
import { useState, useEffect, useContext, } from "react";
import { TSearchParams, TShop, TLocation } from "../api/api_pb";
import { ProductSearchCtx, TProductSearchCtx, DEFAULT_MAP_CONFIG } from './SearchProvider'
import jsxToString from 'jsx-to-string';
import * as CONST from '../settings/constants'
import { ApiCtx, TApiCtx } from '../api/ApiProvider'

//------------- CONST -------------------------------------------------------------------
export const MAP_TYPE_MAIN = "map_type_main"
export const MAP_TYPE_SHOP = "map_type_shop"


export function Map(mapContainerName: string, mapType: string, shop_id: number | undefined): JSX.Element {
    //------------- VARS -------------------------------------------------------------------
    const ctx = useContext(ProductSearchCtx) as TProductSearchCtx
    const api = useContext(ApiCtx) as TApiCtx
    const [shops, setShops] = useState<TShop.AsObject[]>([])
    const [init, setInit] = useState(false)
    const [circle, setCircle] = useState(DG.circle(CONST.DEFAUFT_LOCATION, {
        color: '#708fff',
        fillColor: '#708fff',
        fillOpacity: 0.15,
    }))     //окружность на карте, радиус поиска
    const [Group, setGroup] = useState(DG.featureGroup([]))     //группа элементов на карте
    const [map, setMap] = useState<any>(undefined)  //экземпляр карты
    const [oldSearchParams, setOldSearchParams] = useState<TSearchParams.AsObject | undefined>(ctx.searchParams)
    const [latlng, setLatlng] = useState<{ lat: number, lng: number } | undefined>(undefined)       //промежуточная переменная локации
    const [zoom, setZoom] = useState<number | undefined>(undefined)     //промежуточная переменная зум карты


    //----------- useEffect -----------------------------------------------------------
    //инициализация карты
    useEffect(() => {
        setVisibility()
        if (!map && ctx.mapConfig?.Display) {
            setMap(DG.map(mapContainerName, {
                zoom: ctx.mapConfig.Zoom,
                doubleClickZoom: false,
            }));
        }
    }, [ctx.mapConfig])

    useEffect(() => {
        if (map && !init && ctx.searchParams) {
            switch (mapType) {
                case MAP_TYPE_MAIN:
                    InitMainMap()
                    break;
                case MAP_TYPE_SHOP:
                    if (ctx.shop) {   //магазин уже найден. инициализируем карту    
                        InitShopMap()
                    } else if (!init && shop_id !== undefined && shop_id > 0) {
                        ctx.findShop(shop_id)
                    }
                    break;
            }
        }
    }, [map, ctx.searchParams])
    //показать/скрыть карту
    useEffect(() => {
        if (init) {
            setVisibility()

            if (ctx.mapConfig &&
                ctx.mapConfig.Display &&
                ctx.searchParams &&
                mapType === MAP_TYPE_MAIN
            ) {
                updateShops(ctx.searchParams)
            }
        }
    }, [ctx.mapConfig, init])

    //обновить маркеры
    useEffect(() => {
        if (mapType === MAP_TYPE_MAIN && init && ctx.mapConfig?.Display) {
            updateMarkers(shops)
        }
    }, [shops])

    //магазин найден, продолжаем инициализировать ShopPage карту
    useEffect(() => {
        if (!init &&
            map &&
            ctx.shop &&
            mapType === MAP_TYPE_SHOP
        ) {
            InitShopMap()
        }
    }, [ctx.shop])

    useEffect(() => {
        if (!ctx.searchParams || !ctx.mapConfig) {
            return
        }
        switch (true) {
            case
                oldSearchParams?.latitude !== ctx.searchParams.latitude ||
                oldSearchParams?.longitude !== ctx.searchParams.longitude ||
                oldSearchParams?.radius !== ctx.searchParams.radius
                :
                if (mapType === MAP_TYPE_MAIN) {
                    circle.setLatLng([ctx.searchParams.latitude, ctx.searchParams.longitude]);
                    circle.setRadius(ctx.searchParams.radius * 1000)
                    if (init && ctx.mapConfig.Display) {
                        updateShops(ctx.searchParams)
                    }
                }
                break;
            case
                oldSearchParams?.filterstr !== ctx.searchParams.filterstr ||
                oldSearchParams?.maxprice !== ctx.searchParams.maxprice ||
                oldSearchParams?.minprice !== ctx.searchParams.minprice
                :
                if (init && ctx.mapConfig.Display && mapType === MAP_TYPE_MAIN) {
                    updateShops(ctx.searchParams)
                }
                break;
            default:
                break;
        }
        setOldSearchParams(ctx.searchParams)

    }, [ctx.searchParams, ctx.mapConfig])

    useEffect(() => {
        if (!ctx.searchParams || !latlng) {
            return
        }
        if (ctx.searchParams.latitude !== latlng.lat || ctx.searchParams.longitude !== latlng.lng) {
            ctx.setSearchParams({ ...ctx.searchParams, latitude: latlng.lat, longitude: latlng.lng })
        }
    }, [latlng])

    useEffect(() => {
        if (zoom) {
            if (ctx.mapConfig) {
                ctx.setMapConfig({ ...ctx.mapConfig, Zoom: zoom })
            } else (
                ctx.setMapConfig({ Display: true, Zoom: zoom })
            )
        }
    }, [zoom])

    // ---------------------------------------------------------------------------

    //проверка корректности входных данных
    if (!ctx) {//если ctx не инициализирован, то выходим
        return <></>
    }
    //---------- INIT MAP -------------------------------------------------------------------------
    function InitMainMap() {
        if (!map || !ctx.searchParams || !ctx.mapConfig) {
            return
        }
        let dblClickBlocking = false //при одном событии dblclick дважды запускается функция-обработчик
                                    //используем блокировку для игнорирования повторного вызова функции
        map.setView([ctx.searchParams.latitude, ctx.searchParams.longitude], ctx.mapConfig.Zoom)
        map.on('dblclick',
            (e: any) => {
                if (!dblClickBlocking) {
                    dblClickBlocking = true
                    circle.setLatLng(e.latlng);
                    setLatlng(e.latlng)
                    setTimeout(() => { dblClickBlocking = false }, 300)
                }
            });
        map.on('zoomend', () => { setZoom(map.getZoom()) });
        circle.setLatLng([ctx.searchParams.latitude, ctx.searchParams.longitude]);
        circle.setRadius(ctx.searchParams.radius * 1000)
        circle.addTo(map);
        Group.addTo(map);
        setInit(true);
    }

    function InitShopMap() {
        if (!map || !ctx.shop?.location || !ctx.shop.location || !ctx.mapConfig) {
            return
        }
        map.setView(ctx.shop.location, ctx.mapConfig.Zoom);
        map.on('zoomend',
            () => {
                setZoom(map.getZoom())
            });
        const name = <span className="text-lg font-semibold">{ctx.shop.name}</span>
        const content =
            <span className="text-base">
                {(ctx.shop.address !== '') &&
                    `Адрес: ${ctx.shop.address}`
                }
            </span>;
        const popup = DG.popup();
        popup.setHeaderContent(jsxToString(name));
        popup.setContent(jsxToString(content));
        const marker = DG.marker(ctx.shop.location);
        marker.bindPopup(popup);
        marker.addTo(map);

        setInit(true)
    }
    //-----------------------------------------------------------------------------------

    //обновляет магазины отображаемые на карте
    function updateShops(searchParams: TSearchParams.AsObject) {

        let request = new TSearchParams()
        request.setFilterstr(searchParams.filterstr)
        request.setLimit(searchParams.limit)
        request.setMaxprice(searchParams.maxprice)
        request.setMinprice(searchParams.minprice)
        request.setShopid(searchParams.shopid)
        request.setSortby(searchParams.sortby)
        request.setLatitude(searchParams.latitude)
        request.setLongitude(searchParams.longitude)
        request.setRadius(searchParams.radius)

        api.guestClient.getShopsBySearchParams(request, null)
            .then((resp) => {
                setShops(resp.toObject().valueList)
            })
            .catch((err) => {
            })
    }
    //обновляет маркеры магазинов на карте
    function updateMarkers(shops: TShop.AsObject[]) {
        console.log("updateMarkers")
        Group.clearLayers()
        shops.map((shop, i) => {
            const shopLink = `<a  style="color:white;font-weight: 600; " href="/shop/${shop.id}" >${shop.name}</a>`
            const popup = DG.
                popup({ maxWidth: 500, minWidth: 300, maxHeight: 280 }).
                setHeaderContent(shopLink)
                ;
            const marker = DG.marker([shop.location?.lat, shop.location?.lng])
            marker.bindPopup(popup);
            marker.bindLabel(shop.name);
            marker.on('popupopen',
                (e: any) => {
                    if (ctx.searchParams) {
                        SetPopupProductsTable(popup, shop.id, ctx.searchParams)
                    }
                });
            Group.addLayer(marker);
        })
    }
    //устанавливает попапы для маркеров
    function SetPopupProductsTable(popup: any, shop_id: number, searchParams: TSearchParams.AsObject) {
        if (!searchParams) {
            return //'Товары не найдены'
        }
        let request = new TSearchParams()
        request.setShopid(shop_id)
        request.setFilterstr(searchParams.filterstr)
        request.setLimit(500)
        request.setMaxprice(searchParams.maxprice)
        request.setMinprice(searchParams.minprice)
        request.setSortby(searchParams.sortby)

        popup.setContent('Поиск товаров...')

        api.guestClient.getProducts(request, null)
            .then((resp) => {
                const products = resp.toObject().valueList
                const table =
                    <table>
                        <thead>
                            <tr>
                                <td><b>Наименование</b></td>
                                <td><b>Цена</b></td>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => {
                                return (
                                    <tr key={product.id}>
                                        <td>{product.name}</td>
                                        <td>{product.price.toFixed(2)}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                popup.setContent(jsxToString(table))
            })
            .catch((err) => {
                popup.setContent('Ошибка загрузки данных.')
            })

        return
    }
    //устанавливает видимость контейнера карты
    function setVisibility() {
        if (!ctx.mapConfig) {
            return
        }
        const e = document.getElementById(mapContainerName)
        if (e) {
            if (ctx.mapConfig.Display) {
                e.style.display = "block"
            } else {
                e.style.display = "none"
            }
        }
    }
    return <></>
}


export function EditShopMap(
    mapContainerName: string,
    className: string,
    Location: TLocation.AsObject,
    setLocation: React.Dispatch<React.SetStateAction<TLocation.AsObject>>): JSX.Element {
    //------------- VARS -------------------------------------------------------------------
    const [map, setMap] = useState<any>()
    const [Marker, setMarker] = useState(DG.marker([0, 0]))

    //------------- useEffect -----------------------------------------------------------
    useEffect(() => {
        setMap(DG.map(mapContainerName, {
            zoom: DEFAULT_MAP_CONFIG.Zoom,
            doubleClickZoom: false
        }));
    }, [])
    useEffect(() => {
        if (map) {
            InitMap()
        }
    }, [map, Location])


    //---------- FUNC -------------------------------------------------------------------------
    function InitMap() {
        const popup = DG.popup().setContent('Укажите местоположение магазина');
        Marker.setLatLng(Location)
        Marker.bindPopup(popup).addTo(map)
        map.setView(Location, undefined)
        map.on('dblclick',
            (e: any) => {
                Marker.setLatLng(e.latlng)
                setLocation(e.latlng)
            });
    }

    return (
        <></>
    )
}
