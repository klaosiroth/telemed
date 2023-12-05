// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
};

// ----------------------------------------------------------------------

export const paths = {
  minimalUI: 'https://mui.com/store/items/minimal-dashboard/', // TODO: Remove this when production is finished
  userManual: 'https://google.com/',
  // AUTH
  auth: {
    jwt: {
      login: `${ROOTS.AUTH}/jwt/login`,
      register: `${ROOTS.AUTH}/jwt/register`,
    },
  },
  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,
    analytics: `${ROOTS.DASHBOARD}/analytics`,
    ambulance: {
      root: `${ROOTS.DASHBOARD}/ambulance`,
      new: `${ROOTS.DASHBOARD}/ambulance/new`,
      details: (id: string) => `${ROOTS.DASHBOARD}/ambulance/${id}`,
      edit: (id: string) => `${ROOTS.DASHBOARD}/ambulance/${id}/edit`,
    },
    case: {
      root: `${ROOTS.DASHBOARD}/case`,
      new: `${ROOTS.DASHBOARD}/case/new`,
      patient: `${ROOTS.DASHBOARD}/case/patient`,
      details: (id: string) => `${ROOTS.DASHBOARD}/case/${id}`,
      edit: (id: string) => `${ROOTS.DASHBOARD}/case/${id}/edit`,
    },
    caseAdmin: {
      root: `${ROOTS.DASHBOARD}/case-admin`,
      details: (id: string) => `${ROOTS.DASHBOARD}/case-admin/${id}`,
    },
    drug: {
      root: `${ROOTS.DASHBOARD}/drug`,
      new: `${ROOTS.DASHBOARD}/drug/new`,
      edit: (id: string) => `${ROOTS.DASHBOARD}/drug/${id}/edit`,
    },
    drugCategory: {
      root: `${ROOTS.DASHBOARD}/drug-category`,
      new: `${ROOTS.DASHBOARD}/drug-category/new`,
      edit: (id: string) => `${ROOTS.DASHBOARD}/drug-category/${id}/edit`,
    },
    patient: {
      root: `${ROOTS.DASHBOARD}/patient`,
      new: `${ROOTS.DASHBOARD}/patient/new`,
      edit: (id: string) => `${ROOTS.DASHBOARD}/patient/${id}/edit`,
    },
  },
};
