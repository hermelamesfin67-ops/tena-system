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
