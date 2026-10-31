
import RejectedMedicineInteractionTranslationDetail from "@/features/medicines/interaction-translation/rejected-interaction-translation/detail";
import { Suspense } from "react";

type Props = {
    params: Promise<{ id: string }>;
};

async function RejectedMedicineTranslationContent({ params }: Props) {
    const { id } = await params;

    return <RejectedMedicineInteractionTranslationDetail id={id} />;
}

export default function Page({ params }: Props) {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <RejectedMedicineTranslationContent params={params} />
        </Suspense>
    );
}
