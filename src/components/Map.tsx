import DG from "2gis-maps";
import { useState, useEffect, useContext, } from "react";
import { TSearchParams, TProduct, TShop, TLocation } from "../api/api_pb";
import { ApiCtx, TApiCtx } from '../api/ApiProvider'
import jsxToString from 'jsx-to-string';
import * as CONST from '../settings/constants'

//------------- CONST -------------------------------------------------------------------
const DEFAULT_MAP_CONFIG: TMapConfig = { Location: CONST.DEFAUFT_LOCATION, CircleRadius: 0, Zoom: 8 }

//-------- TYPES ---------------------------------------------------------------------------------
type TMapResult = {
    render: () => JSX.Element
    updateMarkers: () => void
}
type TMapConfig = {
    Location: { lat: number, lng: number }
    CircleRadius: number
    Zoom: number
}
type TMainMapProps = {
    LocalStorageKey: string,
    mapContainerName: string,
    className: string,
    searchParams: TSearchParams.AsObject,
    setSearchParams: React.Dispatch<React.SetStateAction<TSearchParams.AsObject>>
    products: TProduct.AsObject[],
    Shops: TShop.AsObject[]
}
type TShopMapProps = {
    mapContainerName: string,
    className: string,
    Shop: TShop.AsObject,
}
type TEditShopMapProps = {
    mapContainerName: string,
    className: string,
    Shop: TShop.AsObject,
    setShop: React.Dispatch<React.SetStateAction<TShop.AsObject>>
}

export function MainMap(props: TMainMapProps): JSX.Element {
    //------------- VARS -------------------------------------------------------------------
    const apiCtx = useContext(ApiCtx) as TApiCtx
    const [mapConfig, setMapConfig] = useState(DEFAULT_MAP_CONFIG)
    const [circle, setCircle] = useState(DG.circle(CONST.DEFAUFT_LOCATION, {
        color: '#708fff',
        fillColor: '#708fff',
        fillOpacity: 0.15,
    }))
    const [Group, setGroup] = useState(DG.featureGroup([]))
    const [map, setMap] = useState<any>()

    //------------- useEffect -----------------------------------------------------------
    useEffect(() => {
        setMap(DG.map(props.mapContainerName, {
            zoom: DEFAULT_MAP_CONFIG.Zoom,
            doubleClickZoom: false
        }));
    }, [])
    useEffect(() => {
        if (map) {
            InitMap()
            updateMarkers()
        }
    }, [map])

    useEffect(() => {
        //console.log('Map(): useEffect(): mapConfig: ', mapConfig)
        if (mapConfig != DEFAULT_MAP_CONFIG) {
            circle.setLatLng(mapConfig.Location);
            WriteMapConfigToLS()
        }
    }, [mapConfig])
    useEffect(() => {
        ////console.log('Map: useEffect: circle.radius')
        circle.setRadius(props.searchParams.radius * 1000)
    }, [props.searchParams.radius])

    useEffect(() => {
        if (props.Shops && map) {
            updateMarkers()
        }
    }, [props.Shops])

    //---------- FUNC -------------------------------------------------------------------------
    function InitMap() {
        const mapCfg = GetMapConfigFromLS()
        setMapConfig(mapCfg)
        map.setView(mapCfg.Location, mapCfg.Zoom)
        map.on('dblclick',
            (e: any) => {
                circle.setLatLng(e.latlng);
                setMapConfig({ ...mapConfig, Location: e.latlng })
                props.setSearchParams({ ...props.searchParams, latitude: e.latlng.lat, longitude: e.latlng.lng })
            });
        circle.addTo(map);
        Group.addTo(map);
        updateMarkers()
    }
    function updateMarkers() {
        Group.clearLayers()
        props.Shops.map((shop, i) => {
            <span className="font-semibold text-lg"></span>
            const shopLink = `<a  style="color:white;font-weight: 600; " href="/shop/${shop.id}" >${shop.name}</a>`
            const popup = DG.popup({ maxWidth: 500, minWidth: 300, maxHeight: 280 }).setHeaderContent(shopLink);
            const marker = DG.marker([shop.location?.lat, shop.location?.lng])
            marker.on('popupopen',
                (e: any) => {
                    SetPopupProductsTable(popup, shop.id, props.searchParams)
                });
            Group.addLayer(marker.bindPopup(popup).bindLabel(shop.name));
        })
    }
    function GetMapConfigFromLS(): TMapConfig {
        if (props.LocalStorageKey == undefined) {
            return DEFAULT_MAP_CONFIG
        } else {
            let MapConfigJSON = localStorage.getItem(props.LocalStorageKey)
            if (MapConfigJSON != null && MapConfigJSON != '') {
                let LStorageParams = JSON.parse(MapConfigJSON) as TMapConfig
                if (LStorageParams != undefined) {
                    //console.log("GetMapConfigFromLS:", LStorageParams)
                    return LStorageParams
                } else {
                    //console.log("GetMapConfigFromLS: err: ")
                    return DEFAULT_MAP_CONFIG
                }
            } else {
                //console.log("GetMapConfigFromLS: err: ")
                return DEFAULT_MAP_CONFIG
            }
        }
    }
    function WriteMapConfigToLS() {
        //console.log('WriteMapConfigToLS(): ',)
        localStorage.setItem(props.LocalStorageKey, JSON.stringify(mapConfig))
    }
    function SetPopupProductsTable(popup: any, shop_id: number, searchParams: TSearchParams.AsObject) {
        //const apiCtx = useContext(ApiCtx) as TApiCtx

        if (searchParams == undefined) {
            return //'Товары не найдены'
        }
        let request = new TSearchParams()
        request.setShopid(shop_id)
        request.setFilterstr(searchParams.filterstr)
        request.setLimit(searchParams.limit)
        request.setMaxprice(searchParams.maxprice)
        request.setMinprice(searchParams.minprice)
        request.setSortby(searchParams.sortby)
        
        popup.setContent('Поиск товаров...')

        apiCtx.guestClient.getProducts(request, null)
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
    return (
        <>
            <div className="m-2">
                <div id={props.mapContainerName} className={props.className}>
                    {(map == undefined) &&
                        <span>Загрузка карты...</span>
                    }
                </div>
            </div>
        </>
    )
}


export function ShopMap(props: TShopMapProps): JSX.Element {
    //------------- VARS -------------------------------------------------------------------
    const [map, setMap] = useState<any>()

    //------------- useEffect -----------------------------------------------------------
    useEffect(() => {
        setMap(DG.map(props.mapContainerName, {
            zoom: DEFAULT_MAP_CONFIG.Zoom,
            doubleClickZoom: false
        }));
    }, [])
    useEffect(() => {
        if (map) {
            InitMap()
        }
    }, [map])


    //---------- FUNC -------------------------------------------------------------------------
    function InitMap() {
        map.setView(props.Shop?.location || CONST.DEFAUFT_LOCATION, 12)
        const name = <span className="text-lg font-semibold">{props.Shop.name}</span>
        const content =
            <span className="text-base">
                {(props.Shop?.address && props.Shop.address != '') &&
                    `Адрес: ${props.Shop.address}`
                }
            </span>
        const popup = DG.popup().setHeaderContent(jsxToString(name));
        popup.setContent(jsxToString(content))
        DG.marker(props.Shop?.location || CONST.DEFAUFT_LOCATION).bindPopup(popup).addTo(map)
    }

    return (
        <>
            <div className="m-2">
                <div id={props.mapContainerName} className={props.className}>
                    {(map == undefined) &&
                        <span>Загрузка карты...</span>
                    }
                </div>
            </div>
        </>
    )
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
        //console.log('EditShopMap(): props.Location:', Location)
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
        <>
            <div className="m-2">
                <div id={mapContainerName} className={className}>
                    {(map == undefined) &&
                        <span>Загрузка карты...</span>
                    }
                </div>
            </div>
        </>
    )
}


