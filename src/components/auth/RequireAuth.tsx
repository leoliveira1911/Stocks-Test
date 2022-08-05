import Image from 'next/image'
import Router from 'next/router'
import loading from '../../../public/images/loading.gif'
import useAuth from '../../data/hook/useAuth'
import Head from 'next/head'
export default function RequireAuth(props) {

    const auth = useAuth()

    function renderContent() {
        return (
        <>
        <Head>
            <script dangerouslySetInnerHTML={{
                __html:`
                    if(!document.cookie?.includes("admin-template-auth")){
                        window.location.href = '/autentication'
                    }
                `
            }} />
        </Head>
            {props.children}
        </>
        )
    }

    function renderLoading() {
        return (
            <div className={`
            flex justify-center items-center h-screen 
            `}>
                <Image src={loading}/>
            </div>
        )
    }

    if(!auth.loading && auth.user?.email ) {
        return renderContent()
    } else if(auth.loading) {
        return renderLoading()
    } else {
        Router.push('/autentication')
    }
}