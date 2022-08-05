interface AuthInputProps {
    label: string
    value: any
    type?: 'text' | 'email' | 'password'
    onChange:(newValue: any) => void
    required?: boolean
}

export default function AuthInput(props: AuthInputProps) {
    return (
        <div className={`
        flex flex-col my-3
        `}>
            <label>{props.label}</label>
            <input 
                type={props.type ?? 'text'} 
                value={props.value} 
                onChange={e => props.onChange?.(e.target.value)}
                required={props.required}
                className={`
                bg-gray-200
                px-4 py-3 rounded-lg mt-1
                border focus:border-blue-500 focus:bg-white
                focus:outline-none
                
                `}
            />
        </div>
    )
}