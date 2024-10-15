import React, { useEffect, useState } from "react";
import {
  useGetAllOrgQuery,
  useSigninMutation,
} from "../../Server/Reducer/authApi";
import {
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import { Visibility, VisibilityOff, Clear } from "@mui/icons-material";
import { CommonAlert } from "../../common/CommonAlert";

const LoginForm = () => {
  const { data: orgData, isLoading: orgLoading } = useGetAllOrgQuery("", {
    refetchOnMountOrArgChange: false,
    skip: false,
  });
  const [signin] = useSigninMutation();
  const [orgList, setOrgList] = useState([]);
  useEffect(() => {
    if (orgData) {
      // const userDatas = getDecryptData(orgData?.data);
      setOrgList(orgData?.data);
    }
  }, [orgData]);

  const [formValue, setFormValue] = useState({
    org: "",
    orgType: "",
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState({});
  const [orgTypeList, setOrgTypeList] = useState([]);

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogin = () => {
    const error = {};
    if (!formValue?.org) {
      error.org = "Organization is required!.";
    }
    if (!formValue?.orgType) {
      error.orgType = "Organization Type is required!.";
    }
    if (!formValue?.email) {
      error.email = "Email is required!.";
    }
    if (!formValue?.password) {
      error.password = "Password is required!.";
    }

    if (Object.keys(error).length === 0) {
      setFormError({});
      signin(formValue);
    } else {
      setFormError(error);
      Object.keys(error).map((li) => CommonAlert(error[li], "error"));
    }
  };

  return (
    <div>
      {orgLoading ? (
        <div style={{ display: "flex", alignItems: "center" }}>
          <CircularProgress size={24} style={{ marginRight: 10 }} />
          Loading...
        </div>
      ) : (
        <FormControl fullWidth className="mt-4">
          <InputLabel id="demo-simple-select-label">Organization</InputLabel>
          <Select
            id="outlined-basic"
            label="Organization Name"
            variant="outlined"
            defaultValue=""
            onChange={(e) => {
              setFormValue({ ...formValue, org: e.target.value });
              const newList = orgList?.find((li) => li?._id === e.target.value);
              setOrgTypeList(newList?.orgType);
            }}
          >
            <MenuItem value="1">Select</MenuItem>
            {orgList?.map((option) => (
              <MenuItem key={option?._id} value={option?._id}>
                {option?.orgName}
              </MenuItem>
            ))}
          </Select>
          {formError?.org && (
            <FormHelperText error>{formError?.org}</FormHelperText>
          )}
        </FormControl>
      )}
      <FormControl fullWidth className="mt-4">
        <InputLabel id="demo-simple-select-label">Organization Type</InputLabel>
        <Select
          id="outlined-basic"
          label="Organization Name"
          variant="outlined"
          defaultValue=""
          onChange={(e) => {
            setFormValue({ ...formValue, orgType: e.target.value });
          }}
        >
          <MenuItem value="1">Select</MenuItem>
          {orgTypeList?.map((option) => (
            <MenuItem key={option?._id} value={option?._id}>
              {option?.tName}
            </MenuItem>
          ))}
        </Select>
        {formError?.orgType && (
          <FormHelperText error>{formError?.orgType}</FormHelperText>
        )}
      </FormControl>
      <FormControl fullWidth className="mt-4">
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          value={formValue?.email}
          onChange={(e) => {
            setFormValue({ ...formValue, email: e.target.value });
          }}
        />
        {formError?.email && (
          <FormHelperText error>{formError?.email}</FormHelperText>
        )}
      </FormControl>
      <FormControl fullWidth className="mt-4">
        <InputLabel id="demo-simple-select-label">Password</InputLabel>
        <OutlinedInput
          id="outlined-basic"
          label="Password"
          variant="outlined"
          value={formValue?.password ? formValue?.password : ""}
          onChange={(e) => {
            setFormValue({ ...formValue, password: e.target.value });
          }}
          type={showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
              <IconButton
                aria-label="clear password"
                onClick={() => {
                  setFormValue({ ...formValue, password: "" });
                }}
                edge="end"
              >
                <Clear />
              </IconButton>
            </InputAdornment>
          }
        />
        {formError?.password && (
          <FormHelperText error>{formError?.password}</FormHelperText>
        )}
      </FormControl>
      <FormControl fullWidth className="mt-4">
        <Button
          variant="contained"
          size="large"
          className="p-3"
          onClick={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          Login
        </Button>
      </FormControl>
    </div>
  );
};

export default LoginForm;
