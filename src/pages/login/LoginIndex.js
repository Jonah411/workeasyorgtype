import { Box, Grid } from "@mui/material";
import React from "react";
import OrgImg from "../../assets/images/orgImage.jpg";
import LoginForm from "../../components/login/LoginForm";

const LoginIndex = () => {
  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: 8,
      }}
    >
      <div className="login-box">
        <div className="mt-2">
          <h4 className="text-center">Login Dashboard</h4>
          <Grid container spacing={2} className="p-2">
            <Grid item xs={12} sm={9} md={8}>
              <LoginForm />
            </Grid>
            <Grid item xs={12} sm={3} md={4}>
              <img src={OrgImg} className="login-image" alt="org_Image" />
            </Grid>
          </Grid>
        </div>
      </div>
    </Box>
  );
};

export default LoginIndex;
