export type AddressItem = {
  id: string;
  house_no: string;
  address1: string;
  address2: string;
  lane: string;
  road: string;
  sub_district: string;
  district: string;
  province: string;
  postal_code: string;
  status: number;
  create_by: string;
  create_date: Date | string | number | null;
  update_by: string;
  update_date: Date | string | number | null;
};
