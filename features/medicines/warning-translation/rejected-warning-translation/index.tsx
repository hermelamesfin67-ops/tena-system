"use client"
import PageHeader from "@/components/page-header"
import { Eye } from 'lucide-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { useFetchData } from "@/api/use-fetch-data";
import { queryKeys } from "@/api/query-keys";
import Loader from "@/components/loader";
import Link from "next/link";
import { routes } from "@/lib/routes";
import { cn } from "cn";
import { formatDate } from "@/lib/date-time";

const breadcrumb = [{ name: "Reject Warning Translations" }];
function RejectedMedicineWarningTranslations() {

    const rejectedData = useFetchData(
        [queryKeys.getAllMedicineRejectedWarning],
        `drug-warning-translation/rejected/`,
    )
    const rejectedMedicineWarning: MedicineWarningTranslation[] = rejectedData.data

    return (
        <div className='flex flex-col gap-3 w-full'>
            <PageHeader breadcrumb={breadcrumb} />
            <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white w-full">
                <div className='overflow-x-auto w-full'>
                    <Table className='w-full'>
                        <TableHeader className="bg-slate-50/80">
                            <TableRow className="hover:bg-slate-50/80">
                                <TableHead>Title</TableHead>
                                <TableHead>Language Code</TableHead>
                                <TableHead>Rejection Reason</TableHead>
                                <TableHead>Last Updated</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                rejectedData?.isFetching ?
                                    <TableRow>
                                        <TableCell>
                                            <Loader />
                                        </TableCell>
                                    </TableRow>
                                    : rejectedMedicineWarning?.length ? rejectedMedicineWarning?.map((rejected) => {
                                        return (
                                            <TableRow key={rejected?.id}>
                                                <TableCell>
                                                    <div className="font-medium capitalize text-slate-900">
                                                        {rejected?.title}
                                                    </div>
                                                </TableCell>

                                                <TableCell>
                                                    <div className="flex gap-1.5">
                                                        <span key={rejected?.language_code} className={cn(`inline-flex h-8 min-w-10 items-center justify-center rounded-full px-3 text-xs font-semibold`)}>
                                                            {rejected?.language_code?.toUpperCase()}
                                                        </span>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="font-medium capitalize text-slate-900">
                                                        {rejected?.rejection_reason}
                                                    </div>
                                                </TableCell>
                                                <TableCell className="whitespace-nowrap text-slate-600">{formatDate(rejected?.updated_at)}</TableCell>
                                                <TableCell className='flex items-center gap-3'>
                                                    <Tooltip>
                                                        <TooltipTrigger className={"cursor-pointer"} delay={100}>
                                                            <Link href={routes.rejectedWarningTranslationDetail(rejected?.id)}>
                                                                <Eye size={20} />
                                                            </Link>
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            <p className='text-xs'>View Detail</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })
                                        : <TableRow className='h-36 w-full flex items-center justify-center'>
                                            <TableCell className="font-semibold text-slate-600">
                                                No rejected medicine rejected translation found
                                            </TableCell>
                                        </TableRow>
                            }
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    )
}

export default RejectedMedicineWarningTranslations