import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  FilledInput,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import invite from "../../assets/images/invitee.jpg";
import password from "../../assets/images/psw.jpg";
import phoneaa from "../../assets/images/Phone.jpg";
import { storeCookies } from "../../services/apiCallings";
import { endpoint } from "../../services/urls";
import { signupSchemaValidataon } from "../../services/validation";
import theme from "../../utils/theme";
import CustomCircularProgress from "../../shared/loder/CustomCircularProgress";
import { avred1 } from "../../shared/color";
const RegistrationByMobile = () => {
  const [username, setusername] = useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [country, setCountry] = React.useState("");
  const navigate = useNavigate();
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [isLoading, setisLoding] = useState(false);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChangesetCountry = (event) => {
    setCountry(event.target.value);
  };
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const inviteid = params.get("inviteid");
  const initialValue = {
    invite_code: inviteid || "",
    password: "",
    confirmed_password: "",
    mobile: "",
    name: "",
  };

  const fk = useFormik({
    initialValues: initialValue,
    validationSchema: signupSchemaValidataon,
    onSubmit: () => {
      if (!username) return toast("Correct your invite code.");
      const reqBody = {
        txtregid: "1",
        txtname: fk.values.name,
        txtintroducer_id: fk.values.invite_code,
        txtintroducer_name: username,
        txtemail: "",
        txtmobile: fk.values.mobile,
        txtpassword: fk.values.password,
      };

      if (fk.values.password !== fk.values.confirmed_password)
        return toast("Password and confirm password should be same");
      signupSubmit(reqBody);
    },
  });

  async function signupSubmit(reqBody) {
    setisLoding(true);
    try {
      const res = await axios.post(endpoint.register_candidate_mobile, reqBody);
      console.log(res);
      if (res?.data?.status === true) {
        storeCookies();
        toast(res?.data?.msg);
        localStorage.setItem("user_id", res?.data?.userid);
        navigate("/dashboard");
      } else {
        toast(res?.data?.msg);
      }
    } catch (e) {
      console.log(e);
    }
    setisLoding(false);
  }

  async function getIntroFn() {
    console.log("Function is hit now");
    const reqBody = {
      userid: fk.values.invite_code,
    };
    try {
      const res = await axios.post(endpoint?.get_user_intro_name, reqBody);
      setusername(res?.data?.earning?.name);
    } catch (e) {
      console.log(e);
    }
    // client.refetchQueries("bank_details");
  }

  useEffect(() => {
    getIntroFn();
  }, [fk.values.invite_code]);

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
    <>
      <Box component="form" onSubmit={fk.handleSubmit}>
        <CustomCircularProgress isLoading={isLoading} />
        <Stack direction="row" alignItems="center">
          <Typography
            className="fp17"
            sx={{ color: avred1 }}
          >
            Phone number
          </Typography>
        </Stack>

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
          {fk.touched.mobile && fk.errors.mobile && (
            <div className="error">{fk.errors.mobile}</div>
          )}
        </FormControl>

        <Box mt={2}>
          <Stack direction="row" alignItems="center">
            <Typography
              className="fp17"
              sx={{ color: avred1 }}
            >
              Name
            </Typography>
          </Stack>
          <FormControl fullWidth sx={{ ...style.inputfield }}>
            <TextField
              placeholder="Name"
              id="name"
              name="name"
              onChange={fk.handleChange}
              value={fk.values.name}
              type={"text"}
            />
            {fk.touched.name && fk.errors.name && (
              <div className="error">{fk.errors.name}</div>
            )}
          </FormControl>
        </Box>
        <Box mt={2}>
          <Stack direction="row" alignItems="center">
            <Typography
              className="fp17"
              sx={{ color: avred1 }}
            >
              Set password
            </Typography>
          </Stack>
          <FormControl fullWidth sx={{ ...style.passwordfield }}>
            <FilledInput
              placeholder="Set password"
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
            {fk.touched.password && fk.errors.password && (
              <div className="error">{fk.errors.password}</div>
            )}
          </FormControl>
        </Box>
        <Box mt={2}>
          <Stack direction="row" alignItems="center">
            <Typography
              className="fp17"
              sx={{ color: avred1 }}
            >
              Confirm password
            </Typography>
          </Stack>
          <FormControl fullWidth sx={{ ...style.passwordfield }}>
            <FilledInput
              placeholder="Confirm password"
              id="confirmed_password"
              name="confirmed_password"
              onChange={fk.handleChange}
              value={fk.values.confirmed_password}
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
            {fk.touched.confirmed_password && fk.errors.confirmed_password && (
              <div className="error err">{fk.errors.confirmed_password}</div>
            )}
          </FormControl>
        </Box>
        <Box mt={2}>
          <Stack direction="row" alignItems="center">
            <Typography
              className="fp17"
              sx={{ color: avred1 }}
            >
              Invite code
            </Typography>
          </Stack>
          <FormControl fullWidth sx={{ ...style.inputfield }}>
            <TextField
              id="invite_code"
              name="invite_code"
              onChange={fk.handleChange}
              value={fk.values.invite_code}
              label=""
              placeholder="please input Invite code"
              fullWidth
              type="text"
            />
            {username !== "false" ? (
              <div className="no-error">{username}</div>
            ) : (
              fk.touched.invite_code &&
              fk.errors.invite_code && (
                <div className="error err">{fk.errors.invite_code}</div>
              )
            )}
          </FormControl>
        </Box>
      </Box>
      <Box mt={3}>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label={
              <Stack direction="row">
                <Typography
                  className="fp13"
                  sx={{ color: avred1 }}
                >
                  I have read and agree{" "}
                </Typography>
                <NavLink to="/RiskDisclosureAgreement">
                  <Typography
                    className="fp13"
                    sx={{ fontSize: "14px", color: avred1 }}
                  >
                    【Privacy Agreement】
                  </Typography>
                </NavLink>
              </Stack>
            }
          />
        </FormGroup>
      </Box>
      <Box sx={{ width: "80%", margin: "auto", mt: 3 }}>
        <Button
          onClick={() => fk.handleSubmit()}
          className={`th-btn`}
          sx={{ mb: 2, width: '100%' }}
        >
          Register
        </Button>
        <NavLink to="/">
          <Button
            className={`th-btn2`}
            sx={{ width: '100%' }}
          >
            I have an account ?  <span> Login</span>
          </Button>
        </NavLink>
      </Box>
    </>
  );
};

export default RegistrationByMobile;

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
