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
    drugCategory: {
      root: `${ROOTS.DASHBOARD}/drug-category`,
      new: `${ROOTS.DASHBOARD}/drug-category/new`,
      edit: (id: string) => `${ROOTS.DASHBOARD}/drug-category/${id}/edit`,
    },
  },
};
