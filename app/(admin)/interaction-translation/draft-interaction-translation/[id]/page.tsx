
import DraftMedicineInteractionTranslationDetail from "@/features/medicines/interaction-translation/draft-interaction-translation/detail";
import { Suspense } from "react";

type Props = {
    params: Promise<{ id: string }>;
};

async function DraftMedicineInteractionTranslationContent({ params }: Props) {
    const { id } = await params;

    return <DraftMedicineInteractionTranslationDetail id={id} />;
}

export default function Page({ params }: Props) {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <DraftMedicineInteractionTranslationContent params={params} />
        </Suspense>
    );
}
