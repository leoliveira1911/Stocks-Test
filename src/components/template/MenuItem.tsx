import Link from 'next/link'
interface MenuItemProps {
    url?: string
    text: string
    icon: any
    onClick?: (e: any) => void
    className?: string
}

export default function MenuItem(props: MenuItemProps) {
    function renderLink() {
        return(
            <a className={`
                    flex
                    flex-col
                    justify-center
                    items-center
                    h-20
                    w-20
                    text-gray-600
                    dark:text-gray-200
                    ${props.className}
                `}>
                    {props.icon}
                    <span className={`
            text-xs
            font-light
           
            `}>
                        {props.text}
                    </span>

                </a>
        )
    }
    
    return (
        <li 
        onClick={props.onClick}
        className={`
            cursor-pointer
            hover:bg-gray-300
            dark:hover:bg-gray-800
        `}>
            {props.url ? ( 
            <Link href={props.url}>
                {renderLink()}
            </Link>
            ) : renderLink() }
        </li>
    )
}