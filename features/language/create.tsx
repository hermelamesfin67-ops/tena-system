'use client';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Globe2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { languageSchema } from '@/validations/language.schema';
import ModalHeader from '@/components/modal-header';

export type LanguageValues = {
    code: string;
    name: string;
    native_name: string;
    is_active: boolean
};
export function LanguageForm() {
    const initialValues = { code: '', name: '', native_name: '', is_active: true }

    return <Formik initialValues={initialValues} validationSchema={languageSchema} onSubmit={() => { }}>
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
                <p className="text-xs text-slate-500">Use a unique code such as en or am-ET.</p>
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
            <label className="flex items-center gap-3 text-sm text-slate-700">
                <Field type="checkbox" name="is_active" className="h-4 w-4 accent-emerald-700" />
                Language is active
            </label>
            <div className="flex justify-end">
                <Button type="submit">Save language</Button>
            </div>
        </Form>
    </Formik>
}
