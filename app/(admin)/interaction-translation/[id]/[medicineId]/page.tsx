
import MedicineInteractionDetails from "@/features/medicines/interaction-translation";
import { Suspense } from "react";

type Props = {
    params: Promise<{ id: string, medicineId: string }>;
};

async function DraftMedicineInteractionDetailsContent({ params }: Props) {
    const { id, medicineId } = await params;

    return <MedicineInteractionDetails id={id} medicineId={medicineId} />;
}

export default function Page({ params }: Props) {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <DraftMedicineInteractionDetailsContent params={params} />
        </Suspense>
    );
}
