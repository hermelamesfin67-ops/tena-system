
import MedicineWarningDetails from "@/features/medicines/warning-translation";
import { Suspense } from "react";

type Props = {
    params: Promise<{ id: string }>;
};

async function DraftMedicineWarningDetailsContent({ params }: Props) {
    const { id } = await params;

    return <MedicineWarningDetails id={id} />;
}

export default function Page({ params }: Props) {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <DraftMedicineWarningDetailsContent params={params} />
        </Suspense>
    );
}
