// src/components/Table.tsx
import React from 'react'
import { cn } from '../utils/cn'

export function Table({children}:{children:React.ReactNode}) {
  return <div className="overflow-auto rounded-2xl border">{children}</div>
}

export function THead({children}:{children:React.ReactNode}) {
  return (
    <div className="grid grid-cols-12 gap-3 px-4 py-2 text-xs uppercase tracking-wide border-b bg-black/5">
      {children}
    </div>
  )
}

// ✅ Accept standard div props (onClick, className, etc.)
type DivProps = React.HTMLAttributes<HTMLDivElement>

export function TRow(
  {children, className, ...props}: {children:React.ReactNode} & DivProps
) {
  return (
    <div
      {...props}
      className={cn("grid grid-cols-12 gap-3 px-4 py-3 border-b", className)}
    >
      {children}
    </div>
  )
}

export function TCell({span=3, children}:{span?:number; children:React.ReactNode}) {
  return <div className={`col-span-${span} truncate`}>{children}</div>
}
