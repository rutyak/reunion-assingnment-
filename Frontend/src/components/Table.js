import React, { useEffect, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  TableSortLabel,
  Paper,
  CircularProgress,
} from "@mui/material";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import { styled } from "@mui/system";
import CustomPagination from "./CustomPagination";

const Base_url = process.env.REACT_APP_BACKEND_URL;

const columns = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "name", header: "Name" },
  { accessorKey: "category", header: "Category" },
  { accessorKey: "subcategory", header: "Subcategory" },
  { accessorKey: "createdAt", header: "Created At" },
  { accessorKey: "updatedAt", header: "Updated At" },
  { accessorKey: "price", header: "Price" },
  { accessorKey: "salePrice", header: "Sale Price" },
];

const StyledSwapVertIcon = styled(SwapVertIcon)(({ active }) => ({
  color: active ? "#1976d2" : "gray",
}));

const CustomTable = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState([]);
  const [fetchedData, setFetchedData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(false);

  const table = useReactTable({
    data: fetchedData,
    columns,
    state: { globalFilter, sorting },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
  });

  const getData = async (page = 0, limit = 10) => {
    setLoading(true);
    try {
      const res = await fetch(`${Base_url}?page=${page + 1}&limit=${limit}`);
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      setFetchedData(data.data);
      setTotalCount(data.total);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData(pageIndex, pageSize);
  }, [pageIndex, pageSize]);

  return (
    <Box sx={{ paddingLeft: "10px", paddingRight: "10px", paddingTop: "10px" }}>
      <TableContainer component={Paper}>
        <Table stickyHeader aria-label="sortable table">
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableCell
                    key={header.id}
                    sx={{
                      fontWeight: "bold",
                      padding: "12px",
                      backgroundColor: "#f5f5f5",
                      borderBottom: "2px solid #e0e0e0",
                      position: "sticky",
                      top: 0,
                      zIndex: 1,
                      textAlign: "center", 
                    }}
                  >
                    {header.column.getCanSort() ? (
                      <TableSortLabel
                        active={!!header.column.getIsSorted()}
                        direction={header.column.getIsSorted() === "desc" ? "desc" : "asc"}
                        onClick={header.column.getToggleSortingHandler()}
                        IconComponent={() => (
                          <StyledSwapVertIcon active={!!header.column.getIsSorted()} />
                        )}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </TableSortLabel>
                    ) : (
                      flexRender(header.column.columnDef.header, header.getContext())
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={columns.length} sx={{ textAlign: "center" }}>
                  <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "200px" }}>
                    <CircularProgress />
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:hover": { backgroundColor: "#e3f2fd" } }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      sx={{
                        padding: "10px",
                        borderBottom: "1px solid #e0e0e0",
                        textAlign: "center",
                      }}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Box
        sx={{
          position: "fixed",
          bottom: "100px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <CustomPagination
          pageIndex={pageIndex}
          pageSize={pageSize}
          totalCount={totalCount}
          onPageChange={setPageIndex}
          onRowsPerPageChange={setPageSize}
        />
      </Box>
    </Box>
  );
};

export default CustomTable;
