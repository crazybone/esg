import React from "react";
import {
  Box,
  TextField,
  Select,
  MenuItem,
  Typography,
  CircularProgress,
  FormControl,
  InputLabel,
  Button,
} from "@mui/material";

function InputForm({
  formData,
  setFormData,
  departments,
  countries,
  logos,
  loading,
  error,
}) {
  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };
  const selectedDepartment = departments.find(
    (d) => d.id === formData.department
  );
  const banners = selectedDepartment ? selectedDepartment.banners : [];

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", padding: 2 }}>
        <CircularProgress />
      </Box>
    );
  }
  if (error) {
    return (
      <Box sx={{ padding: 2 }}>
        <Typography color="error">Error: {error}</Typography>
      </Box>
    );
  }

  return (
    <Box class="form-wrapper">
      <Box class="form-container">
      <img
        className="acom-top-logo"
        //src="/assets/acomm-logo-s.jpg"
        src={`${process.env.PUBLIC_URL}/assets/acomm-logo-s.jpg`}
        alt="aCommerce"
      />
      <TextField
        label="Full Name"
        value={formData.firstName}
        onChange={handleChange("firstName")}
        variant="outlined"
        id="fullname"
        className="half-width"
      />
      <TextField
        label="Nickname"
        value={formData.nickname}
        onChange={handleChange("nickname")}
        variant="outlined"
        id="nickname"
        className="half-width"
      />
      <TextField
        label="Title"
        value={formData.position}
        onChange={handleChange("position")}
        variant="outlined"
        id="title"
        className="half-width"
      />
      <TextField
        label="Email"
        value={formData.email}
        onChange={(e) => {
          const value = e.target.value.split("@")[0];
          setFormData({ ...formData, email: value });
        }}
        variant="outlined"
        id="email"
        className="half-width"        
      />
      <Box
        id="phone-container"
        className=" half-width"
        sx={{ maxWidth: "42%", display: "flex", alignItems: "center", gap: 1 }}
      >
        <FormControl fullWidth margin="normal">
          <InputLabel id="country-label">Country</InputLabel>
          <Select
            labelId="country-label"
            id="country"
            value={formData.country}
            label="Country"
            onChange={(e) =>
              setFormData({ ...formData, country: e.target.value })
            }
          >
            {(countries || []).map((country) => (
              <MenuItem key={country.code} value={country.code}>
                <img
                  //src={country.flag}
                  src={`${process.env.PUBLIC_URL}${country.flag}`}
                  alt={country.name}
                  style={{
                    width: 24,
                    height: 16,
                    marginRight: 8,
                    verticalAlign: "middle",
                  }}
                />
                <span style={{ verticalAlign: "middle" }}>{country.code}</span>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Phone Number"
          value={formData.phoneNumber}
          onChange={handleChange("phoneNumber")}
          onInput={e => {
            e.target.value = e.target.value.replace(/\D/g, '');
          }}
          variant="outlined"
          id="phone"
          inputProps={{ maxLength: 10 }}
        />
      </Box>
      <FormControl fullWidth margin="normal">
        <InputLabel id="logo-label">Logo</InputLabel>
        <Select
          labelId="logo-label"
          id="logo"
          label="Logo"
          value={formData.logo}
          onChange={handleChange("logo")}
          displayEmpty
          renderValue={(selected) => {
            const logo = (logos || []).find((l) => l.image === selected);
            return logo ? (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <span>{logo.name}</span>
              </Box>
            ) : (
              "Select Logo"
            );
          }}
          variant="outlined"
        >
          {(logos || []).map((l) => (
            <MenuItem key={l.image} value={l.image}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <span>{l.name}</span>
              </Box>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      
      <FormControl fullWidth margin="normal">
        <InputLabel id="department-label">Departments</InputLabel>
        <Select
          labelId="department-label"
          label="Department"
          id="dept"
          value={formData.department}
          onChange={handleChange("department")}
          renderValue={(value) =>
            value
              ? departments.find((d) => d.id === value)?.departmentname ||
                "Select Department"
              : "Select Department"
          }
          variant="outlined"
        >
          {departments.map((d) => (
            <MenuItem key={d.id} value={d.id}>
              {d.departmentname}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      
      <FormControl fullWidth margin="normal">
        <InputLabel id="banner-label">Banners</InputLabel>
      <Select
        labelId="banner-label"
        label="Banners"
        id="deptBanner"
        value={formData.banner}
        onChange={handleChange("banner")}
        displayEmpty
        renderValue={(value) =>
          value
            ? banners.find((b) => b.bannerid === value)?.name || "Select Banner"
            : "Select Banner"
        }
        variant="outlined"
        disabled={!formData.department}
      >
        {banners.map((b) => (
          <MenuItem key={b.bannerid} value={b.bannerid}>
            {b.name}
          </MenuItem>
        ))}
      </Select>
      </FormControl>
      <Box  className="remark" sx={{ maxWidth: '100%', textAlign: "left", marginTop: 2 }}>
        If your department needs to have your own banner please click for <a href="https://forms.gle/wx9ZBwhSzG7YExt2A" target="_blank" rel="noopener noreferrer">Request Banner</a>
        <br/>
        or direct to email <a href="mailto:uxui@acommerce.asia">uxui@acommerce.asia</a> for more information.
      </Box>
        <Button
          variant="outlined"
          style={{ marginTop: 24 }}
          onClick={() => window.location.href = '/esdm'}
        >
          Login as Admin
        </Button>
    </Box>
    </Box>
  );
}

export default InputForm;
