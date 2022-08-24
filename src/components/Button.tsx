interface ButtonProps {
onClick:()=> void
label:any
type?:'submit' | 'reset' | 'button' | undefined;
}

export default function Button (props:ButtonProps) {


    return (
        <button type={props.type} onClick={()=>props.onClick()} className={`
        bg-gray-200 dark:bg-slate-500 px-3 py-1 rounded-md text-lg m-2 font-bold 
        `}>{props.label}</button>
    )
}     