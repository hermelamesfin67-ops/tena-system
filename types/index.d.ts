type Language = {
  id: string;
  code: string;
  name: string;
  native_name: string;
  is_active: boolean;
};

type CategoryTranslation = {
  id: string;
  language: string;
  language_code: string;
  category: string;
  name: string;
  description: string;
};

type Category = {
  id: string;
  slug: string;
  translations: CategoryTranslation[];
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

type MedicineStatus = 'Published' | 'In review' | 'Draft';
type Medicine = {
  id: string;
  generic_name: string;
  brand_name: string;
  strength: string;
  dosage_form: string;
  status: string;
  updated_at: Date;
  categories: string[];
  translations: MedicineTranslation[];
};

type MedicineInteractionTranslation = {
  id: 4;
  language: 2;
  language_code: string;
  explanation: string;
  recommended_action: string;
  review_status: string;
  reviewed_by: string;
  reviewed_at: string;
  updated_at: Date;
};

type MedicineInteraction = {
  id: string;
  drug_a: string;
  drug_b: string;
  severity: string;
  sources: string[];
  review_status: string;
  translations: MedicineInteractionTranslation[];
  created_at: Date;
  updated_at: Date;
};
