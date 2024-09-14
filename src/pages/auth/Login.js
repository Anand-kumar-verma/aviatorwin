import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FilledInput,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
import logo from '../../assets/images/logo.png';
import noise from "../../assets/images/Noise-bg.gif";
import { storeCookies } from "../../services/apiCallings";
import { endpoint } from "../../services/urls";
import { avred1 } from "../../shared/color";
import { deCryptData, enCryptData } from "../../shared/secret";



function Login() {

  const [nav, setnav] = useState('1')
  const [value, setValue] = useState("one");
  const user_id = deCryptData(localStorage.getItem("user_id"));
  const navigate = useNavigate();
  const [country, setCountry] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangesetCountry = (event) => {
    setCountry(event.target.value);
  };

  const initialValue = {
    email: "",
    password: "",
    mobile: "",
  };

  const fk = useFormik({
    initialValues: initialValue,
    onSubmit: () => {
      const reqBody = {
        email: value === "one" ? String(fk.values.mobile) : fk.values.email,
        password: fk.values.password,
      };
      if (!reqBody.password || !reqBody.email)
        return toast("Plese enter all fields");
      loginSubmit(reqBody);
    },
  });

  async function loginSubmit(reqBody) {
    try {
      const res = await axios.post(endpoint.newlogin, reqBody);
      console.log(res);
      if (res?.data?.success === "200") {
        storeCookies();
        toast(res?.data?.message);
        localStorage.setItem("user_id", enCryptData(res?.data?.data?.or_user_id));
        localStorage.setItem("or_m_user_type", enCryptData(res?.data?.data?.or_m_user_type));

        window.location.reload();
        navigate("/dashboard");
      } else {
        toast(res?.data?.msg);
      }
    } catch (e) {
      toast(e?.response?.data?.message);
    }
  }

  useEffect(() => {
    user_id &&
      navigate("/dashboard");
  }, [user_id]);

  useEffect(() => {
    const handleEnterKeyPress = (event) => {
      if (event.key === "Enter") {
        fk.handleSubmit();
      }
    };
    window.addEventListener("keydown", handleEnterKeyPress);
    return () => {
      window.removeEventListener("keydown", handleEnterKeyPress);
    };
  }, [fk]);
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
      <Box sx={{ width: '95%', margin: 'auto' }}>
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
                Log in with phone
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
                Log in with email
              </Box>
            }
          />
        </Tabs>
      </Box>
      <Box sx={{ width: "92%", margin: "auto", mt: 3 }}>
        {value === "one" && (
          <Box component="form" onSubmit={fk.handleSubmit}>
            <Stack direction="row" alignItems="center">
              <Typography
                variant="body1"
                className="fp17"
                sx={{ color: avred1 }}
              >
                Phone number
              </Typography>
            </Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box sx={{ width: "100%" }}>
                <FormControl fullWidth sx={{ ...style.inputfield }}>
                  <TextField
                    id="mobile"
                    name="mobile"
                    onChange={fk.handleChange}
                    value={fk.values.mobile}
                    label=""
                    placeholder=" Enter number"
                    fullWidth
                    type="number"
                  />
                </FormControl>
              </Box>
            </Stack>
            <Box mt={2}>
              <Stack direction="row" alignItems="center">
                <Typography
                  className="fp17"
                  sx={{ color: avred1 }}
                >
                  Password
                </Typography>
              </Stack>
              <FormControl fullWidth sx={{ ...style.passwordfield }}>
                <FilledInput
                  placeholder="Enter password"
                  id="password"
                  name="password"
                  onChange={fk.handleChange}
                  value={fk.values.password}
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff sx={{ color: avred1 }} /> : <Visibility sx={{ color: avred1 }} />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Box>
          </Box>
        )}
        {value === "two" && (
          <Box component="form" onSubmit={fk.handleSubmit}>
            <Box>
              <Stack direction="row" alignItems="center">
                <Typography
                  className="fp17"
                  sx={{ color: avred1 }}>
                  Mail
                </Typography>
              </Stack>
              <FormControl fullWidth sx={{ ...style.inputfield }}>
                <TextField
                  class="sub"
                  id="email"
                  name="email"
                  onChange={fk.handleChange}
                  value={fk.values.email}
                  label=""
                  placeholder="please input your email"
                  fullWidth
                  type="email"
                />
              </FormControl>
            </Box>
            <Box mt={2}>
              <Stack direction="row" alignItems="center">
                <Typography
                  className="fp17"
                  sx={{ color: avred1 }}>
                  Password
                </Typography>
              </Stack>
              <FormControl fullWidth sx={{ ...style.passwordfield }}>
                <FilledInput
                  placeholder="please input your password"
                  id="password"
                  name="password"
                  onChange={fk.handleChange}
                  value={fk.values.password}
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff sx={{ color: avred1 }} /> : <Visibility sx={{ color: avred1 }} />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Box>
          </Box>
        )}
        <Box mt={3}>
          <FormGroup mt={3}>
            <FormControlLabel
              sx={{ color: 'white' }}
              className="fp17"
              control={<Checkbox defaultChecked />}
              label="Remember password"
            />
          </FormGroup>
        </Box>
        <Box sx={{ width: "80%", margin: "auto", mt: 3 }}>
          <Button
            onClick={() => fk.handleSubmit()}
            sx={{
              width: "100%",
              color: 'white !important',
              mb: 2,
            }}
            disableElevation
            className={`th-btn `}
          >
            Log in
          </Button>
          <NavLink to="/register">
            <Button
              className={` th-btn2 `}
              sx={{
                width: "100%",
                borderRadius: "20px",
                fontSize: "17px",
                fontWeight: "700",
              }}
              variant="outlined"
            >
              Register
            </Button>
          </NavLink>
        </Box>
      </Box>
    </Container >
  );
}

export default Login;


const style = {
  inputfield: {
    mt: 2,
    "&>div>div>input": {
      background: "white",
      padding: '20px',
      borderRadius: "5px",
      boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",
      "&::placeholder": {
        color: "#0C072C",
        opacity: '0.5',
        fontWeight: '600',
      },
    },
    "&>div>div>fieldset ": { border: "none !important" },
    "&>div>div>input:focus": { outline: "1px solid #F18401" },
    // "sub>active>button":{background:"#eb8a1f"},

  },
  passwordfield: {
    "&>div>input": {
      background: "white",
      padding: '20px',
      borderRadius: "5px",
      boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",
      "&::placeholder": {
        color: "#0C072C",
        opacity: '0.5',
        fontWeight: '600',
      },
    },
    "&>div": {
      mt: 2,
      background: "white !important",
      boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",
      borderRadius: "5px",
    },
    "&>div::before": { border: "none !important" },
    "&>div::after:focus": {
      border: "none !important",
      border: "1px solid #F18401  !important",
    },
  },
};
