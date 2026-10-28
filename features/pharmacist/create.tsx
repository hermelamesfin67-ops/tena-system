'use client';
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
import { pharmacistSchema, PharmacistSchemaType } from '@/validations/pharmacist.schema';

type Props = {
    pharmacist?: Pharmacist
    setOpen?: (arg: boolean) => void
    setIsEditOpen?: (arg: boolean) => void
}
export function PharmacistForm({ pharmacist, setOpen, setIsEditOpen }: Props) {
    const queryClient = useQueryClient()
    const postMutation = useDynamicMutation({ type: "Json" })
    const initialValues = {
        username: pharmacist?.username || '',
        email: pharmacist?.email || '',
        password: pharmacist?.password || '',
    }

    const createPharmacist = async (values: PharmacistSchemaType) => {
        try {
            await postMutation.mutateAsync({
                url: pharmacist?.id ? `pharmacist/${pharmacist?.id}/` : `create/pharmacist/`,
                method: pharmacist?.id ? "PUT" : "POST",
                body: {
                    username: values.username,
                    email: values.email,
                    password: values.password,
                },
                onSuccess: async () => {
                    queryClient.invalidateQueries({
                        queryKey: [queryKeys.getAllPharmacist],
                    })
                    toast.success(`Pharmacist ${pharmacist?.id ? "Updated" : "Created"} Successfully!`);
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
        validationSchema={pharmacistSchema}
        onSubmit={(val) => {
            if (!hasObjectsDifferentValues(val, initialValues)) {
                toast.warning("No changes applied!");
                return;
            }
            createPharmacist(val)
        }}>
        <Form className="space-y-5">
            <ModalHeader
                title='Pharmacist Details'
                description='Configure a pharmacist available in the system.'
                icon={<Globe2 />}
            />
            <div className="space-y-2">
                <Label htmlFor="username">
                    Username *
                </Label>
                <Field as={Input} id="username" name="username" placeholder="John Doe" />
                <ErrorMessage name="username" component="p" className="text-xs text-red-600" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="username">
                    Email *
                </Label>
                <Field as={Input} id="email" name="email" placeholder="user@example.com" />
                <ErrorMessage name="email" component="p" className="text-xs text-red-600" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="username">
                    Password *
                </Label>
                <Field as={Input} id="password" name="password" placeholder="*******" type="password" />
                <ErrorMessage name="password" component="p" className="text-xs text-red-600" />
            </div>

            <DialogFooter className="sm:justify-end">
                <DialogClose render={<Button type="button" variant={"outline"}>Cancel</Button>} />
                <Button disabled={postMutation.isPending} type="submit">{postMutation.isPending ? "Loading.." : pharmacist?.id ? "Save Changes" : "Create"}</Button>
            </DialogFooter>
        </Form>
    </Formik>
}
