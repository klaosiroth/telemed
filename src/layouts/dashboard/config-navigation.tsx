import { useMemo } from 'react';
// routes
import { paths } from 'src/routes/paths';
// components
import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
  // OR
  // <Iconify icon="fluent:mail-24-filled" />
  // https://icon-sets.iconify.design/solar/
  // https://www.streamlinehq.com/icons
);

const ICONS = {
  job: icon('ic_job'),
  blog: icon('ic_blog'),
  chat: icon('ic_chat'),
  mail: icon('ic_mail'),
  user: icon('ic_user'),
  file: icon('ic_file'),
  lock: icon('ic_lock'),
  tour: icon('ic_tour'),
  order: icon('ic_order'),
  label: icon('ic_label'),
  blank: icon('ic_blank'),
  kanban: icon('ic_kanban'),
  folder: icon('ic_folder'),
  banking: icon('ic_banking'),
  booking: icon('ic_booking'),
  invoice: icon('ic_invoice'),
  product: icon('ic_product'),
  calendar: icon('ic_calendar'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  menuItem: icon('ic_menu_item'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
};

// ----------------------------------------------------------------------

export function useNavData() {
  const data = useMemo(
    () => [
      // OVERVIEW
      // ----------------------------------------------------------------------
      {
        subheader: 'overview v1.0.0',
        items: [
          {
            title: 'สรุป',
            path: paths.dashboard.root,
            icon: ICONS.dashboard,
            roles: ['admin'],
          },
          // { title: 'analytics', path: paths.dashboard.three, icon: ICONS.analytics },
        ],
      },

      // OPERATIONS
      // ----------------------------------------------------------------------
      {
        subheader: 'operation',
        items: [
          {
            title: 'ปฏิบัติภารกิจ',
            path: paths.dashboard.case.new,
            icon: ICONS.menuItem,
            roles: ['user', 'ambulance'],
          },
        ],
      },

      // MANAGEMENT
      // ----------------------------------------------------------------------
      {
        subheader: 'management',
        items: [
          {
            title: 'ข้อมูลปฏิบัติภารกิจ',
            path: paths.dashboard.caseAdmin.root,
            icon: ICONS.menuItem,
            roles: ['admin'],
          },
          {
            title: 'ข้อมูลรถพยาบาล',
            path: paths.dashboard.ambulance.root,
            icon: ICONS.menuItem,
            roles: ['admin'],
          },
          {
            title: 'ข้อมูลยา',
            path: paths.dashboard.drug.root,
            icon: ICONS.menuItem,
            roles: ['admin'],
          },
          {
            title: 'ข้อมูลกลุ่มยา',
            path: paths.dashboard.drugCategory.root,
            icon: ICONS.menuItem,
            roles: ['admin'],
          },
          {
            title: 'ข้อมูลผู้ป่วย',
            path: paths.dashboard.patient.root,
            icon: ICONS.menuItem,
            roles: ['admin'],
          },
          {
            title: 'ข้อมูลผู้ใช้',
            path: paths.dashboard.user.root,
            icon: ICONS.menuItem,
            roles: ['admin'],
          },
        ],
      },
    ],
    []
  );

  return data;
}
