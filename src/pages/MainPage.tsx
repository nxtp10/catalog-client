
import { ProductsTable } from '../components/ProductTable'
import { Map, MAP_TYPE_MAIN } from '../components/Map'
import { SearchForm } from '../components/SearchForm'


const MAP_CONTAINER = "map-container"

export function MainPage(): JSX.Element {

    //------------- FUNC --------------------------------------------------

    //--------------- RETURN ---------------------------------------------
    return (
        <>
            {SearchForm(true)}
            <div className="m-2">
                <div id={MAP_CONTAINER} className="p-2 w-full h-96 hidden">
                    {Map(MAP_CONTAINER, MAP_TYPE_MAIN, undefined)}
                </div>
            </div>
            {ProductsTable()}
        </>
    )
}

