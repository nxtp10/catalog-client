
import { useState, useEffect, useContext } from "react";
import * as wrappers_pb from 'google-protobuf/google/protobuf/wrappers_pb';
import { TLocation, TShop } from '../../api/api_pb'
import { Route, Routes, useNavigate, useParams, Link } from 'react-router-dom';
//import { Catalog } from './Catalog'
//import { AuthCtx, TAuthCtx } from '../../hoc/AuthProvider'
import { TApiCtx, ApiCtx } from '../../api/ApiProvider'
import * as Input from '../../components/input'
import * as Valid from '../../components/Validations'
import * as style from '../../components/styles'
import { EditShopMap } from '../../components/Map'

//------------- CONST -------------------------------------------------------------------
const DEFAULT_SHOP = new TShop().toObject()
DEFAULT_SHOP.location = new TLocation().toObject() 
DEFAULT_SHOP.location.lat = 0
DEFAULT_SHOP.location.lng = 0
const EDIT = 'edit'
const NEW = 'new'
//-------- TYPES ---------------------------------------------------------------------------------

/*
//--------------- FUNC ----------------------------------------------------------------------------
export function ShopsForm(): JSX.Element {
    //------------- return ----------------------------------------------------------------------
    return (
        <>
            <Routes>
                <Route path='/' element={<ShopsList />} />
                <Route path='/new' element={<ShopEditor type={NEW} />} />
                <Route path='/edit/:shopid' element={<ShopEditor type={EDIT} />} />
                <Route path='/catalog/:shopid' element={<Catalog/>} />
            </Routes>
        </>
    )
}

function ShopsList(): JSX.Element {
    const apiCtx = useContext(ApiCtx) as TApiCtx
    const authCtx = useContext(AuthCtx) as TAuthCtx
    const [Error, setError] = useState('')

    const [Shops, setShops] = useState<TShop.AsObject[]>([])
    const navigate = useNavigate()
    const btnNewShop = Input.Button(
        'Создать магазин',
        () => { navigate("/UserAccount/shops/new") },
        [],
        { className: [style.Btn.Size1, style.Btn.Green1].join(' ') }
    )
    //--------------- useEffect ----------------------------------------------------------------------------
    useEffect(() => {
        update()
    }, [])

    //--------------- FUNC ----------------------------------------------------------------------------
    function update() {
        setError('')
        apiCtx.userClient.getShops(apiCtx.pbEmpty, apiCtx.getMetadata(authCtx.SessionId))
            .then((resp) => {
                setShops(resp.toObject().valueList)
            })
            .catch((err) => {
                setError('Ошибка загрузки списка магазинов')
                setShops([])
            })
    }
    function btnEdit(shop_id: number) {
        return (
            <button className={[style.Btn.Size1, style.Btn.Green1].join(' ')}
                onClick={() => { navigate("/UserAccount/shops/edit/" + shop_id) }}>
                Редактировать
            </button>
        )
    }
    function btnUploadCatalog(shop_id: number) {
        return (
            <button className={[style.Btn.Size1, style.Btn.Green1].join(' ')}
                onClick={() => { navigate("/UserAccount/shops/catalog/" + shop_id) }}>
                Загрузить каталог товаров
            </button>
        )
    }
    return (
        <>
            {btnNewShop.render()}
            {(Shops.length > 0)
                ? <p>Список магазинов:</p>
                : <p>Найдено магазинов: 0</p>
            }
            {(Error != '') && <p>{Error}</p>}
            <table className="p-2 m-2 border">
                <tbody>
                    {Shops.map((shop, i) => {
                        return (
                            <tr className="p-1 m-1 border rounded-lg"
                                key={shop.id}>
                                <td className="p-2 border">{i + 1}</td>
                                <td className="p-2 border">{shop.name}</td>
                                <td className="p-2 border">{btnEdit(shop.id)}</td>
                                <td className="p-2 border">{btnUploadCatalog(shop.id)}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}

export function ShopEditor({ type }: any): JSX.Element {
    const apiCtx = useContext(ApiCtx) as TApiCtx
    const authCtx = useContext(AuthCtx) as TAuthCtx
    const { shopid } = useParams()
    const [Message, setMessage] = useState('')
    const [Error, setError] = useState('')
    const [Shop, setShop] = useState(DEFAULT_SHOP)
    const [Location, setLocation] = useState<TLocation.AsObject>({lat:0,lng:0})
    const map = EditShopMap("editshop-map-container", "p-2 w-96 h-80",Location, setLocation) 
    const navigate = useNavigate()
    //------ BUTTONS ----------------------------------------
    const btnSave = Input.Submit(
        'Save',
        [],
        { className: [style.Btn.Size1, style.Btn.Green1].join(' ') }
    )
    const btnDelete = Input.Button(
        'Delete',
        () => { delShop() },
        [],
        { className: [style.Btn.Size1, style.Btn.Red1].join(' ') }
    )
    const btnCancel = Input.Button(
        'Cancel',
        () => navigate("/UserAccount/shops"),
        [],
        { className: [style.Btn.Size1, style.Btn.Red1].join(' ') }
    )

    const inpName = Input.Text('text',
        { value: Shop, setValue: setShop, field: 'name' },
        [Valid.Input.IsEmpty],
        { className: [style.Inp.v1].join(' '), required: true, }
    )
    const inpDesc = Input.Text('text',
        { value: Shop, setValue: setShop, field: 'description' },
        [Valid.Input.IsEmpty],
        { className: [style.Inp.v1].join(' '), required: true }
    )
    const inpPhone = Input.Text('text',
        { value: Shop, setValue: setShop, field: 'phone' },
        [],
        { className: [style.Inp.v1].join(' '), required: false }
    )
    const inpCountry = Input.Text('text',
        { value: Shop, setValue: setShop, field: 'country' },
        [Valid.Input.IsEmpty],
        { className: [style.Inp.v1].join(' '), required: true }
    )
    const inpState = Input.Text('text',
        { value: Shop, setValue: setShop, field: 'state' },
        [Valid.Input.IsEmpty],
        { className: [style.Inp.v1].join(' '), required: true }
    )
    const inpTown = Input.Text('text',
        { value: Shop, setValue: setShop, field: 'town' },
        [Valid.Input.IsEmpty],
        { className: [style.Inp.v1].join(' '), required: true }
    )
    const inpAddress = Input.Text('text',
        { value: Shop, setValue: setShop, field: 'address' },
        [Valid.Input.IsEmpty],
        { className: [style.Inp.v1].join(' '), required: true }
    )
    //---------- useEffect ------------------------------------
    useEffect(() => {
        //console.log("ShopEditor: useEffect: shopid:", shopid, 'Number(shopid): ', Number(shopid))
        if (type == EDIT && Number(shopid)) {
            fetch(Number(shopid))
        }
    }, [shopid])
    useEffect(() => {
        //console.log("Shop: ", Shop)
    }, [Shop])
    useEffect(() => {
      if(Location && Location != DEFAULT_SHOP.location){
        setShop({...Shop,location:Location})
      }
    }, [Location])
    


    //------------- FUNC ----------------------------------------------------------------------

    function onSubmit(event: React.FormEvent) {
        event.preventDefault()
        if (type == EDIT) {
            editShop()
        } else {
            newShop()
        }
    };
    function getTShop(Shop: TShop.AsObject): TShop {
        let req = new TShop()
        let location = new TLocation()
        if (Shop.location != undefined) {
            location.setLat(Shop.location.lat)
            location.setLng(Shop.location.lng)
        }
        req.setId(Shop.id)
        req.setName(Shop.name)
        req.setPhone(Shop.phone)
        req.setCountry(Shop.country)
        req.setState(Shop.state)
        req.setTown(Shop.town)
        req.setAddress(Shop.address)
        req.setDescription(Shop.description)
        req.setLocation(location)

        return req
    }
    function newShop() {
        setError('')
        const req = getTShop(Shop)
        apiCtx.userClient.newShop(req, apiCtx.getMetadata(authCtx.SessionId))
            .then((resp) => {
                setMessage('Данные успешно сохранены')
                //onSaveCallback()
                navigate("/UserAccount/shops", { replace: true })
            })
            .catch((err) => {
                //console.log('Ошибка сохранения данных: ' + err)
                setMessage('Ошибка сохранения данных: ' + err)
            })
    }
    function editShop() {
        setError('')
        const req = getTShop(Shop)
        apiCtx.userClient.editShop(req, apiCtx.getMetadata(authCtx.SessionId))
            .then((resp) => {
                setMessage('Данные успешно сохранены')
                //update()
                navigate("/UserAccount/shops")
            })
            .catch((err) => {
                //console.log('Ошибка редактирования данных: ' + err)
                setError('Ошибка редактирования данных: ' + err)
            })
    }
    function delShop() {
        setError('')
        let req = new wrappers_pb.Int32Value
        req.setValue(Shop.id)
        apiCtx.userClient.delShop(req, apiCtx.getMetadata(authCtx.SessionId))
            .then((resp) => {
                setMessage('ОК')
                //update()
                navigate("/UserAccount/shops")
            })
            .catch((err) => {
                setError('Ошибка удаления магазина: ' + err)
            })
    }
    function table() {
        return (
            <>
                <table>
                    <tbody>
                        <tr>
                            <td>Name</td>
                            <td>{inpName.render()
                            }</td>
                        </tr>
                        <tr>
                            <td>Desc</td>
                            <td>{inpDesc.render()
                            }</td>
                        </tr>
                        <tr>
                            <td>Phone</td>
                            <td>{inpPhone.render()
                            }</td>
                        </tr>
                        <tr>
                            <td>Country</td>
                            <td>{inpCountry.render()
                            }</td>
                        </tr>
                        <tr>
                            <td>State</td>
                            <td>{inpState.render()
                            }</td>
                        </tr>
                        <tr>
                            <td>Town</td>
                            <td>{inpTown.render()
                            }</td>
                        </tr>
                        <tr>
                            <td>Address</td>
                            <td>{inpAddress.render()
                            }</td>
                        </tr>
                    </tbody>
                </table>
            </>
        )
    }
    function fetch(shop_id: number) {
        if (shop_id <= 0) {
            setError('Ошибка загрузки данных')
            return
        }
        let req = new wrappers_pb.Int32Value()
        req.setValue(Number(shopid))
        apiCtx.userClient.getShopById(req, apiCtx.getMetadata(authCtx.SessionId))
            .then((resp) => {
                setShop(resp.toObject())
                const l = resp.toObject().location
                if(l){
                    setLocation(l)
                }
            })
            .catch((err) => {
                setError('Ошибка загрузки данных')
            })
    }

    return (
        <>
            <form onSubmit={onSubmit} >
                {
                    (type == EDIT)
                        ? <p>Редактирование магазина</p>
                        : <p>Создание нового магазина</p>
                }
                {table()}
                <p className="font-semibold">Местоположение магазина</p>
                {map}
                {(Message != '') && <p>{Message}</p>
                }
                {btnSave.render()}
                {(type == EDIT) && btnDelete.render()}
                {btnCancel.render()}
            </form>
        </>
    )
}
*/