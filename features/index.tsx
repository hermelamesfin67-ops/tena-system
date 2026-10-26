"use client"
import MedicineSearch from "@/components/search";
import Header from "@/components/header";
import Footer from "@/components/footer";
import SectionWrapper from "@/components/section";

function HomePage() {
    return (
        <>
            <Header />

            <main className="min-h-screen bg-slate-50">
                <SectionWrapper>
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
                </SectionWrapper>


                <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                    <MedicineSearch />
                </section>

                <Footer />
            </main>
        </>
    )
}

export default HomePage
