import { cn } from 'cn'
import { ImSpinner2 } from 'react-icons/im'

function Loader({ className }: { className?: string }) {
    return (
        <div
            className={cn("flex items-center justify-center w-full py-20", className)}
        >
            <ImSpinner2
                className={cn("animate-spin text-primary")}
                size={45}
            />
        </div>
    )
}

export default Loader