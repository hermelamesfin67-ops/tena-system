"use client"
import PageHeader from "@/components/page-header"
import { Eye, Plus } from 'lucide-react';
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
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useFetchData } from "@/api/use-fetch-data";
import { queryKeys } from "@/api/query-keys";
import Loader from "@/components/loader";
import Link from "next/link";
import { routes } from "@/lib/routes";
import { cn } from "cn";
import { CategoryForm } from "./create";
import { languageStyles } from "../language";

export const categoryStyles = [
    'bg-emerald-50 text-emerald-700',
    'bg-blue-50 text-blue-700',
    'bg-violet-50 text-violet-700',
];

const breadcrumb = [{ name: "Categories" }];
function Categories() {
    const [open, setOpen] = useState(false);

    const categoryData = useFetchData(
        [queryKeys.getAllCategories],
        `categories/`,
    )
    const categories: Category[] = categoryData.data?.results

    return (
        <div className='flex flex-col gap-3 w-full'>
            <PageHeader breadcrumb={breadcrumb}>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger render={<div className='flex justify-end'><Button className={"max-w-40 w-full"}><Plus /> Add Category</Button></div>} />
                    <DialogContent className="sm:max-w-lg">
                        <CategoryForm setOpen={setOpen} />
                    </DialogContent>
                </Dialog>
            </PageHeader>
            <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white w-full">
                <div className='overflow-x-auto w-full'>
                    <Table className='w-full'>
                        <TableHeader className="bg-slate-50/80">
                            <TableRow className="hover:bg-slate-50/80">
                                <TableHead>Category</TableHead>
                                <TableHead>Languages</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                categoryData?.isFetching ?
                                    <TableRow>
                                        <TableCell>
                                            <Loader />
                                        </TableCell>
                                    </TableRow>
                                    : categories?.length ? categories?.map((category) => {
                                        return (
                                            <TableRow key={category?.id}>
                                                <TableCell>
                                                    <div className="font-medium capitalize text-slate-900">
                                                        {category?.slug}
                                                    </div>
                                                </TableCell>

                                                <TableCell>
                                                    <div className="flex gap-1.5">
                                                        {category?.translations?.map((tr, index) => (
                                                            <span key={tr?.language_code} className={cn(`inline-flex h-8 min-w-10 items-center justify-center rounded-full px-3 text-xs font-semibold`,
                                                                languageStyles[index % languageStyles.length]
                                                            )}>
                                                                {tr?.language_code?.toUpperCase()}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </TableCell>
                                                <TableCell className='flex items-center gap-3'>
                                                    <Tooltip>
                                                        <TooltipTrigger className={"cursor-pointer"} delay={100}>
                                                            <Link href={routes.categoryDetails(category?.id)}>
                                                                <Eye size={20} />
                                                            </Link>
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            <p className='text-xs'>View Detail</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                    {/* <Tooltip>
                                                        <TooltipTrigger className={"cursor-pointer"} delay={100}>
                                                            <Dialog
                                                                open={isEditOpen && editingCategoryId === category?.id}
                                                                onOpenChange={(open) => {
                                                                    if (open) {
                                                                        setEditingCategoryId(category?.id)
                                                                        setIsEditOpen(true)
                                                                    } else {
                                                                        setIsEditOpen(false)
                                                                        setEditingCategoryId("")
                                                                    }
                                                                }}>
                                                                <DialogTrigger render={<RxUpdate size={16} />} />
                                                                <DialogContent className="sm:max-w-lg">
                                                                    <CategoryForm category={category} setIsEditOpen={setIsEditOpen} />
                                                                </DialogContent>
                                                            </Dialog>
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            <p className='text-xs'>Edit</p>
                                                        </TooltipContent>
                                                    </Tooltip> */}
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })
                                        : <TableRow className='h-36 w-full flex items-center justify-center'>
                                            <TableCell className="font-semibold text-slate-600">
                                                No categories found
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

export default Categories