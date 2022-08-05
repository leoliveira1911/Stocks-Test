export default function Logo() {
    return (
        <div className={`
        h-14 w-14 rounded-full
        bg-white
        flex flex-col justify-center items-center
        `}>
            <div className={`
            h-3 w-3 rounded-full
            bg-red-600
            flex justify-center items-center
            `}>
                <div className={`
            h-1 w-1 rounded-full
            bg-blue-600
            `} ></div>
            </div>
        </div>
    )
}