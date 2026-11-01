"use client"
import { queryKeys } from '@/api/query-keys';
import { useFetchData } from '@/api/use-fetch-data';
import Loader from '@/components/loader';
import TitleValueCard from '@/components/title-value-card';
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { formatDate } from '@/lib/date-time';
import { cn } from 'cn';
import { ChevronRight } from 'lucide-react';
import { useMemo, useState } from 'react';

type Props = { interaction: MedicineInteraction }

function InteractionTranslations({ interaction }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger render={<div>
          <div className={cn('flex flex-col gap-2 md:flex-row md:items-center justify-between w-full p-3 md:px-6 rounded-2xl cursor-pointer hover:bg-gray-50')}
          >
            <div className='flex items-center gap-3'>
              <div>
                <p className='text-gray-400 text-xs uppercase'>{interaction?.severity}</p>
                <p className='capitalize text-lg font-bold'>{interaction?.drug_a_name} & {interaction?.drug_b_name}</p>
              </div>
            </div>

            <Button variant={"outline"} className={"flex items-center gap-2 rounded-full p-4 border border-primary text-sm w-fit"}>
              View Details <ChevronRight />
            </Button>
          </div>
        </div>} />
        <DialogContent className="sm:max-w-3xl">
          <Translations interaction={interaction} />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default InteractionTranslations


const Translations = ({ interaction }: Props) => {

  const [language, setLanguage] = useState("en");
  const languagesData = useFetchData(
    [queryKeys.getAllLanguages],
    `languages/`,
  )
  const languages: Language[] = languagesData.data

  const medicineLanguages = interaction?.translations?.map((translation) => {
    const language = languages?.find(
      (lang) => lang.code === translation?.language_code
    );

    return {
      native_name: language?.native_name,
      language_code: translation.language_code,
    };
  });
  const interactionTranslation = useMemo(() => {
    return interaction?.translations?.filter((tr) => tr?.language_code === language)[0]
  }, [language, interaction])
  const hasTranslation = interactionTranslation &&
    typeof interactionTranslation === "object" &&
    Object.keys(interactionTranslation).length > 0


  return <div className='flex flex-col gap-3 w-full'>
    <div className="flex flex-col gap-5 rounded-md p-3">
      <div className='flex items-center gap-3'>
        <div>
          <span className={cn('uppercase text-xs text-gray-400')}>{interaction?.severity}</span>
          <p className='capitalize text-lg font-bold'>{interaction?.drug_a_name} & {interaction?.drug_b_name}</p>
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
        <TitleValueCard title="Last Updated At" value={formatDate(interaction?.updated_at)} />
      </div>

      {hasTranslation &&
        <div className={cn('p-3')}>
          <p className='capitalize text-lg font-bold'>{interactionTranslation.explanation}</p>
          <p className={cn('text-gray-400')}>{interactionTranslation.recommended_action}</p>
        </div>
      }
    </div>
  </div>
}