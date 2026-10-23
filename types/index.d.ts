type Language = {
  id: string;
  code: string;
  name: string;
  native_name: string;
  is_active: boolean;
};

type Category = {
  id: string;
  slug: string;
  translations: {
    id: string;
    language: string;
    language_code: string;
    category: string;
    name: string;
    description: string;
  }[];
};

type MedicineTranslation = {
  language: Language;
  language_code: string;
  display_name: string;
  short_description: string;
  what_it_treats: string;
  how_to_use: string;
  when_to_use: string;
  side_effects: string;
  warnings: string;
  storage_instructions: string;
  review_status: "draft" | "reviewed" | "published";
};

type Medicine = {
  id: string;
  generic_name: string;
  brand_name: string;
  strength: string;
  dosage_form: string;
  categories: string[];
  translations: MedicineTranslation[];
};
