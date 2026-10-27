/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { medicineSchema, MedicineSchemaType } from "@/validations/medicine.schema"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import useDynamicMutation from '@/api/use-post-data';
import { toast } from 'sonner';
import { useFetchData } from '@/api/use-fetch-data';
import { queryKeys } from '@/api/query-keys';
import { hasObjectsDifferentValues } from '@/lib/utils';
import { useQueryClient } from '@tanstack/react-query';
import ModalHeader from '@/components/modal-header';

export type MedicineValues = {
    generic_name: string;
    brand_name: string;
    strength: string;
    dosage_form: string;
    categories: string[];
    is_active: boolean
};
export function MedicineForm({ medicine, setOpen, setIsEditOpen }: { medicine?: Medicine, setOpen?: (arg: boolean) => void, setIsEditOpen?: (arg: boolean) => void }) {
    const queryClient = useQueryClient()
    const postMutation = useDynamicMutation({ type: "Json" })
    const categoryData = useFetchData(
        [queryKeys.getAllCategories],
        `categories/`,
    )
    const categories: Category[] = categoryData.data?.results

    const initialValues: MedicineValues =
    {
        generic_name: medicine?.generic_name || '',
        brand_name: medicine?.brand_name || '',
        strength: medicine?.strength || '',
        dosage_form: medicine?.dosage_form || 'Tablet',
        categories: medicine?.categories || [],
        is_active: true
    };


    const createMedicine = async (values: MedicineSchemaType) => {
        try {
            await postMutation.mutateAsync({
                url: medicine?.id ? `drugs/${medicine?.id}/` : `drugs/create/`,
                method: medicine?.id ? "PUT" : "POST",
                body: {
                    generic_name: values.generic_name,
                    brand_name: values.brand_name,
                    strength: values.strength,
                    dosage_form: values.dosage_form,
                    categories: values.categories
                },
                onSuccess: async () => {
                    queryClient.invalidateQueries({
                        queryKey: [queryKeys.getAllMedicine],
                    })
                    toast.success(`Medicine ${medicine?.id ? "Updated" : "Created"} Successfully!`);
                    if (setIsEditOpen) setIsEditOpen(false)
                    if (setOpen) setOpen(false)
                },
            });
        } catch (err) {
            console.error(err);
        }
    };

    return <Formik
        initialValues={initialValues}
        validationSchema={medicineSchema}
        onSubmit={(val) => {
            if (!hasObjectsDifferentValues(val, initialValues)) {
                toast.warning("No changes applied!");
                return;
            }
            createMedicine(val)
        }}>
        <Form className="space-y-5">
            <ModalHeader
                title={`${medicine?.id ? "Updated" : "Created"} Medicine`}
                description='Core information about the medicine.'
            />
            <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                    <Label>Generic name *</Label>

                    <Field as={Input} name="generic_name" className="text-sm" placeholder="e.g. Paracetamol" />
                    <ErrorMessage name="generic_name" component="p" className="text-xs text-red-600" />
                </div>
                <div className="space-y-2">
                    <Label>Brand name</Label>

                    <Field as={Input} name="brand_name" className="text-sm" placeholder="e.g. Panadol" />
                </div>
                <div className="space-y-2">
                    <Label>Strength</Label>

                    <Field as={Input} name="strength" className="text-sm" placeholder="e.g. 500 mg" />
                </div>
                <div className="space-y-2">
                    <Label>Dosage form</Label>

                    <Field name="dosage_form">{({ field, form }: any) =>
                        <Select value={field.value} onValueChange={v => form.setFieldValue('dosage_form', v)}>
                            <SelectTrigger className={"w-full"}>
                                <SelectValue placeholder="Select dosage form" />
                            </SelectTrigger>
                            <SelectContent>
                                {['Tablet', 'Capsule', 'Oral solution', 'Suspension', 'Cream', 'Injection', 'Other']
                                    ?.map(x => <SelectItem key={x} value={x}>{x}</SelectItem>

                                    )}
                            </SelectContent>
                        </Select>
                    }
                    </Field>
                </div>
            </div>
            <div className="space-y-2">
                <Label>Categories</Label>
                <Field name="categories">
                    {({ field, form }: any) =>
                        <div className="flex flex-wrap gap-2">
                            {categories
                                ?.map(cat => <label key={cat.id} className={`cursor-pointer capitalize rounded-full border px-3 py-2 text-xs ${field.value.includes(cat.id) ? 'border-emerald-300 bg-emerald-50 text-brand' : 'border-slate-200 text-slate-600'}`}>
                                    <input
                                        type="checkbox"
                                        className="sr-only"
                                        checked={field.value.includes(cat.id)}
                                        onChange={e => form.setFieldValue('categories', e.target.checked ? [...field.value, cat.id] : field.value.filter((v: string) => v !== cat.id))}
                                    />
                                    {cat.slug}
                                </label>
                                )}
                        </div>
                    }
                </Field>
            </div>
            {/* <label className="flex items-center gap-3 text-sm text-slate-700">
                <Field type="checkbox" name="is_active" className="h-4 w-4 accent-emerald-700" />
                Medicine is active
            </label> */}
            <DialogFooter className="sm:justify-end">
                <DialogClose render={<Button type="button" variant={"outline"}>Cancel</Button>} />
                <Button disabled={postMutation.isPending} type="submit">{postMutation.isPending ? "Loading.." : medicine?.id ? "Save Changes" : "Create"}</Button>
            </DialogFooter>
        </Form>
    </Formik>
}
