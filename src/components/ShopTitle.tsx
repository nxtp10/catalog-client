import { TShop } from '../api/api_pb';

export function ShopTitle(shop:TShop.AsObject | undefined): JSX.Element {

    return (
        <>
            {shop &&
                <table className="w-full">
                    <tbody>
                        <tr>
                            <td className="w-1/5"></td>
                            <td className=""><h2 className="font-semibold text-4xl text-center m-5">{shop.name}</h2></td>
                            <td className="w-1/3">
                                <p className="m-2 text-lg">
                                    <span className="font-semibold">Адрес: </span>
                                    {[
                                        shop.country,
                                        shop.state,
                                        shop.town,
                                        shop.address,
                                    ].join(', ')}
                                </p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            }
        </>
    )
}