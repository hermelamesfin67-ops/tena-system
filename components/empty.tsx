
function Empty({ title }: { title: string }) {
    return (
        <div className="flex items-center justify-center h-64 w-full font-semibold text-slate-400">
            {title || "Not found"}
        </div>
    )
}

export default Empty