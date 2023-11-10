export type AmbulanceTableFilterValue = string;

export type AmbulanceTableFilters = {
  name: string;
};

export type Ambulance = {
  ambulanceId: string;
  ambulanceName: string;
  ambulanceDetail?: string;
  licensePlate: string;
  isActive: boolean;
  hospitalId: string;
};

export type CreateAmbulanceDTO = {
  ambulanceName: string;
  ambulanceDetail?: string;
  licensePlate: string;
};
