import {
  Box,
  Container,
  Typography
} from "@mui/material";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useFormik } from "formik";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import backbtn from "../../assets/images/backBtn.png";
import logemailactive from "../../assets/images/logemailactive.png";
import logemaildeactive from "../../assets/images/maill.jpg";
import logphoneactive from "../../assets/images/logophoneactive.jpg";
import logphonedeactive from "../../assets/images/Phone.jpg";
import { signupSchemaValidataon } from "../../services/validation";
import RegistrationByEmail from "./RegistrationByEmail";
import RegistrationByMobile from "./RegistrationByMobile";
import logo from '../../assets/images/logo.png'
import noise from "../../assets/images/Noise-bg.gif";
import { avred1 } from "../../shared/color";

function Login() {
  const [value, setValue] = useState("one");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const initialValue = {
    email: "",
    password: "",
    mobile: "",
  };

  const fk = useFormik({
    initialValues: initialValue,
    validationSchema: signupSchemaValidataon,
    onSubmit: () => {
      console.log(fk.values);
      // loginSubmit(fk.values);
    },
  });

  return (
    <Container sx={{
      backgroundColor: '#111410',
      backgroundImage: `url(${noise})`,
      backgroundPosition: 'left top',
      backgroundSize: 'auto',
      backgroundRepeat: 'repeat',
      backgroundAttachment: 'scroll',
      minHeight: '100vh',
    }}>

      <Box
        sx={{
          padding: 1,
          px: 2,
          "&>p": { color: "white" },
        }}
      >
        <Box sx={{
          width: '200px',
          margin: 'auto',
          padding: '21px 0px',
          transform: 'rotate(5deg)',
        }} component='img' src={logo}></Box>
      </Box>
      <Box sx={{ width: "92%", margin: "auto" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          sx={{
            '& .MuiTabs-indicator': {
              backgroundColor: 'transparent',
            },
          }}
        >
          <Tab
            sx={{
              clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)',
              width: '50%',
              color: 'white !important',
              backgroundColor: value === 'one' ? avred1 : '',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: avred1,
              },
            }}
            value="one"
            label={
              <Box className="fp15">
                Register your phone
              </Box>
            }
          />
          <Tab
            sx={{
              clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)',
              width: '50%',
              color: 'white !important',
              backgroundColor: value === 'two' ? avred1 : '',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: avred1,
              },
            }}
            value="two"
            label={
              <Box className="fp15">
                Email registration
              </Box>
            }
          />
        </Tabs>
      </Box>
      <Box sx={{ width: "92%", margin: "auto", mt: 3 }}>
        {value === "one" && <RegistrationByMobile />}
        {value === "two" && <RegistrationByEmail />}
      </Box>
    </Container>
  );
}

export default Login;
