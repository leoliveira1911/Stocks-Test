interface ButtonThemeProps {
    theme: string
    switchTheme: () => void
}

import { SunIcon , MoonIcon} from '../Icons'

export default function ButtonTheme(props: ButtonThemeProps) {
    
    return props.theme === 'dark' ? (
        <div onClick={props.switchTheme} className={`
        hidden sm:flex justify-start lg:justify-around items-center    
        bg-gradient-to-r from-yellow-300 to-yellow-600
        w-14 lg:w-24 h-8 p-1 rounded-full
        cursor-pointer
        `}>
            <div className={`
        flex items-center justify-center
        bg-white text-yellow-600
        w-6 h-6 rounded-full
        `}>
                {SunIcon}
            </div>
            <div className={`
        hidden lg:flex items-center 
        text-white
        `}>
                <span>Light</span>
            </div>
        </div>
    ) : (
        <div onClick={props.switchTheme} className={`
        hidden sm:flex justify-end lg:justify-around items-center    
        bg-gradient-to-r from-gray-500 to-gray-900
        w-14 lg:w-24 h-8 p-1 rounded-full
        cursor-pointer
        `}>
            <div className={`
        hidden lg:flex items-center 
        text-white
        `}>
                <span>Dark</span>
            </div>
            <div className={`
        flex items-center justify-center
        bg-white text-gray-800
        w-6 h-6 rounded-full
        `}>
                {MoonIcon}
            </div>
        </div>
    )
}