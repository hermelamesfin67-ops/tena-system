"use client"
import { useFetchData } from "@/api/use-fetch-data"
import MedicineSearch from "@/components/search";
import Header from "@/components/header";
import { queryKeys } from "@/api/query-keys";

function HomePage() {

    const medicineData = useFetchData(
        [queryKeys.getAllMedicine],
        `drugs/`,
    )
    const medicines: Medicine[] = medicineData.data

    return (
        <>
            <Header />

            <main className="min-h-screen bg-slate-50">
                <section className="border-b border-emerald-100 bg-linear-to-br from-emerald-50 via-white to-white">
                    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
                        <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                            Your medicine information guide
                        </p>

                        <h1 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                            Understand your medicines with confidence.
                        </h1>

                        <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                            Explore clear, reviewed information about what medicines
                            are used for, how to use them, possible side effects, and
                            important safety precautions.
                        </p>
                    </div>
                </section>

                <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                    <MedicineSearch medicines={medicines} isLoading={medicineData.isFetching}/>
                </section>

                <footer className="border-t border-slate-200 bg-white">
                    <div className="mx-auto max-w-7xl px-4 py-6 text-sm leading-6 text-slate-500 sm:px-6 lg:px-8">
                        Medicine information is for educational purposes and does
                        not replace advice from a qualified healthcare professional.
                        Follow your prescription and consult a pharmacist or clinician
                        if you have questions.
                    </div>
                </footer>
            </main>
        </>
    )
}

export default HomePage
