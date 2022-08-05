import Title from './Title'
import ButtonTheme from './ButtonTheme'
import useAppData from '../../data/hook/useAppData'
import UserAvatar from './UserAvatar'
interface TopBarProps {
    title: string
    subtitle: string
    
}

export default function TopBar(props: TopBarProps) {
    const ctx = useAppData()
    return (
        <div className={`
        flex
        `}>
            <Title title={props.title} subtitle={props.subtitle}/>
            <div className={`
             flex flex-grow justify-end items-center
             `}>
                 <ButtonTheme theme={ctx.theme} switchTheme={ctx.switchTheme}/>
                 <UserAvatar/>
            </div>
        </div>
    )
}