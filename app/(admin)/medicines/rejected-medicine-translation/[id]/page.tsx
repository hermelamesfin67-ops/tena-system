
import RejectedMedicineTranslationDetail from "@/features/medicines/rejected-medicine-translation/detail";
import { Suspense } from "react";

type Props = {
    params: Promise<{ id: string }>;
};

async function DraftMedicineTranslationContent({ params }: Props) {
    const { id } = await params;

    return <RejectedMedicineTranslationDetail id={id} />;
}

export default function Page({ params }: Props) {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <DraftMedicineTranslationContent params={params} />
        </Suspense>
    );
}
