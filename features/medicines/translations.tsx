/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import {
    Formik,
    Form,
    Field,
    ErrorMessage
} from 'formik';
import { Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { medicineTranslationSchema } from '@/validations/medicine.schema';

export type TranslationValues = {
    language: string;
    display_name: string;
    short_description: string;
    what_it_treats: string;
    how_to_use: string;
    when_to_use: string;
    side_effects: string;
    warnings: string;
    storage_instructions: string;
    review_status: 'draft' | 'reviewed' | 'published'
};
const fields: {
    name: keyof TranslationValues;
    label: string;
    placeholder: string
}[] = [
        {
            name: 'short_description',
            label: 'Short description',
            placeholder: 'A concise, patient-friendly summary'
        },
        {
            name: 'what_it_treats',
            label: 'What it treats',
            placeholder: 'Conditions or symptoms this medicine treats'
        },
        {
            name: 'how_to_use',
            label: 'How to use',
            placeholder: 'Reviewed instructions for use'
        },
        {
            name: 'when_to_use',
            label: 'When to use',
            placeholder: 'When this medicine may be appropriate'
        },
        {
            name: 'side_effects',
            label: 'Side effects',
            placeholder: 'Known side effects and relevant guidance'
        },
        {
            name: 'warnings',
            label: 'Warnings',
            placeholder: 'Precautions and important safety information'
        },
        {
            name: 'storage_instructions',
            label: 'Storage instructions',
            placeholder: 'Approved storage instructions'
        }];

const languages = [{ code: "", name: "" }]

export function MedicineTranslationForm({ drugId }: { drugId: string }) {
    const initialValues: TranslationValues = {
        language: '',
        display_name: '',
        short_description: '',
        what_it_treats: '',
        how_to_use: '',
        when_to_use: '',
        side_effects: '',
        warnings: '',
        storage_instructions: '',
        review_status: 'draft'
    };

    return <Formik
        initialValues={initialValues}
        validationSchema={medicineTranslationSchema}
        onSubmit={() => { }}>
        <Form className="space-y-5">
            <div className="flex items-center gap-3">
                <div className="rounded-xl bg-emerald-50 p-3 text-brand">
                    <Languages />
                </div>
                <div>
                    <h2 className="font-semibold text-slate-900">Medicine translation</h2>
                    <p className="text-sm text-slate-500">
                        Localized patient-facing information {drugId ? `for ${drugId}` : 'for the selected medicine'}.
                    </p>
                </div>
            </div>
            <div className="space-y-2">
                <Label>Language *</Label>
                <Field name="language">
                    {({ field,
                        form }: any) => <Select value={field.value} onValueChange={v => form.setFieldValue('language',
                            v
                        )}>
                            <SelectTrigger>
                                <SelectValue placeholder="Choose language" />
                            </SelectTrigger>
                            <SelectContent>
                                {languages?.map(l => <SelectItem key={l.code} value={l.code}>{l.name} ({l.code})
                                </SelectItem>
                                )}
                            </SelectContent>
                        </Select>
                    }
                </Field>
                <ErrorMessage name="language" component="p" className="text-xs text-red-600" />
            </div>
            <div className="space-y-2">
                <Label>Display name *</Label>
                <Field as={Input} name="display_name" placeholder="Name shown to clients" />
                <ErrorMessage name="display_name" component="p" className="text-xs text-red-600" />
            </div>
            <div className="grid gap-4 md:grid-cols-2">{fields.map(({ name,
                label,
                placeholder }) =>
                <div key={name} className="space-y-2">
                    <Label>{label}</Label>
                    <Field as={Textarea} name={name} placeholder={placeholder} />
                </div>
            )}
            </div>
            <div className="space-y-2">
                <Label>Review status</Label>
                <Field name="review_status">
                    {({ field,
                        form }: any) => <Select value={field.value} onValueChange={v => form.setFieldValue('review_status',
                            v
                        )}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="draft">Draft
                                </SelectItem><SelectItem value="reviewed">Reviewed
                                </SelectItem><SelectItem value="published">Published
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    }
                </Field>
                <p className="text-xs text-slate-500">Only publish content after it has passed your medical content review process.</p>
            </div>
            <div className="flex justify-end"><Button type="submit">Save translation</Button>
            </div>
        </Form>
    </Formik>
}
