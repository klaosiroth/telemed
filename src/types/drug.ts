export type TableFilterValue = string;

export type TableFilters = {
  name: string;
};

// ----------------------------------------------------------------------

export type Drug = {
  drugId: string;
  drugName: string;
  drugDetail: string;
  drugGenericName: string;
  isActive: boolean;
  drugCategory: DrugCategory;
  drugCategoryId: string;
  createdAt: string;
};

export type CreateDrugDTO = {
  drugName: string;
  drugDetail: string;
  drugGenericName: string;
  drugCategoryId?: string;
};

export type DrugCategory = {
  drugCategoryId: string;
  drugCategoryName: string;
  drugs: Drug;
  isActive: boolean;
  createdAt: string;
};

export type CreateDrugCategoryDTO = {
  drugCategoryName: string;
};
