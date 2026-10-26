
type Props = {
    title: string,
    value: string
}
function TitleValueCard({ title, value }: Props) {
    return (
        <div>
            <p className="text-sm text-slate-500">{title}</p>
            <p className="mt-1 font-semibold text-slate-900">
                {value}
            </p>
        </div>
    )
}

export default TitleValueCard