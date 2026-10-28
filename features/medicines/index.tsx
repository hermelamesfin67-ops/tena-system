"use client"
import { Eye, PenLine, Plus, RefreshCw, Search } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useFetchData } from '@/api/use-fetch-data';
import { queryKeys } from '@/api/query-keys';
import { useState } from 'react';
import { formatDate } from '@/lib/date-time';
import PageHeader from '@/components/page-header';
import { cn } from 'cn';
import Loader from '@/components/loader';
import { Button } from '@/components/ui/button';
import TablePagination from '@/components/table-pagination';
import { useDebounce } from 'react-use';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useQueryClient } from '@tanstack/react-query';
import { MedicineForm } from './create';
import Link from 'next/link';
import { routes } from '@/lib/routes';
import { categoryStyles } from '../categories';
import { languageStyles } from '../language';

const breadcrumb = [{ name: "Medicines" }];
function Medicines() {
  const queryClient = useQueryClient()
  const [open, setOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingMedicineId, setEditingMedicineId] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [debouncedValue, setDebouncedValue] = useState("");
  const [category, setCategory] = useState("");

  const medicineData = useFetchData(
    [queryKeys.getAllMedicine, debouncedValue, category, currentPage, pageSize],
    `drugs/?search=${debouncedValue}&page=${currentPage}&page_size=${pageSize}${!category ? "" : `&category=${category}`}`,
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
    <div className='flex flex-col gap-3 w-full'>
      <PageHeader breadcrumb={breadcrumb}>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger render={<div className='flex justify-end'><Button className={"max-w-40 w-full"}><Plus /> Add Medicine</Button></div>} />
          <DialogContent className="sm:max-w-lg">
            <MedicineForm setOpen={setOpen} />
          </DialogContent>
        </Dialog>
      </PageHeader>
      <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white w-full">
        <div className='grid md:grid-cols-2 gap-3 p-3'>
          <div className="flex items-end gap-3 relative">
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
              placeholder="Search medicine"
              aria-label="Search medicines"
              className="w-full p-2 ml-10 rounded-md border border-slate-200 bg-white text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-4 focus:ring-emerald-50"
            />
            <Button
              id="search"
              size={"lg"}
              disabled={medicineData.isFetching}
              onClick={() => {
                queryClient.invalidateQueries({
                  queryKey: [queryKeys.getAllMedicine],
                })
              }}
              className="gradient-btn"
            >
              <RefreshCw />
            </Button>
          </div>
          <div className='flex flex-wrap justify-end w-full'>
            <Select value={category}>
              <SelectTrigger className={"w-36"}>
                <SelectValue placeholder="By Category" />
              </SelectTrigger>
              <SelectContent>
                {categories
                  ?.map(cat => <SelectItem key={cat?.id} onClick={() => {
                    setCurrentPage(1)
                    setCategory(cat?.slug)
                  }} value={cat}>{cat?.slug}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className='overflow-x-auto w-full'>
          <Table className='w-full'>
            <TableHeader className="bg-slate-50/80">
              <TableRow className="hover:bg-slate-50/80">
                <TableHead>Medicine</TableHead>
                <TableHead>Categories</TableHead>
                <TableHead>Languages</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {
                medicineData?.isFetching ?
                  <TableRow>
                    <TableCell>
                      <Loader />
                    </TableCell>
                  </TableRow>
                  : medicines?.length ? medicines?.map((medicine) => {
                    const categoryNames = categories
                      ?.filter((category) => medicine?.categories?.includes(category?.id))
                      ?.map((cat) => cat.slug)
                    return (
                      <TableRow key={medicine?.id}>
                        <TableCell>
                          <div className="font-medium text-slate-900">
                            {medicine?.generic_name}
                            <span className="font-normal text-slate-400"> / </span>
                            <span className="font-normal text-slate-600">{medicine?.brand_name}</span>
                          </div>
                          <div className="mt-1 text-sm text-slate-500">
                            {medicine?.strength}
                            <span className="px-1 text-slate-300">·</span>
                            {medicine?.dosage_form}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1.5">
                            {categoryNames?.map((category, index) => (
                              <span key={category} className={`inline-flex whitespace-nowrap capitalize rounded-full px-3 py-1 text-xs font-medium ${categoryStyles[index % categoryStyles.length]}`}>
                                {category}
                              </span>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1.5">
                            {medicine?.translations?.map((tr, index) => (
                              <span key={tr?.language_code} className={cn(`inline-flex h-8 min-w-10 items-center justify-center rounded-full px-3 text-xs font-semibold`,
                                languageStyles[index % languageStyles.length]
                              )}>
                                {tr?.language_code?.toUpperCase()}
                              </span>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell className="whitespace-nowrap text-slate-600">{formatDate(medicine?.updated_at)}</TableCell>
                        <TableCell className='flex items-center gap-3'>
                          <Tooltip>
                            <TooltipTrigger className={"cursor-pointer"} delay={100}>
                              <Link href={routes.medicineDetails(medicine?.id)}>
                                <Eye size={20} />
                              </Link>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className='text-xs'>View Detail</p>
                            </TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger className={"cursor-pointer"} delay={100}>
                              <Dialog
                                open={isEditOpen && editingMedicineId === medicine?.id}
                                onOpenChange={(open) => {
                                  if (open) {
                                    setEditingMedicineId(medicine?.id)
                                    setIsEditOpen(true)
                                  } else {
                                    setIsEditOpen(false)
                                    setEditingMedicineId("")
                                  }
                                }}>
                                <DialogTrigger render={<PenLine size={16} />} />
                                <DialogContent className="sm:max-w-lg">
                                  <MedicineForm medicine={medicine} setIsEditOpen={setIsEditOpen} />
                                </DialogContent>
                              </Dialog>
                              {/*  */}
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className='text-xs'>Edit</p>
                            </TooltipContent>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    )
                  })
                    : <TableRow className='h-36 w-full flex items-center justify-center'>
                      <TableCell className="font-semibold text-slate-600">
                        No medicines found
                      </TableCell>
                    </TableRow>
              }
            </TableBody>
          </Table>
        </div>
      </div>
      <TablePagination
        pageSize={pageSize}
        setPageSize={(val) => {
          setCurrentPage(1)
          setPageSize(val)
        }}
        total={medicineData.data?.count}
        current={currentPage}
        onChange={(page: number) => setCurrentPage(page)}
      />
    </div>
  )
}

export default Medicines