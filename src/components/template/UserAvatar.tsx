import Link from 'next/link'
import useAuth from '../../data/hook/useAuth'

interface UserAvatarProps {
    className?: string
}

export default function UserAvatar(props: UserAvatarProps) {
    const auth = useAuth()
    return (
        <Link href='/profile'>
            <img src={auth.user?.imgUrl ?? '/images/avatar.jpg'} alt='User Avatar'
                className='h-10 w-10 rounded-full cursor-pointer ml-2'/>
        </Link>
    )
}