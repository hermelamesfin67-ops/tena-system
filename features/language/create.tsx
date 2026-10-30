'use client';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Globe2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { languageSchema, languageSchemaType } from '@/validations/language.schema';
import ModalHeader from '@/components/modal-header';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import useDynamicMutation from '@/api/use-post-data';
import { queryKeys } from '@/api/query-keys';
import { hasObjectsDifferentValues } from '@/lib/utils';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';

type Props = {
    language?: Language
    setOpen?: (arg: boolean) => void
    setIsEditOpen?: (arg: boolean) => void
}
export function LanguageForm({ language, setOpen, setIsEditOpen }: Props) {
    const queryClient = useQueryClient()
    const postMutation = useDynamicMutation({ type: "Json" })
    const initialValues = {
        code: language?.code || '',
        name: language?.name || '',
        native_name: language?.native_name || '',
        is_active: language?.is_active || true
    }

    const createLanguage = async (values: languageSchemaType) => {
        try {
            await postMutation.mutateAsync({
                url: language?.id ? `languages/${language?.id}/` : `languages/create/`,
                method: language?.id ? "PATCH" : "POST",
                body: {
                    code: values.code,
                    name: values.name,
                    native_name: values.native_name,
                    is_active: values.is_active
                },
                onSuccess: async () => {
                    queryClient.invalidateQueries({
                        queryKey: [queryKeys.getAllLanguages],
                    })
                    toast.success(`Language ${language?.id ? "Updated" : "Created"} Successfully!`);
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
        validationSchema={languageSchema}
        onSubmit={(val) => {
            if (!hasObjectsDifferentValues(val, initialValues)) {
                toast.warning("No changes applied!");
                return;
            }
            createLanguage(val)
        }}>
        <Form className="space-y-5">
            <ModalHeader
                title='Language details'
                description='Configure a language available for localized content.'
                icon={<Globe2 />}
            />
            <div className="space-y-2">
                <Label htmlFor="code">
                    Language code *
                </Label>
                <Field as={Input} id="code" name="code" placeholder="e.g. en, am, ar" />
                <ErrorMessage name="code" component="p" className="text-xs text-red-600" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="name">
                    Language name *
                </Label>
                <Field as={Input} id="name" name="name" placeholder="e.g. Amharic" />
                <ErrorMessage name="name" component="p" className="text-xs text-red-600" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="native_name">
                    Native name *
                </Label>
                <Field as={Input} id="native_name" name="native_name" placeholder="e.g. አማርኛ" />
                <ErrorMessage name="native_name" component="p" className="text-xs text-red-600" />
            </div>
            {/* <label className="flex items-center gap-3 text-sm text-slate-700">
                <Field type="checkbox" name="is_active" className="h-4 w-4 accent-emerald-700" />
                Language is active
            </label> */}
            <DialogFooter className="sm:justify-end">
                <DialogClose render={<Button type="button" variant={"outline"}>Cancel</Button>} />
                <Button disabled={postMutation.isPending} type="submit">{postMutation.isPending ? "Loading.." : language?.id ? "Save Changes" : "Create"}</Button>
            </DialogFooter>
        </Form>
    </Formik>
}
