import { Pill } from 'lucide-react'
import React from 'react'

type Props = {
    title: string
    description: string
    icon?: React.ReactNode
}
function ModalHeader({ title, description, icon }: Props) {
    return (
        <div className="flex items-center gap-3 pb-3">
            <div className="rounded-xl bg-emerald-50 p-3 text-brand">
                {icon || <Pill />}
            </div>
            <div>
                <h2 className="font-semibold text-slate-900">{title}</h2>
                <p className="text-sm text-slate-500">{description}</p>
            </div>
        </div>
    )
}

export default ModalHeader