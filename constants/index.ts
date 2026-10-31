export const sections = [
  {
    title: "What it treats",
    field: "what_it_treats",
    icon: "✚",
  },
  {
    title: "When to use it",
    field: "when_to_use",
    icon: "◷",
  },
  {
    title: "How to use it",
    field: "how_to_use",
    icon: "↗",
  },
  {
    title: "Possible side effects",
    field: "side_effects",
    icon: "!",
  },
  // {
  //     title: "Warnings and precautions",
  //     field: "warnings",
  //     icon: "⚠",
  // },
  {
    title: "Storage instructions",
    field: "storage_instructions",
    icon: "⌂",
  },
] as const;

export const warningSections = [
  {
    title: "Title",
    field: "title",
    icon: "✚",
  },
  {
    title: "Description",
    field: "description",
    icon: "◷",
  },
  {
    title: "Recommended Action",
    field: "recommended_action",
    icon: "↗",
  },
] as const;

export const drugWarnings = [
  { label: "Contraindication", value: "contraindication" },
  { label: "Precaution", value: "precaution" },
  { label: "Allergy", value: "allergy" },
  { label: "Pregnancy", value: "pregnancy" },
  { label: "Breast Feeding", value: "breastfeeding" },
  { label: "Other", value: "other" },
];

export const warningBGstyle: Record<
  string,
  {
    background: string;
    text: string;
    iconBG: string;
  }
> = {
  contraindication: {
    background: "bg-red-50",
    text: "text-red-700",
    iconBG: "bg-red-200",
  },
  precaution: {
    background: "bg-blue-50",
    text: "text-blue-700",
    iconBG: "bg-blue-200",
  },
  allergy: {
    background: "bg-pink-50",
    text: "text-pink-700",
    iconBG: "bg-pink-200",
  },
  pregnancy: {
    background: "bg-orange-50",
    text: "text-orange-700",
    iconBG: "bg-orange-200",
  },
  breastfeeding: {
    background: "bg-purple-50",
    text: "text-purple-700",
    iconBG: "bg-purple-200",
  },
  other: {
    background: "bg-green-50",
    text: "text-green-700",
    iconBG: "bg-green-200",
  },
};

export const warningTitleSubTitle: Record<
  string,
  {
    title: string;
    subTitle: string;
  }
> = {
  contraindication: {
    title: "Do not use this medicine",
    subTitle:
      "This medicine may be unsafe for certain conditions or situations.",
  },
  precaution: {
    title: "Use with caution",
    subTitle: "Review possible side effects and interactions before use.",
  },
  allergy: {
    title: "Allergy information",
    subTitle: "Check ingredients and allergy-related risks before taking.",
  },
  pregnancy: {
    title: "Pregnancy considerations",
    subTitle: "Consult a healthcare professional before using during pregnancy.",
  },
  breastfeeding: {
    title: "Breastfeeding considerations",
    subTitle: "Check whether this medicine may pass into breast milk.",
  },
  other: {
    title: "Additional safety information",
    subTitle: "Review other important information about using this medicine safely.",
  },
};
