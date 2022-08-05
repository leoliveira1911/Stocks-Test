import NavBar from './NavBar'
import TopBar from './TopBar'
import Content from './Content'
import useAppData from '../../data/hook/useAppData'
import RequireAuth from '../auth/RequireAuth'

interface LayoutProps {
    title: string
    subtitle: string
    children?: any
}

export default function Layout(props: LayoutProps) {

    const ctx = useAppData()

    return (
        <RequireAuth>
        <div className={`
        flex
        h-screen
        w-screen
        ${ctx.theme} 
        `}>
            <NavBar />

            <div className={`
            flex
            flex-col
            w-full
            p-7
            bg-gray-300 dark:bg-gray-800

            `}>
                <TopBar title={props.title} subtitle={props.subtitle} />
                <Content>
                    {props.children}
                </Content>

            </div>

        </div>
        </RequireAuth>
    )
}