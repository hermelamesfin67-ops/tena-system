"use client";
import { useState } from "react";
import MedicineCard from "./medicine-card";
import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { useFetchData } from "@/api/use-fetch-data";
import { queryKeys } from "@/api/query-keys";
import Loader from "./loader";
import { FiSearch } from "react-icons/fi";
import { useQueryClient } from "@tanstack/react-query";
import useDebounce from "react-use/lib/useDebounce";
import TablePagination from "./table-pagination";

export default function MedicineSearch() {
    const queryClient = useQueryClient()
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(6);
    const [debouncedValue, setDebouncedValue] = useState("");
    const [category, setCategory] = useState("all");

    const medicineData = useFetchData(
        [queryKeys.getAllMedicine, debouncedValue, category, currentPage, pageSize],
        `drugs/?search=${debouncedValue}&page=${currentPage}&page_size=${pageSize}${category === "all" ? "" : `&category=${category}`}`,
    )
    const medicines: Medicine[] = medicineData.data?.results

    const categoryData = useFetchData(
        [queryKeys.getAllCategories],
        `categories/`,
    )
    const categories: Category[] = categoryData.data?.results


    const [,] = useDebounce(
        () => {
            setCurrentPage(1)
            setDebouncedValue?.(search.trim());
        },
        1000,
        [search],
    );

    return (
        <section>
            <div className="flex items-center gap-3 relative">
                <span
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    aria-hidden="true"
                >
                    <Search size={20} />
                </span>

                <input
                    type="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by medicine"
                    aria-label="Search medicines"
                    className="w-full rounded-2xl border border-slate-200 bg-white py-4 pl-10 pr-4 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-4 focus:ring-emerald-50"
                />
                <Button
                    id="search"
                    size={"lg"}
                    disabled={medicineData.isFetching}
                    onClick={() => {
                        queryClient.invalidateQueries({
                            queryKey: [queryKeys.getAllMedicine],
                        })
                        queryClient.invalidateQueries({
                            queryKey: [queryKeys.getAllCategories],
                        })
                    }}
                    className="gradient-btn"
                >
                    <FiSearch />
                </Button>
            </div>

            <div
                id="categories"
                className="mt-5 flex gap-2 overflow-x-auto pb-2"
                aria-label="Filter by category"
            >
                <button
                    onClick={() => setCategory("all")}
                    aria-pressed={category === "all"}
                    className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium ${category === "all"
                        ? "bg-primary text-white"
                        : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                        }`}
                >
                    All Medicines
                </button>

                {categories?.map((item) => (
                    <button
                        key={item.slug}
                        onClick={() => setCategory(item.id)}
                        aria-pressed={category === item.id}
                        className={`capitalize shrink-0 rounded-full px-4 py-2 text-sm font-medium ${category === item.id
                            ? "bg-primary text-white"
                            : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                            }`}
                    >
                        {item?.slug}
                    </button>
                ))}
            </div>

            <div className="mt-8 flex items-center justify-between gap-3">
                <h2 className="text-lg font-semibold text-slate-900">
                    Explore medicines
                </h2>
                <p className="text-sm text-slate-500">
                    {medicineData.data?.total_medicines || "--"} found
                </p>
            </div>

            {medicineData.isFetching ? <Loader /> : medicines?.length > 0 ? (
                <div className="flex flex-col gap-5">

                    <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {medicines?.map((medicine) => (
                            <MedicineCard
                                key={medicine.id}
                                medicine={medicine}
                                categories={categories}
                            />
                        ))}
                    </div>

                    <TablePagination
                        pageSize={pageSize}
                        setPageSize={(val) => {
                            setCurrentPage(1)
                            setPageSize(val)
                        }}
                        total={medicineData.data?.total_medicines}
                        current={currentPage}
                        onChange={(page: number) => setCurrentPage(page)}
                    />
                </div>
            ) : (
                <div className="mt-5 rounded-2xl border border-dashed border-slate-300 px-6 py-16 text-center">
                    <p className="text-lg font-semibold text-slate-800">
                        No medicines found
                    </p>
                    <p className="mt-2 text-sm text-slate-500">
                        Try another name or select a different category.
                    </p>
                    <Button
                        onClick={() => {
                            setSearch("");
                            setCategory("all");
                        }}
                        className="mt-5 rounded-lg px-4 py-2 text-sm font-semibold text-white"
                    >
                        Clear filters
                    </Button>
                </div>
            )}
        </section>
    );
}