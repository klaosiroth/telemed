export type TableFilterValue = string;

export type TableFilters = {
  name: string;
};

// ----------------------------------------------------------------------

export type Drug = {};

export type CreateDrugDTO = {};

export type DrugCategory = {
  drugCategoryId: string;
  drugCategoryName: string;
  drugs: Drug;
  isActive: boolean;
};

export type CreateDrugCategoryDTO = {
  drugCategoryName: string;
};
