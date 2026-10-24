
import { Suspense } from "react";
import MedicineDetails from "@/features/medicine-detail";

type Props = {
    params: Promise<{ id: string }>;
};

async function MedicineContent({ params }: Props) {
    const { id } = await params;

    return <MedicineDetails id={id} />;
}

export default function Page({ params }: Props) {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <MedicineContent params={params} />
        </Suspense>
    );
}
