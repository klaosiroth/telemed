export const PREFIX_OPTIONS = [
  { value: 0, label: 'ไม่ระบุ' },
  { value: 1, label: 'ดช.' },
  { value: 2, label: 'ดญ.' },
  { value: 3, label: 'นาย' },
  { value: 4, label: 'นางสาว' },
  { value: 5, label: 'นาง' },
  { value: 6, label: 'อื่นๆ' },
];

export const NATIONALITY_OPTIONS = [
  { value: 0, label: 'ไม่ระบุ' },
  { value: 1, label: 'ไทย' },
  { value: 2, label: 'ต่างชาติ' },
];

export const GENDER_OPTIONS = [
  { value: 0, label: 'ไม่ระบุ' },
  { value: 1, label: 'ผู้ชาย' },
  { value: 2, label: 'ผู้หญิง' },
];

export const RELIGION_OPTIONS = [
  { value: 0, label: 'ไม่ระบุ' },
  { value: 1, label: 'ศาสนาพุทธ' },
  { value: 2, label: 'ศาสนาคริสต์' },
  { value: 3, label: 'ศาสนาอิสลาม' },
  { value: 4, label: 'ศาสนาฮินดู' },
  { value: 5, label: 'ลัทธิชินโต' },
  { value: 6, label: 'ศาสนายิว' },
];

export const BLOOD_GROUP_OPTIONS = [
  { value: 0, label: 'ไม่ระบุ' },
  { value: 1, label: 'A' },
  { value: 2, label: 'B' },
  { value: 3, label: 'O' },
  { value: 4, label: 'AB' },
];

export const MARRIAGE_OPTIONS = [
  { value: 0, label: 'ไม่ระบุ' },
  { value: 1, label: 'โสด' },
  { value: 2, label: 'สมรส' },
  { value: 3, label: 'หย่าร้าง/แยกทาง/เลิกกัน' },
  { value: 4, label: 'หม้าย' },
  { value: 5, label: 'แยกกันอยู่' },
  { value: 6, label: 'นักบวช' },
];

export const STATUS_OPTIONS = [
  { value: true, label: 'ใช้งาน' },
  { value: false, label: 'ไม่ใช้งาน' },
];

export const PAIN_SCORE_OPTIONS = [
  { value: 'ผู้ป่วยวิกฤต', label: 'ผู้ป่วยวิกฤต' },
  { value: 'ผู้ป่วยฉุกเฉิน', label: 'ผู้ป่วยฉุกเฉิน' },
  { value: 'ผู้ป่วยรีบด่วน', label: 'ผู้ป่วยรีบด่วน' },
  { value: 'ผู้ป่วยกึ่งรีบด่วน', label: 'ผู้ป่วยกึ่งรีบด่วน' },
  { value: 'ผู้ป่วยไม่รีบด่วน', label: 'ผู้ป่วยไม่รีบด่วน' },
];

export const PUPILS_OPTIONS = [
  { value: 'Reaction', label: 'Reaction' },
  { value: 'Sluggish', label: 'Sluggish' },
  { value: 'No Reaction', label: 'No Reaction' },
  { value: 'Close', label: 'Close' },
];

export const ARI_OPTIONS = [
  { value: 'มีไข้', label: 'มีไข้' },
  { value: 'ไอ จาม', label: 'ไอ จาม' },
  { value: 'เจ็บคอ', label: 'เจ็บคอ' },
  { value: 'คัดจมูก', label: 'คัดจมูก' },
  { value: 'มีน้ำมูก', label: 'มีน้ำมูก' },
  { value: 'มีเสมหะ', label: 'มีเสมหะ' },
];

export const EYE_OPENING_OPTIONS = [
  { value: 'E1', label: 'ไม่ลืมตา ไม่ตอบสนองต่อสิ่งกระตุ้นใดๆ' },
  { value: 'E2', label: 'ลืมตาเมื่อเจ็บ' },
  { value: 'E3', label: 'ลืมตาเมื่อเรียก' },
  { value: 'E4', label: 'ลืมตาได้เอง' },
];

export const MOTOR_RESPONSE_OPTIONS = [
  { value: 'M1', label: 'ไม่มีการเคลื่อนไหวใดๆต่อสิ่งกระตุ้น ไม่ตอบสนองต่อความเจ็บปวด' },
  { value: 'M2', label: 'ตอบสนองต่อการกระตุ้นที่ทำให้เจ็บ โดย แขน ขาเหยียดเกร็ง' },
  { value: 'M3', label: 'ตอบสนองต่อการกระตุ้นที่ทำให้เจ็บ โดย แขน ขางอเข้าผิดปกติ' },
  { value: 'M4', label: 'ตอบสนองต่อการทำให้เจ็บแบบปกติ เช่น เคลื่อนแขนขาหนี' },
  { value: 'M5', label: 'ตอบสนองต่อการทำให้เจ็บ ถูกตำแหน่งที่ทำให้เจ็บ เช่น การปัดสิ่งกระตุ้น' },
  { value: 'M6', label: 'เคลื่อนไหวได้ตามคำสั่งถูกต้อง' },
];

export const VERBAL_RESPONSE_OPTIONS = [
  { value: 'V1', label: 'ไม่พูด ไม่ส่งเสียงใดๆ' },
  { value: 'V2', label: 'ส่งเสียงอือ อา ไม่เป็นคำพูด' },
  { value: 'V3', label: 'ส่งเสียงพูดเป็นคำๆ แต่ฟังไม่รู้เรื่อง' },
  { value: 'V4', label: 'พูดเป็นคำๆ แต่ไม่ถูกต้องกับเหตุการณ์' },
  { value: 'V5', label: 'ถามตอบรู้เรื่องปกติ' },
];
