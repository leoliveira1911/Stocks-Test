import MenuItem from './MenuItem'
import { HomeIcon , SettingsIcon, BellIcon, LogoutIcon , WalletIcon } from '../Icons'
import Logo from './Logo'
import useAuth from '../../data/hook/useAuth'

interface NavBarProps {

}

export default function NavBar(props:NavBarProps) {
    const auth = useAuth()

    return (
        <aside className={`
        flex flex-col
      bg-gray-200 dark:text-gray-900
        dark:bg-gray-900 
        `}>
            <div className={`
            flex flex-col items-center justify-center
            bg-gradient-to-r from-indigo-500 to-purple-500
            h-20 w-20
            `}>
                <Logo />
            </div>
            <ul className='flex-grow'>
                <MenuItem url='/' text='Início' icon={HomeIcon}/>
                <MenuItem url='/settings' text='Settings' icon={SettingsIcon}/>
                <MenuItem url='/news' text='News' icon={BellIcon}/>
                <MenuItem url='/wallet' text='Wallet' icon={WalletIcon}/>
            </ul>
            <ul className=''>
                <MenuItem onClick={auth.logout} text='Sair' icon={LogoutIcon}
                className={`
                text-red-600 dark:text-red-400
                hover:bg-red-400 hover:text-white dark:hover:text-white
                `}
                />                
            </ul>
        </aside>
    )
}