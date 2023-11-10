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
import { Ambulance, AmbulanceTableFilterValue, AmbulanceTableFilters } from 'src/types/ambulance';
import axiosInstance, { API_ENDPOINTS } from 'src/utils/axios';
import TitleBar from 'src/components/title-bar';
import AmbulanceTableRow from '../ambulance-table-row';
import AmbulanceTableToolbar from '../ambulance-table-toolbar';
import AmbulanceTableFiltersResult from '../ambulance-table-filters-result';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'ambulanceId', label: '#', align: 'center', width: 60 },
  { id: 'ambulanceName', label: 'รถพยาบาล' },
  { id: '', label: 'จัดการ', align: 'center', width: 88 },
];

const defaultFilters = {
  name: '',
};

// ----------------------------------------------------------------------

export default function AmbulanceListView() {
  const router = useRouter();
  const settings = useSettingsContext();
  const table = useTable({ defaultOrderBy: 'id' });

  const [tableData, setTableData] = useState<Ambulance[]>([]);
  const [filters, setFilters] = useState(defaultFilters);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(API_ENDPOINTS.ambulances);
        console.log('response', response.data);
        setTableData(response.data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
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
    (name: string, value: AmbulanceTableFilterValue) => {
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

  const handleViewRow = useCallback(
    (id: string) => {
      router.push(paths.dashboard.ambulance.details(id));
    },
    [router]
  );

  const handleEditRow = useCallback(
    (id: string) => {
      router.push(paths.dashboard.ambulance.edit(id));
    },
    [router]
  );

  const handleDeleteRow = useCallback(
    async (id: string) => {
      await axiosInstance.delete(`${API_ENDPOINTS.ambulances}/${id}`);

      const deleteRow = tableData.filter((row) => row.ambulanceId !== id);
      setTableData(deleteRow);

      table.onUpdatePageDeleteRow(dataInPage.length);
    },
    [dataInPage.length, table, tableData]
  );

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <TitleBar
        heading="รายการข้อมูลรถพยาบาล"
        action={
          <Button
            component={RouterLink}
            href={paths.dashboard.ambulance.new}
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            เพิ่ม
          </Button>
        }
      />

      <Card>
        <AmbulanceTableToolbar filters={filters} onFilters={handleFilters} />
        {canReset && (
          <AmbulanceTableFiltersResult
            onResetFilters={handleResetFilters}
            results={dataFiltered.length}
            sx={{ p: 2.5, pt: 0 }}
          />
        )}

        <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
          <Scrollbar>
            <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
              <TableHeadCustom
                order={table.order}
                orderBy={table.orderBy}
                rowCount={tableData.length}
                headLabel={TABLE_HEAD}
                onSort={table.onSort}
              />
              <TableBody>
                {dataFiltered
                  .slice(
                    table.page * table.rowsPerPage,
                    table.page * table.rowsPerPage + table.rowsPerPage
                  )
                  .map((row, index) => (
                    <AmbulanceTableRow
                      key={row.ambulanceId}
                      index={index}
                      row={row}
                      onViewRow={() => handleViewRow(row.ambulanceId)}
                      onEditRow={() => handleEditRow(row.ambulanceId)}
                      onDeleteRow={() => handleDeleteRow(row.ambulanceId)}
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
          //
          dense={table.dense}
          onChangeDense={table.onChangeDense}
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
  inputData: Ambulance[];
  comparator: (a: any, b: any) => number;
  filters: AmbulanceTableFilters;
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
      (data) => data.ambulanceName.toLowerCase().indexOf(name.toLowerCase()) !== -1
    );
  }

  return inputData;
}
