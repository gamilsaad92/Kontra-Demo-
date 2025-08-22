export function Card({children,className='' }:{children:React.ReactNode; className?:string}){return <div className={`rounded-2xl border bg-white ${className}`}>{children}</div>}
