import {  TSearchParams } from "../api/api_pb";
import * as Input from './input'
import * as Styles from './styles'
import * as CONST from '../settings/constants'

//------------- CONST -------------------------------------------------------------------

//-------- TYPES ---------------------------------------------------------------------------------
type TConfig = {
    PriceRange: boolean
    Radius: boolean
    MapBtn: boolean
    FindButtonPostfix: string
}


//SearchForm. Форма выбора параметров поиска товара.
export function SearchForm(
    searchParams: TSearchParams.AsObject,
    setSearchParams: React.Dispatch<React.SetStateAction<TSearchParams.AsObject>>,
    onFindBtnClick: () => void,
    onMapBtnClick: () => void,
    config: TConfig,
): JSX.Element {
    
    const inpMin = Input.Text('number',
        { value: searchParams, setValue: setSearchParams, field: 'minprice' },
        [],
        { className: [Styles.Inp.s, 'w-16'].join(' '), min: 0, step: 100 }
    )
    const inpMax = Input.Text('number',
        { value: searchParams, setValue: setSearchParams, field: 'maxprice' },
        [],
        { className: [Styles.Inp.s, 'w-16'].join(' '), min: 0, step: 100 }
    )
    const inpRadius = Input.Text('number',
        { value: searchParams, setValue: setSearchParams, field: 'radius' },
        [],
        { className: [Styles.Inp.s, 'w-16'].join(' '), min: 0, step: 0.5 }
    )
    //--------------- useEffect ----------------------------------------------------------------------------


    //----------- FUNC ---------------------------------------------------------------

    function Filter() {//настройки фильтра
        return (
            <div className='p-1 m-1 '>
                {
                    config.PriceRange &&
                    <>
                        <span className="text-white font-semibold text-sm"> Цена от:</span>
                        {inpMin.render()}
                        <span className="text-white font-semibold text-sm">до:</span>
                        {inpMax.render()}
                    </>
                }
                {config.Radius &&
                    <>
                        <span className="text-white font-semibold text-sm">Радиус:</span>
                        {inpRadius.render()}
                        <span className="text-white font-semibold text-sm">км</span>
                    </>
                }
            </div>
        )
    }
    function EnterPress(e: any) {
        if (e.key === 'Enter') {
            onFindBtnClick()
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
                                <img className="inline-block cursor-pointer"
                                    src={CONST.IMAGES_LOUPE}
                                    width="35"
                                    height="35"
                                    alt="Найти"
                                    onClick={onFindBtnClick} />
                            </td>
                            <td className="w-10 content-center px-2">
                                {config.MapBtn &&
                                    <img className="inline-block cursor-pointer"
                                        src={CONST.IMAGES_EARTH}
                                        width="35"
                                        height="35"
                                        alt="Карта"
                                        onClick={onMapBtnClick} />
                                }

                            </td>
                        </tr>
                    </tbody>
                </table>
                {Filter()}
            </div>
        </div>
    )
}
