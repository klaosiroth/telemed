interface LabelsMap {
  [key: number]: string;
}

// eslint-disable-next-line arrow-body-style
export const getLabel = (value: number, labelsMap: LabelsMap): string => {
  return labelsMap[value] || '';
};

export const PREFIX_LABELS: LabelsMap = {
  1: 'ดช.',
  2: 'ดญ.',
  3: 'นาย',
  4: 'นางสาว',
  5: 'นาง',
  6: 'อื่นๆ',
};

export const GENDER_LABELS: LabelsMap = {
  1: 'คนไทย',
  2: 'ต่างชาติ',
  // Add more entries as needed
};

export const NATIONALITY_LABELS: LabelsMap = {
  1: 'คนไทย',
  2: 'ต่างชาติ',
  // Add more entries as needed
};

export const RELIGION_OPTIONS: LabelsMap = {
  1: 'ศาสนาพุทธ',
  2: 'ศาสนาคริสต์',
  3: 'ศาสนาอิสลาม',
  4: 'ศาสนาฮินดู',
  5: 'ลัทธิชินโต',
  6: 'ศาสนายิว',
  // Add more entries as needed
};

export const BLOOD_GROUP_LABELS: LabelsMap = {
  1: 'O',
  2: 'B',
  3: 'A',
  4: 'AB',
  // Add more entries as needed
};

export const MARRIAGE_OPTIONS: LabelsMap = {
  1: 'โสด',
  2: 'สมรส',
  3: 'หย่าร้าง/แยกทาง/เลิกกัน',
  4: 'หม้าย',
  5: 'แยกกันอยู่',
  6: 'นักบวช',
  // Add more entries as needed
};

export const PREFIX_LABELS_EN: LabelsMap = {
  1: 'Mr.',
  2: 'Mrs.',
  3: 'Miss',
  // Add more entries as needed
};

// Add more label mappings as needed

// Example usage
// import { getLabel, NATIONALITY_LABELS } from './label-mapper';

// const nationalityLabel = getLabel(1, NATIONALITY_LABELS);
// console.log(nationalityLabel); // Outputs 'คนไทย'
