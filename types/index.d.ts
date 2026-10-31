type TranslationAction = "create" | "update";
type Pharmacist = {
  id: string;
  email: string;
  username: string;
  password: string;
};
type Language = {
  id: string;
  code: string;
  name: string;
  native_name: string;
  is_active: boolean;
};

type CategoryTranslation = {
  id: string;
  language: Language;
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
  id: string;
  drug?: string;
  language: Language;
  language_code: string;
  display_name: string;
  short_description: string;
  what_it_treats: string;
  how_to_use: string;
  when_to_use: string;
  side_effects: string;
  storage_instructions: string;
  rejection_reason: string;
  updated_at: Date;
  review_status: "draft" | "reviewed" | "published";
};

type MedicineWarningTranslation = {
  id: string;
  warning: string;
  language: string;
  language_code: string;
  title: string;
  description: string;
  recommended_action: string;
  review_status: string;
  rejection_reason: string;
  reviewed_by: string;
  reviewed_at: string;
  updated_at: Date;
};

type MedicineStatus = "Published" | "In review" | "Draft";
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
  drug_a_name: string;
  drug_b: string;
  drug_b_name: string;
  severity: string;
  sources: string[];
  review_status: string;
  translations: MedicineInteractionTranslation[];
  created_at: Date;
  updated_at: Date;
};

type MedicineWarning = {
  id: string;
  drug: string;
  warning_type: string;
  sources: [];
  review_status: string;
  rejection_reason: string;
  translations: MedicineWarningTranslation[];
  created_at: Date;
  updated_at: Date;
};

type AddLanguage = {
  native_name: string;
  language_code: string;
  id: string;
};

type medicineWarning = "contraindication" |"precaution" |"allergy"|"pregnancy" |"breastfeeding" |"other"
