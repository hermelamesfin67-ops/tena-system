"use client"
import MedicineSearch from "@/components/search";
import Header from "@/components/header";
import Footer from "@/components/footer";
import SectionWrapper from "@/components/section";
import image from "@/public/medicine2.jpg"
import Image from "next/image";

function HomePage() {
    return (
        <>
            <Header />

            <main className="min-h-screen bg-slate-50">
                <SectionWrapper>
                    <div className="relative isolate min-h-125 overflow-hidden sm:min-h-137.5 lg:min-h-150">

                        {/* Hero background image */}
                        <div className="absolute inset-0 -z-10">
                            <Image
                                src={image}
                                alt="Medicine information"
                                className="h-full w-full object-cover object-center"
                            />
                        </div>

                        {/* Responsive overlay */}
                        <div className="absolute inset-0 z-0 bg-black/45 sm:bg-black/30 lg:bg-transparent" />

                        {/* Hero content */}
                        <div className="relative z-10 mx-auto flex min-h-125 max-w-7xl flex-col justify-center px-5 py-16 sm:min-h-137.5 sm:px-8 sm:py-20 lg:min-h-150 lg:px-8">

                            <p className="text-xs font-semibold uppercase tracking-widest text-white sm:text-sm lg:text-primary">
                                Your medicine information guide
                            </p>

                            <h1 className="mt-4 max-w-3xl text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl lg:text-slate-900">
                                Understand your medicines with confidence.
                            </h1>

                            <p className="mt-5 max-w-2xl text-sm leading-6 text-white/95 sm:text-base sm:leading-7 lg:text-lg lg:text-slate-600">
                                Explore clear, reviewed information about what medicines
                                are used for, how to use them, possible side effects, and
                                important safety precautions.
                            </p>
                        </div>
                    </div>
                </SectionWrapper>

                {/* Medicine search */}
                <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
                    <MedicineSearch />
                </section>

                <Footer />
            </main>
        </>
    )
}

export default HomePage
