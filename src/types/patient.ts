export type PatientTableFilterValue = string;

export type PatientTableFilters = {
  name: string;
};

// ----------------------------------------------------------------------

export type Patient = {
  patientId: string;
  hn: string;
  nationality: number;
  prefixTh: number;
  prefixEn: number;
  gender: number;
  birthdate: string | null;
  firstnameTh: string;
  firstnameEn: string;
  lastnameTh: string;
  lastnameEn: string;
  idcard: string;
  idcardExpireDate: Date | string | null;
  passportNo: string;
  passportExpireDate: Date | string | null;
  basePassportCountryId: string;
  bloodGroup: number;
  email: string;
  phone: string;
  mobile: string;
  marriage: number;
  religion: number;
  isActive: boolean;
};

export type CreatePatientDTO = {
  nationality: number;
  prefixTh: number;
  prefixEn: number;
  gender: number;
  birthdate: string; // Should be a valid date-time format
  firstnameTh: string;
  firstnameEn: string;
  lastnameTh: string;
  lastnameEn: string;
  idcard: string;
  idcardExpireDate: string; // Should be a valid date-time format
  passportNo: string;
  passportExpireDate: string; // Should be a valid date-time format
  basePassportCountryId: string;
  bloodGroup: number;
  email: string;
  phone: string;
  mobile: string;
  marriage: number;
  religion: number;
};
