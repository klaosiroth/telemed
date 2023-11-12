'use client';

import { useCallback, useEffect, useState } from 'react';
import isEqual from 'lodash/isEqual';
// @mui
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
// routes
import { RouterLink } from 'src/routes/components';
import { useRouter } from 'src/routes/hook';
import { paths } from 'src/routes/paths';
// components
import TitleBar from 'src/components/title-bar';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { useSettingsContext } from 'src/components/settings';
import {
  useTable,
  getComparator,
  emptyRows,
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
  TablePaginationCustom,
} from 'src/components/table';
//
import axiosInstance, { API_ENDPOINTS } from 'src/utils/axios';
import { Patient, PatientTableFilterValue, PatientTableFilters } from 'src/types/patient';
import PatientTableRow from '../patient-table-row';
import PatientTableToolbar from '../patient-table-toolbar';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'unique0', label: '#' },
  { id: 'unique1', label: 'HN' },
  { id: 'unique2', label: 'ชื่อผู้ป่วย' },
  { id: 'unique3', label: 'วันเกิด' },
  { id: 'unique4', label: 'อายุ' },
  { id: 'unique5', label: 'สัญชาติ' },
  { id: 'unique6', label: 'เบอร์มือถือ' },
  { id: 'unique7', label: 'สร้างเมื่อ' },
  { id: 'unique8', label: 'สถานะ' },
  { id: '', label: 'จัดการ', width: 88 },
];

const defaultFilters = {
  name: '',
};

// ----------------------------------------------------------------------

export default function PatientListView() {
  const settings = useSettingsContext();
  const router = useRouter();
  const table = useTable({ defaultOrderBy: 'hn' });
  const [tableData, setTableData] = useState<Patient[]>([]);
  const [filters, setFilters] = useState(defaultFilters);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axiosInstance.get(API_ENDPOINTS.patients);
        console.log('response', response.data);
        setTableData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters,
  });
  const dataInPage = dataFiltered.slice(
    table.page * table.rowsPerPage,
    table.page * table.rowsPerPage + table.rowsPerPage
  );
  const denseHeight = table.dense ? 52 : 72;
  const canReset = !isEqual(defaultFilters, filters);
  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  const handleFilters = useCallback(
    (name: string, value: PatientTableFilterValue) => {
      table.onResetPage();
      setFilters((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    [table]
  );

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  const handleEditRow = useCallback(
    (id: string) => {
      router.push(paths.dashboard.patient.edit(id));
    },
    [router]
  );

  const handleDeleteRow = useCallback(
    async (id: string) => {
      await axiosInstance.delete(`${API_ENDPOINTS.patients}/${id}`);

      const deleteRow = tableData.filter((row) => row.patientId !== id);
      setTableData(deleteRow);

      table.onUpdatePageDeleteRow(dataInPage.length);
    },
    [dataInPage.length, table, tableData]
  );

  console.log('tableData', tableData);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <TitleBar
        heading="รายการข้อมูลผู้ป่วย"
        action={
          <Button
            component={RouterLink}
            href={paths.dashboard.patient.new}
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            เพิ่ม
          </Button>
        }
      />

      <Card>
        <PatientTableToolbar
          filters={filters}
          onFilters={handleFilters}
          canReset={canReset}
          onResetFilters={handleResetFilters}
        />

        <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
          <Scrollbar>
            <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
              <TableHeadCustom headLabel={TABLE_HEAD} rowCount={tableData.length} />

              <TableBody>
                {dataFiltered
                  .slice(
                    table.page * table.rowsPerPage,
                    table.page * table.rowsPerPage + table.rowsPerPage
                  )
                  .map((row, index) => (
                    <PatientTableRow
                      key={row.patientId}
                      index={index}
                      row={row}
                      onEditRow={() => handleEditRow(row.patientId)}
                      onDeleteRow={() => handleDeleteRow(row.patientId)}
                    />
                  ))}

                <TableEmptyRows
                  height={denseHeight}
                  emptyRows={emptyRows(table.page, table.rowsPerPage, tableData.length)}
                />

                <TableNoData notFound={notFound} />
              </TableBody>
            </Table>
          </Scrollbar>
        </TableContainer>

        <TablePaginationCustom
          count={dataFiltered.length}
          page={table.page}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          onRowsPerPageChange={table.onChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}

// ----------------------------------------------------------------------

function applyFilter({
  inputData,
  comparator,
  filters,
}: {
  inputData: Patient[];
  comparator: (a: any, b: any) => number;
  filters: PatientTableFilters;
}) {
  const { name } = filters;

  const stabilizedThis = inputData.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (name) {
    inputData = inputData.filter(
      (data) => data.firstnameTh.toLowerCase().indexOf(name.toLowerCase()) !== -1
    );
  }

  return inputData;
}
