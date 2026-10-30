
type Props = {
    title: string,
    value: string
    className?: string
}
function TitleValueCard({ title, value, className }: Props) {
    return (
        <div className={className}>
            <p className="text-sm text-slate-500">{title}</p>
            <p className="mt-1 font-semibold text-slate-900 capitalize">
                {value}
            </p>
        </div>
    )
}

export default TitleValueCard