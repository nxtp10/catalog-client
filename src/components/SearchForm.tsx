import { TSearchParams } from "../api/api_pb";
import { useState, useEffect, useContext, } from "react";
import * as Styles from './styles'
import { ProductSearchCtx, TProductSearchCtx } from './SearchProvider'

//------------- CONST -------------------------------------------------------------------

//-------- TYPES ---------------------------------------------------------------------------------



//SearchForm. Форма выбора параметров поиска товара.
export function SearchForm(showRadius: boolean): JSX.Element {
    const ctx = useContext(ProductSearchCtx) as TProductSearchCtx
    const [searchParams, setSearchParams] = useState<TSearchParams.AsObject|undefined>(undefined)
    //--------------- useEffect ----------------------------------------------------------------------------
    useEffect(() => {
        if (!searchParams && ctx.searchParams) {
            setSearchParams({ ...ctx.searchParams })
        }
    }, [ctx.searchParams])

    if (!searchParams) {
        return <></>
    }
    //----------- FUNC ---------------------------------------------------------------

    function find() {
        if (searchParams && ctx.searchParams) {
            let sp = searchParams
            if (//находим различия
                sp.filterstr !== ctx.searchParams.filterstr ||
                sp.limit !== ctx.searchParams.limit ||
                sp.maxprice !== ctx.searchParams.maxprice ||
                sp.minprice !== ctx.searchParams.minprice ||
                sp.radius !== ctx.searchParams.radius ||
                sp.sortby !== ctx.searchParams.sortby 
            ){
                sp.latitude = ctx.searchParams.latitude
                sp.longitude = ctx.searchParams.longitude
                sp.shopid = ctx.searchParams.shopid
                sp.offset = ctx.searchParams.offset
                ctx.setSearchParams({ ...sp })
            }
        }
    }

    function Filter() {//настройки фильтра
        if (!searchParams) {
            return
        }
        return (
            <div className='p-1 m-1 '>
                {
                    <>
                        <span className="text-white font-semibold text-sm"> Цена от:</span>
                        <input
                            type="number"
                            value={searchParams.minprice}
                            onChange={(e) => { setSearchParams({ ...searchParams, minprice: Number(e.target.value) }) }}
                            className={[Styles.Inp.s, 'w-16'].join(' ')}
                            min={0}
                            step={100}
                            onKeyUp={EnterPress}
                        />
                        <span className="text-white font-semibold text-sm">до:</span>
                        <input
                            type="number"
                            value={searchParams.maxprice}
                            onChange={(e) => { setSearchParams({ ...searchParams, maxprice: Number(e.target.value) }) }}
                            className={[Styles.Inp.s, 'w-16'].join(' ')}
                            min={0}
                            step={100}
                            onKeyUp={EnterPress}
                        />
                        
                    </>
                }
                {showRadius &&
                    <>
                        <span className="text-white font-semibold text-sm">Радиус:</span>
                        <input
                            type="number"
                            value={searchParams.radius}
                            onChange={(e) => { setSearchParams({ ...searchParams, radius: Number(e.target.value) }) }}
                            className={[Styles.Inp.s, 'w-16'].join(' ')}
                            min={0}
                            step={1}
                            onKeyUp={EnterPress}
                        />
                        <span className="text-white font-semibold text-sm">км</span>
                    </>
                }
            </div>
        )
    }
    function EnterPress(e: any) {
        if (e.key === 'Enter') {
            find()
        }
    }


    //----------- return ---------------------------------------------------------------
    return (
        <div className="w-full flex justify-center">
            <div className="px-2 py-1 my-2 mx- rounded-lg bg-green-600" style={{ minWidth: 400, width: '70%' }} >
                <table className="w-full">
                    <tbody>
                        <tr>
                            <td>
                                <input type="text"
                                    className={[Styles.Inp.lg, 'w-full'].join(' ')}
                                    value={searchParams.filterstr}
                                    onChange={(e) => { setSearchParams({ ...searchParams, filterstr: e.target.value }) }}
                                    onKeyUp={EnterPress}
                                />
                            </td>
                            <td className="w-10 content-center px-2">
                                <button
                                    onClick={find}
                                    className={[Styles.Btn.Green1, Styles.Btn.Size1, 'text-white'].join(' ')}
                                >Найти</button>
                            </td>
                            <td className="w-10 content-center px-2">
                                <button
                                    onClick={() => {
                                        if (ctx.mapConfig) {
                                            ctx.setMapConfig({ ...ctx.mapConfig, Display: !ctx.mapConfig.Display });
                                        }
                                    }}
                                    className={[Styles.Btn.Green1, Styles.Btn.Size1, 'text-white'].join(' ')}
                                >Карта</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                {Filter()}
            </div>
        </div>
    )
}
