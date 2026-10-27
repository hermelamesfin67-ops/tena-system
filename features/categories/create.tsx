'use client';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Pill } from 'lucide-react';
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
import { categorySchema, CategorySchemaType } from '@/validations/category.schema';

type Props = {
    id?: string
    setOpen?: (arg: boolean) => void
    setIsEditOpen?: (arg: boolean) => void
}
export function CategoryForm({ id, setOpen, setIsEditOpen }: Props) {
    const queryClient = useQueryClient()
    const postMutation = useDynamicMutation({ type: "Json" })
    const initialValues = { slug: '' }

    const createCategory = async (values: CategorySchemaType) => {
        try {
            await postMutation.mutateAsync({
                url: id ? `categories/${id}/` : `categories/create/`,
                method: id ? "PUT" : "POST",
                body: {
                    slug: values.slug,
                },
                onSuccess: async () => {
                    queryClient.invalidateQueries({
                        queryKey: [queryKeys.getAllCategories],
                    })
                    toast.success(`Category ${id ? "Updated" : "Created"} Successfully!`);
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
        validationSchema={categorySchema}
        onSubmit={(val) => {
            if (!hasObjectsDifferentValues(val, initialValues)) {
                toast.warning("No changes applied!");
                return;
            }
            createCategory(val)
        }}>
        <Form className="space-y-5">
            <ModalHeader
                title='Category details'
                description='Configure a Category available for localized content.'
                icon={<Pill />}
            />
            <div className="space-y-2">
                <Label htmlFor="name">
                    Category name *
                </Label>
                <Field as={Input} id="slug" name="slug" placeholder="e.g. Pain Relief" />
                <ErrorMessage name="slug" component="p" className="text-xs text-red-600" />
            </div>

            <DialogFooter className="sm:justify-end">
                <DialogClose render={<Button type="button" variant={"outline"}>Cancel</Button>} />
                <Button disabled={postMutation.isPending} type="submit">{postMutation.isPending ? "Loading.." : id ? "Save Changes" : "Create"}</Button>
            </DialogFooter>
        </Form>
    </Formik>
}
