import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FilterListIcon from "@mui/icons-material/FilterList";
import LayersIcon from "@mui/icons-material/Layers";
import SwapVertIcon from "@mui/icons-material/SwapVert";

const Navbar = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [filter, setFilter] = useState("");

  const handleSearchChange = (event) => {
    const value = event.target.value || "";
    setGlobalFilter(value);
    setFilter(value);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "end",
        alignItems: "center",
        gap: "15px", // Increased gap for cleaner spacing
        margin: "15px 20px", // Added margin for spacing from edges
      }}
    >
      {/* Search Field */}
      <TextField
        variant="outlined"
        placeholder="Search"
        value={globalFilter || ""}
        onChange={handleSearchChange}
        sx={{
          width: "240px", // Adjusted width for better appearance
          "& .MuiOutlinedInput-root": {
            borderRadius: "25px", // Rounded search bar for modern look
            paddingRight: 1,
          },
          "& .MuiOutlinedInput-input": {
            padding: "8px 14px", // Compact padding inside the input
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: "gray" }} />
            </InputAdornment>
          ),
        }}
      />

      {/* Icons */}
      <div>
        <IconButton
          sx={{
            color: "gray",
            "&:hover": { color: "#1976d2" }, // Hover effect for icons
            transition: "color 0.3s",
          }}
        >
          <VisibilityIcon />
        </IconButton>
        <IconButton
          sx={{
            color: "gray",
            "&:hover": { color: "#1976d2" },
            transition: "color 0.3s",
          }}
        >
          <SwapVertIcon />
        </IconButton>
        <IconButton
          sx={{
            color: "gray",
            "&:hover": { color: "#1976d2" },
            transition: "color 0.3s",
          }}
        >
          <FilterListIcon />
        </IconButton>
        <IconButton
          sx={{
            color: "gray",
            "&:hover": { color: "#1976d2" },
            transition: "color 0.3s",
          }}
        >
          <LayersIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default Navbar;
