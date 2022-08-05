import { useState } from "react";
import AuthInput from "../components/auth/AuthInput";
import { WarningIcon } from "../components/Icons";
import useAuth from '../data/hook/useAuth'


export default function Autentication() {

    const auth = useAuth()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [mode, setMode] = useState<'login' | 'registration'>('login')

    async function submit() {
        try{
            if (mode === 'login') {
                await auth.login(email , password)
            } else {
                await auth.register(email, password)
                
            }
        } catch(e) {
            showError(e.message ?? "Erro inesperado")
        }
    }

    function showError(msg, time = 5000) {
        setError(msg) 
        setTimeout(() => setError(null) , time)
    }

    return (
        <div className={`
        flex  items-center justify-center
        h-screen
        `}>
            <div className={`
            w-1/2
            hidden md:block lg:w-2/3
            `}>
                <img src="https://source.unsplash.com/random" alt="Imagem Tela de Autenticação"
                    className={`
                h-screen w-full object-cover`}
                />
            </div>
            <div className={`
               m-10 w-full md:w-1/2 lg:w-1/3
              `}>
                <h1 className={`
                  text-2xl font-bold mb-5
                   `}>
                    {mode === 'login' ? 'Entre com a sua conta' : 'Castratre-se na plataforma'}
                </h1>
                {error ? (
                <div className={`
                    flex items-center justify-center
                    bg-red-400 text-white
                    py-3 px-5 my-2 border-2 border-red-700 rounded-lg
                `}>
                    {WarningIcon}
                    <span className="ml-3">{error}</span>
                </div>
                ) : false}
                <AuthInput required label='Email' type='email' value={email} onChange={setEmail} />
                <AuthInput required label='Senha' type="password" value={password} onChange={setPassword} />

                <button onClick={submit} className={`
            w-full bg-indigo-500 hover:bg-indigo-400 
            text-white rounded-lg px-4 py-3 mt-6
            `}>
                    {mode === 'login' ? 'Entrar' : 'Cadastrar'}
                </button>

                <hr className="my-6 border-gray-200 w-full" />

                <button onClick={auth.loginGoogle} className={`
            w-full bg-red-500 hover:bg-red-400 
            text-white rounded-lg px-4 py-3
            `}>
                    Entrar com o Google
                </button>

                {mode === 'login' ? (
                    <p className="mt-8"> Novo por aqui?
                        <a onClick={() => setMode('registration')} className={`
                        text-blue-500 hover:text-blue-700 font-semibold 
                        cursor-pointer 
                        `} > Crie uma conta gratuitamente</a>

                    </p>
                ) : (
                    <p className="mt-8"> Já faz parte da nossa comunidade?
                        <a onClick={() => setMode('login')} className={`
                        text-blue-500 hover:text-blue-700 font-semibold 
                        cursor-pointer 
                        `} > Entre com as suas credenciais</a>
                    </p>
                )}

            </div>
        </div>
    )
}