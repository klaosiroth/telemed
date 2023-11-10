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
import { Drug, TableFilters, TableFilterValue } from 'src/types/drug';
import axiosInstance, { API_ENDPOINTS } from 'src/utils/axios';
import DrugTableRow from '../drug-table-row';
import DrugTableToolbar from '../drug-table-toolbar';
import DrugTableFiltersResult from '../drug-table-filters-result';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'drugId', label: '#' },
  { id: 'drugCategoryName', label: 'หมวดยา' },
  { id: 'drugName', label: 'ชื่อยา' },
  { id: 'drugGenericName', label: 'ชื่อสามัญทางยา' },
  { id: 'createAt', label: 'วันที่' },
  { id: '', label: 'จัดการ', align: 'center', width: 88 },
];

const defaultFilters = {
  name: '',
};

// ----------------------------------------------------------------------

export default function DrugListView() {
  const router = useRouter();
  const settings = useSettingsContext();
  const table = useTable({ defaultOrderBy: 'id' });

  const [tableData, setTableData] = useState<Drug[]>([]);
  const [filters, setFilters] = useState(defaultFilters);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(API_ENDPOINTS.drugs);
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
    (name: string, value: TableFilterValue) => {
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
      router.push(paths.dashboard.drug.edit(id));
    },
    [router]
  );

  const handleDeleteRow = useCallback(
    async (id: string) => {
      await axiosInstance.delete(`${API_ENDPOINTS.drugs}/${id}`);

      const deleteRow = tableData.filter((row) => row.drugId !== id);
      setTableData(deleteRow);

      table.onUpdatePageDeleteRow(dataInPage.length);
    },
    [dataInPage.length, table, tableData]
  );

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <TitleBar
        heading="รายการข้อมูลยา"
        action={
          <Button
            component={RouterLink}
            href={paths.dashboard.drug.new}
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            เพิ่ม
          </Button>
        }
      />

      <Card>
        <DrugTableToolbar filters={filters} onFilters={handleFilters} />
        {canReset && (
          <DrugTableFiltersResult
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
                    <DrugTableRow
                      key={row.drugId}
                      index={index}
                      row={row}
                      onEditRow={() => handleEditRow(row.drugId)}
                      onDeleteRow={() => handleDeleteRow(row.drugId)}
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
  inputData: Drug[];
  comparator: (a: any, b: any) => number;
  filters: TableFilters;
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
      (data) => data.drugName.toLowerCase().indexOf(name.toLowerCase()) !== -1
    );
  }

  return inputData;
}
