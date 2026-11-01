'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Globe2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import ModalHeader from '@/components/modal-header';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import useDynamicMutation from '@/api/use-post-data';
import { queryKeys } from '@/api/query-keys';
import { hasObjectsDifferentValues } from '@/lib/utils';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import { medicineSourceSchema, MedicineSourceSchemaType } from '@/validations/medicine.schema';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { medicineSourceTypes } from '@/constants';
import FormikInput from '@/components/forms/input';
import { formatDate } from '@/lib/date-time';

type Props = {
    source?: MedicineSource
    setOpen?: (arg: boolean) => void
    setIsEditOpen?: (arg: boolean) => void
}
export function MedicineSourceForm({ source, setOpen, setIsEditOpen }: Props) {
    const queryClient = useQueryClient()
    const postMutation = useDynamicMutation({ type: "Json" })
    const initialValues = {
        title: source?.title || "",
        organization: source?.organization || "",
        url: source?.url || "",
        source_type: source?.source_type || "",
        publication_date: source?.publication_date || "",
        notes: source?.notes || "",
    }

    const createMedicineSource = async (values: MedicineSourceSchemaType) => {
        try {
            await postMutation.mutateAsync({
                url: source?.id ? `drug-sources/${source?.id}/` : `drugs/sources/create/`,
                method: source?.id ? "PATCH" : "POST",
                body: {
                    title: values?.title,
                    organization: values?.organization,
                    url: values?.url,
                    source_type: values?.source_type,
                    publication_date: formatDate(values?.publication_date, "YYYY-MM-DD"),
                    notes: values?.notes,
                },
                onSuccess: async () => {
                    queryClient.invalidateQueries({
                        queryKey: [queryKeys.getAllMedicineSource],
                    })
                    toast.success(`Medicine Source ${source?.id ? "Updated" : "Created"} Successfully!`);
                    if (setOpen) setOpen(false)
                    if (setIsEditOpen) setIsEditOpen(false)
                },
            });
        } catch (err) {
            console.error(err);
        }
    };

    return <Formik
        initialValues={initialValues}
        validationSchema={medicineSourceSchema}
        onSubmit={(val) => {
            if (!hasObjectsDifferentValues(val, initialValues)) {
                toast.warning("No changes applied!");
                return;
            }
            createMedicineSource(val)
        }}>
        {({ setFieldValue, values }) => (
            <Form className="space-y-5">
                <ModalHeader
                    title='Medicine Source'
                    description='Add a new medicine source or edit an existing one.'
                    icon={<Globe2 />}
                />
                <div className="space-y-2">
                    <Label htmlFor="title">
                        Title *
                    </Label>
                    <Field as={Input} id="title" name="title" placeholder="Enter Title" />
                    <ErrorMessage name="title" component="p" className="text-xs text-red-600" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="organization">
                        Organization *
                    </Label>
                    <Field as={Input} id="organization" name="organization" placeholder="Enter Organization" />
                    <ErrorMessage name="organization" component="p" className="text-xs text-red-600" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="url">
                        URL *
                    </Label>
                    <Field as={Input} id="url" name="url" placeholder="e.g. https://example.com" />
                    <ErrorMessage name="url" component="p" className="text-xs text-red-600" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="publication_date">
                        Publication Date
                    </Label>
                    <FormikInput type='date' id="publication_date" name="publication_date" placeholder="e.g. 2023-01-01" />
                    <ErrorMessage name="publication_date" component="p" className="text-xs text-red-600" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="notes">
                        Notes *
                    </Label>
                    <Field
                        as="textarea"
                        id={"notes"}
                        name={`notes`}
                        rows={3}
                        placeholder={`Enter notes`}
                        className="w-full rounded-md border border-slate-200 p-3 text-sm outline-none focus:ring-2 focus:ring-primary/20"
                    />
                    <ErrorMessage name="notes" component="p" className="text-xs text-red-600" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="source_type">
                        Source Type
                    </Label>
                    <Select items={medicineSourceTypes} defaultValue={values.source_type} onValueChange={(v: any) => setFieldValue("source_type", v)}>
                        <SelectTrigger size="sm" className="max-w-xs w-full">
                            <SelectValue placeholder="Select Source Type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {medicineSourceTypes?.map((item) => (
                                    <SelectItem key={item.value} value={item.value}>
                                        {item.label}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <ErrorMessage name="source_type" component="p" className="text-xs text-red-600" />
                </div>
                <DialogFooter className="sm:justify-end">
                    <DialogClose render={<Button type="button" variant={"outline"}>Cancel</Button>} />
                    <Button disabled={postMutation.isPending} type="submit">{postMutation.isPending ? "Loading.." : source?.id ? "Save Changes" : "Create"}</Button>
                </DialogFooter>
            </Form>
        )}
    </Formik>
}
