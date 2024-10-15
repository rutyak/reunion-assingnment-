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
  Typography,
} from "@mui/material";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import { styled } from "@mui/system";
import CustomPagination from "./CustomPagination"; 

// Columns Definition
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

// Custom styled icon for sorting
const StyledSwapVertIcon = styled(SwapVertIcon)(({ active }) => ({
  color: active ? "#1976d2" : "gray",
}));

const CustomTable = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState([]);
  const [fetchedData, setFetchedData] = useState([]);
  const [totalCount, setTotalCount] = useState(0); // To store total count of records
  const [pageIndex, setPageIndex] = useState(0); // Current page index
  const [pageSize, setPageSize] = useState(10); // Records per page

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
    try {
      const res = await fetch(`http://localhost:8000/fetch/data?page=${page + 1}&limit=${limit}`);
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      setFetchedData(data.data); // Assuming your API returns data in the format { data: [...], total: ... }
      setTotalCount(data.total); // Set total count of records from response
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData(pageIndex, pageSize); // Fetch data whenever pageIndex or pageSize changes
  }, [pageIndex, pageSize]);

  return (
    <Box sx={{ paddingLeft: "20px", paddingRight: "20px", paddingTop: "20px" }}>
      <Typography
        variant="h6"
        sx={{
          mb: 3,
          textAlign: "center",
          fontWeight: "bold",
          color: "#333",
          textTransform: "uppercase",
          letterSpacing: "1.2px",
        }}
      >
        Product List
      </Typography>

      <TableContainer
        component={Paper}
        sx={{
          borderRadius: "10px",
          boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)",
          maxHeight: "500px",
        }}
      >
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
            {table.getRowModel().rows.map((row, index) => (
              <TableRow
                key={row.id}
                sx={{
                  backgroundColor: index % 2 === 0 ? "#fafafa" : "#f1f1f1", // Zebra striping
                  "&:hover": { backgroundColor: "#e3f2fd" }, // Row hover effect
                }}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    sx={{
                      padding: "10px",
                      borderBottom: "1px solid #e0e0e0",
                      textAlign: cell.column.id === "price" || cell.column.id === "salePrice" ? "right" : "left", 
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ mt: 2 }}>
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
