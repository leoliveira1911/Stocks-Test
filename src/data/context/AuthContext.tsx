import { createContext, useEffect, useState } from "react";
import firebase from "../../firebase/config";
import User from "../../model/User";
import route from 'next/router';
import Cookies from 'js-cookie'

interface AuthContextProps {
    user?: User
    register?: (email, password) => Promise<void>
    login?: (email, password) => Promise<void>
    loginGoogle?: () => Promise<void>
    logout?: () => Promise<void>
    loading?: boolean

}

const AuthContext = createContext<AuthContextProps>({})

async function normalizedUser(firebaseUser: firebase.User): Promise<User> {
    const token = await firebaseUser.getIdToken()
    return {
        uid: firebaseUser.uid,
        name: firebaseUser.displayName,
        email: firebaseUser.email,
        token,
        provider: firebaseUser.providerData[0]?.providerId,
        imgUrl: firebaseUser.photoURL
    }
}

function manageCookie(logged: boolean) {
    if (logged) {
        Cookies.set('admin-template-auth', logged, {
            expires: 7 //days
        })
    } else {
        Cookies.remove('admin-template-auth')
    }
}

export function AuthProvider(props) {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState<User>()

    async function setUpSession(firebaseUser) {
        if (firebaseUser?.email) {
            const user = await normalizedUser(firebaseUser)
            setUser(user)
            manageCookie(true)
            setLoading(false)
            return user.email
        } else {
            setUser(null)
            manageCookie(false)
            setLoading(false)
            return false
        }
    }

    async function logout() {
        try {
            setLoading(true)
            await firebase.auth().signOut()
            await setUpSession(null)
        } finally {
            setLoading(false)
        }
    }

    async function loginGoogle() {
        try {
            setLoading(true)
            const resp = await firebase.auth().signInWithPopup(
                new firebase.auth.GoogleAuthProvider()
            )

            await setUpSession(resp.user)
            route.push('/')
        } finally {
            setLoading(false)
        }
    }
    async function login(email , password) {
        try {
            setLoading(true)
            const resp = await firebase.auth().signInWithEmailAndPassword(email, password)

            await setUpSession(resp.user)
            route.push('/')
        } finally {
            setLoading(false)
        }
    }
    async function register(email , password) {
        try {
            setLoading(true)
            const resp = await firebase.auth().createUserWithEmailAndPassword(email, password)

            await setUpSession(resp.user)
            route.push('/')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (Cookies.get('admin-template-auth')) {
            const cancel = firebase.auth().onIdTokenChanged(setUpSession)
            return () => cancel()
        } else {
            setLoading(false)
        }
    }, [])

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            login,
            register,
            loginGoogle,
            logout
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext

