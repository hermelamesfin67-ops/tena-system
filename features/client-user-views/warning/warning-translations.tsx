"use client"
import { queryKeys } from '@/api/query-keys';
import { useFetchData } from '@/api/use-fetch-data';
import Loader from '@/components/loader';
import TitleValueCard from '@/components/title-value-card';
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { warningBGstyle, warningTitleSubTitle } from '@/constants';
import { formatDate } from '@/lib/date-time';
import { cn } from 'cn';
import { ChevronRight, TriangleAlert } from 'lucide-react';
import { useMemo, useState } from 'react';

type Props = { warning: MedicineWarning }

function WarningTranslations({ warning }: Props) {
  const [open, setOpen] = useState(false);
  const color = warningBGstyle[warning?.warning_type]
  const warningType = warningTitleSubTitle[warning?.warning_type]
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger render={<div>
          <div className={cn('flex flex-col gap-2 md:flex-row md:items-center justify-between w-full p-3 md:px-6 rounded-2xl cursor-pointer hover:scale-105',
            color.background)}
          >
            <div className='flex items-center gap-3'>
              <div className={cn('p-3 rounded-full', color.iconBG, color?.text)}>
                <TriangleAlert size={36} />
              </div>
              <div>
                <span className={cn('uppercase text-xs', color?.text)}>{warning?.warning_type}</span>
                <p className='capitalize text-lg font-bold'>{warningType?.title}</p>
                <p className='text-gray-400 text-xs'>{warningType?.subTitle}</p>
              </div>
            </div>

            <Button variant={"outline"} className={"flex items-center gap-2 rounded-full p-4 border border-primary text-sm w-fit"}>
              View Details <ChevronRight />
            </Button>
          </div>
        </div>} />
        <DialogContent className="sm:max-w-3xl">
          <Translations warning={warning} />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default WarningTranslations


const Translations = ({ warning }: Props) => {
  const color = warningBGstyle[warning?.warning_type]
  const warningType = warningTitleSubTitle[warning?.warning_type]

  const [language, setLanguage] = useState("en");
  const languagesData = useFetchData(
    [queryKeys.getAllLanguages],
    `languages/`,
  )
  const languages: Language[] = languagesData.data

  const medicineLanguages = warning?.translations?.map((translation) => {
    const language = languages?.find(
      (lang) => lang.code === translation?.language_code
    );

    return {
      native_name: language?.native_name,
      language_code: translation.language_code,
    };
  });
  const warningTranslation = useMemo(() => {
    return warning?.translations?.filter((tr) => tr?.language_code === language)[0]
  }, [language, warning])
  const hasTranslation = warningTranslation &&
    typeof warningTranslation === "object" &&
    Object.keys(warningTranslation).length > 0


  return <div className='flex flex-col gap-3 w-full'>
    <div className="flex flex-col gap-5 rounded-md p-3">
      <div className='flex items-center gap-3'>
        <div className={cn('p-3 rounded-full', color.iconBG, color?.text)}>
          <TriangleAlert size={36} />
        </div>
        <div>
          <span className={cn('uppercase text-xs', color?.text)}>{warning?.warning_type}</span>
          <p className='capitalize text-lg font-bold'>{warningType?.title}</p>
          <p className='text-gray-400 text-xs'>{warningType?.subTitle}</p>
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 flex-wrap w-full flex-1">
        {languagesData?.isFetching ? <Loader /> : medicineLanguages?.map((item) => (
          <button
            key={item.language_code}
            onClick={() => setLanguage(item.language_code)}
            aria-pressed={language === item.language_code}
            className={`capitalize shrink-0 rounded-full px-4 py-2 text-sm font-medium ${language === item.language_code
              ? "bg-primary text-white"
              : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
              }`}
          >
            {item?.native_name}
          </button>
        ))}
      </div>

      <div className='flex flex-col gap-5'>
        <TitleValueCard title="Last Updated At" value={formatDate(warning?.updated_at)} />
        {warning?.rejection_reason && <TitleValueCard title="Rejection Reason" value={warning?.rejection_reason} />}
      </div>

      {hasTranslation &&
        <div className={cn('p-3', color.background)}>
          <p className='capitalize text-lg font-bold'>{warningTranslation.title}</p>
          <p className='text-gray-400 text-sm'>{warningTranslation.description}</p>
          <p className={cn('text-gray-400', color.text)}>{warningTranslation.recommended_action}</p>
        </div>
      }
    </div>
  </div>
}