import React, { useState } from "react";
import {
  Box,
  Drawer,
  Typography,
  Button,
  Divider,
  IconButton,
  TextField,
  MenuItem,
  Slider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SyncIcon from "@mui/icons-material/Sync"; 

const filterConfig = [
  {
    name: "name",
    label: "Name",
    type: "text",
    placeholder: "Enter name",
  },
  {
    name: "category",
    label: "Category",
    type: "select",
    options: [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
    ],
  },
  {
    name: "subcategory",
    label: "Subcategory",
    type: "select",
    options: [
      { value: "sub1", label: "Subcategory 1" },
      { value: "sub2", label: "Subcategory 2" },
    ],
  },
  {
    name: "createdAt",
    label: "Created At",
    type: "text",
    placeholder: "05-Feb-10 to 28-Feb-24",
  },
  {
    name: "updatedAt",
    label: "Updated At",
    type: "text",
    placeholder: "05-Feb-10 to 28-Feb-24",
  },
  {
    name: "price",
    label: "Price",
    type: "range",
    placeholder: "Enter price",
  },
  {
    name: "saleprice",
    label: "Sale Price",
    type: "range",
    placeholder: "Enter price",
  },
];

const FilteringDrawer = ({ open, toggleDrawer, onApplyFilters }) => {

  const [filters, setFilters] = useState({ name: "", category: "", subcategory: "", createdAt: "", updatedAt: "", price: "", saleprice: "" });

  const handleFilterChange = (field) => (e) => {
    setFilters({ ...filters, [field]: e.target.value });
  };

  const handleRangeChange = (field) => (event, newValue) => {
    setFilters({ ...filters, [field]: newValue });
  };

  const resetField = (field) => {
    setFilters({
      ...filters,
      [field]: filterConfig.find((f) => f.name === field).type === "range"
        ? [11, 100]
        : "",
    });
  };

  const clearFilters = () => {
    setFilters(filters);
  };

  const handleApplyFilters = () => {
    onApplyFilters(filters);
  };

  return (
    <Drawer anchor="right" open={open} onClose={toggleDrawer}>
      <Box
        sx={{
          width: 370,
          px: 5,
          py: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography variant="h6">Filters</Typography>
          <IconButton onClick={toggleDrawer}>
            <CloseIcon />
          </IconButton>
        </Box>

        {filterConfig.map((filter) => (
          <Box
            key={filter.name}
            sx={{ border: "1px solid lightgray", borderRadius: "5px", p: 1, mb: 2 }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                px: 1,
                alignItems: "center",
              }}
            >
              <label style={{ flex: 1 }}>{filter.label}</label>
              <IconButton onClick={() => resetField(filter.name)} sx={{ ml: 1 }}>
                <SyncIcon />
              </IconButton>
            </Box>

            {filter.type === "select" ? (
              <TextField
                select
                fullWidth
                sx={{ ml: "10px", width: "80%" }}
                value={filters[filter.name]}
                onChange={handleFilterChange(filter.name)}
                variant="outlined"
                size="small"
              >
                <MenuItem value="">{`Select ${filter.label.toLowerCase()}`}</MenuItem>
                {filter.options.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            ) : filter.type === "range" ? (
              <Slider
                sx={{ ml: "18px", mt: "30px", width: "80%" }}
                value={filters[filter.name]}
                onChange={handleRangeChange(filter.name)}
                valueLabelDisplay="auto"
                min={11}
                max={100}
              />
            ) : (
              <TextField
                sx={{ ml: "9px", width: "80%" }}
                value={filters[filter.name]}
                onChange={handleFilterChange(filter.name)}
                variant="outlined"
                placeholder={filter.placeholder || `Enter ${filter.label.toLowerCase()}`}
                size="small"
              />
            )}
          </Box>
        ))}

        <Divider sx={{ my: 2 }} />

        <Button
          variant="outlined"
          fullWidth
          sx={{ mb: 2, height: "50px" }}
          onClick={clearFilters}
        >
          Clear Filters
        </Button>

        <Button
          variant="contained"
          sx={{ height: "50px" }}
          fullWidth
          onClick={handleApplyFilters}
        >
          Apply Filters
        </Button>
      </Box>
    </Drawer>
  );
};

export default FilteringDrawer;
