import { FC, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { IMenu } from './interface'
import { useAuth } from 'src/hooks/useAuth'
import { useLocalStorage } from 'src/hooks/useLocalStorage'

const menuList: IMenu[] = [
  {
    label: "Create New Bid Item",
    link: "/bid/new-item"
  },
  {
    label: "Deposit",
    link: "/user/deposit"
  }
]
const Navbar: FC = () => {
  const { getItem } = useLocalStorage()
  const { user: currentUser, logout } = useAuth()
  const [isShowMenus, setIsShowMenus] = useState<boolean>(false)
  const [currentFunds, setCurrentFunds] = useState<number | null>(currentUser?.total_funds ?? 0)

  useEffect(() => {
    const _user = getItem('user') ?? null
    if (_user) {
      setCurrentFunds(JSON.parse(_user).total_funds)
    }
  }, [getItem])

  const getUsername = () => {
    if (currentUser) {
      const splittedEmail: string[] = currentUser.email.split('@')
      return splittedEmail[0]
    }

    return 'username'
  }

  return (
    <nav className="h-[60px] bg-white fixed top-0 w-full flex px-8 items-center justify-between shadow-md">
      <Link to="/" className="font-bold text-lg">Bidify App</Link>
      <div className="flex items-center">
        <div className="flex items-center">
          <p className="mr-8">
            Balance: 
            {currentUser && <span className="font-bold"> ${currentFunds}</span>}
          </p>
          <p className="mr-2 font-semibold">{getUsername()}</p>
        </div>
        <div className="relative">
          <div className="flex items-center whitespace-nowrap cursor-pointer" onClick={() => setIsShowMenus(!isShowMenus)}>
            <img
              alt=""
              src="https://www.pngkey.com/png/full/349-3499617_person-placeholder-person-placeholder.png"
              className="rounded-full h-[36px] w-[36px]"
            />
          </div>
          {isShowMenus && (
            <ul className="absolute bg-white w-60 right-0 shadow-sm border-t">
              {menuList.map((menu: IMenu, index: number) => (
                <li 
                  key={index} 
                  className="cursor-pointer border-b text-right hover:bg-slate-50"
                >
                  <Link className="block w-full h-full py-3 px-6" to={menu.link} onClick={() => setIsShowMenus(false)}>{menu.label}</Link>
                </li>
              ))}
              <li 
                className="cursor-pointer border-b py-3 px-6 text-right hover:bg-slate-50"
                onClick={logout}
              >
                Logout
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar