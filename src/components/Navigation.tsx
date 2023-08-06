import { Link } from 'react-router-dom'
import * as CONST from '../settings/constants'

export function Navigation() {
  return (
    <nav className="h-[35px] flex justify-between px-5 bg-gray-500 items-center text-white rounded-b-md">
      <Link className="font-bold" to="/" >{CONST.SITE_NAME}</Link>
      <span>
      </span>
    </nav>
  )
  // <span>
  //   <Link className="mr-1" to="/" >Products</Link>
  //   <Link className="mr-1" to="/login">Auth</Link>
  //   <Link className="mr-1" to="/UserAccount/profile">Profile</Link>
  //   <Link className="mr-1" to="/UserAccount/shops">Shops</Link>
  // </span>
}
