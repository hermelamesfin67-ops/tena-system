
import MedicinesDetails from "@/features/medicines/details";
import { Suspense } from "react";

type Props = {
    params: Promise<{ id: string }>;
};

async function MedicineContent({ params }: Props) {
    const { id } = await params;

    return <MedicinesDetails id={id} />;
}

export default function Page({ params }: Props) {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <MedicineContent params={params} />
        </Suspense>
    );
}
