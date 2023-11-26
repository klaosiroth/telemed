export type ICase = {
  caseNo?: string;
  prefixModal: number;
  firstname?: string;
  lastname?: string;
  birthdate?: Date | string | null;
  idcard?: string;
  idcardExpireDate?: Date | string | null;
  passportNo?: string;
  passportExpireDate?: Date | string | null;
  phone?: string;
  mobile?: string;
  isActive?: boolean;
  severityLevel: number;
};

export type Case = {
  caseId: string;
  prefixModal: number;
  firstname: string;
  lastname: string;
  birthdate: null;
  idcard: string;
  idcardExpireDate: null;
  passportNo: string;
  passportExpireDate: null;
  phone: string;
  mobile: string;
  severityLevel: number;
  isActive: boolean;
  ambulanceId: null;
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: null;
  deletedAt: null;
  deletedBy: null;
  caseMissions: CaseMission[];
};

export type CaseMission = {
  caseMissionId: string;
  caseId: string;
  prefixModal: number;
  dateStartMission: Date;
  dateArriveIncident: null;
  dateLeavingScene: null;
  dateArriveHospital: null;
  dateEndMission: null;
  dateCancle: null;
};

export type CreateCaseDTO = {
  caseNo: string;
  prefixModal?: number;
  firstname?: string;
  lastname?: string;
  birthdate?: string;
  idcard?: string;
  idcardExpireDate?: string;
  passportNo?: string;
  passportExpireDate?: string;
  phone?: string;
  mobile?: string;
  isActive?: boolean;
  severityLevel?: string;
};

export type CreateCaseMissionDTO = {
  caseId: string;
  prefixModal: number;
  dateStartMission?: Date | string;
  dateArriveIncident?: Date | string;
  dateLeavingScene?: Date | string;
  dateArriveHospital?: Date | string;
  dateEndMission?: Date | string;
  dateCancle?: Date | string;
};
