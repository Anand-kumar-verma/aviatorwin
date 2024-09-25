import { Box, Tabs, Tab, Typography } from "@mui/material";
import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import accountactive from "../../../assets/images/account.png";
import activity from "../../../assets/images/activity.png";
import home from "../../../assets/images/home.png";
import walletactive from "../../../assets/images/wallet.png";
import { avred1 } from "../../../shared/color";
import theme from "../../../utils/theme";
function Footer() {


  const navigate = useNavigate();

  const [value, setValue] = React.useState('1');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const location = useLocation();

  return (
    <Box
      sx={{
        px: 1,
        background: avred1,
        borderRadius: '10px 10px 0 0',
      }}
      className="footerBox"
    >
      <Box sx={{ width: '100%' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="wrapped label tabs example"
          className="fcsb"
        >
          <Tab sx={{ width: '25%', }} value="1" component={NavLink} to="/dashboard" label={
            <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column", }} >
              <Box component="img" src={home} width={30} sx={{ filter: location.pathname == '/dashboard' ? 'invert(1)' : '' }} />
              <Typography sx={{ textTransform: 'capitalize', fontSize: "14px", fontWeight: 700, color: location.pathname == '/dashboard' ? 'black' : "white", }}>
                Home
              </Typography>
            </Box>
          } wrapped
          />
          <Tab sx={{ width: '25%', }} value="2" component={NavLink} to="/promotion" label={
            <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column", }} >
              <Box component="img" src={activity} width={30} sx={{ filter: location.pathname == '/promotion' ? 'invert(1)' : '' }} />
              <Typography sx={{ textTransform: 'capitalize', fontSize: "14px", fontWeight: 700, color: location.pathname == '/promotion' ? 'black' : "white", }}>
                Promotion
              </Typography>
            </Box>
          } wrapped
          />
          <Tab sx={{ width: '25%', }} value="3" component={NavLink} to="/wallet" label={
            <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column", }} >
              <Box component="img" src={walletactive} width={30} sx={{ filter: location.pathname == '/wallet' ? 'invert(1)' : '' }} />
              <Typography sx={{ textTransform: 'capitalize', fontSize: "14px", fontWeight: 700, color: location.pathname == '/wallet' ? 'black' : "white", }}>
                Wallet
              </Typography>
            </Box>
          } wrapped
          />
          <Tab sx={{ width: '25%', }} value="4" component={NavLink} to="/account" label={
            <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column", }} >
              <Box component="img" src={accountactive} width={30} sx={{ filter: location.pathname == '/account' ? 'invert(1)' : '' }} />
              <Typography sx={{ textTransform: 'capitalize', fontSize: "14px", fontWeight: 700, color: location.pathname == '/account' ? 'black' : "white", }}>
                Account
              </Typography>
            </Box>
          } wrapped
          />
        </Tabs>
      </Box>
      {/* <Stack
        direction="row"
        sx={{ alignItems: "center", justifyContent: "space-around" }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
          component={NavLink}
          onClick={() => navigation(0)}
          to="/dashboard"
        >
          <Box component="img" src={home} width={30} sx={{ filter: nav === 0 ? 'invert(1)' : '' }} />
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 700,
              color: nav === 0 ? 'black' : "white",
            }}
          >
            Home
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
          component={NavLink}
          onClick={() => navigation(1)}
          to="/promotion"
        >
          <Box component="img" src={activity} width={30} sx={{ filter: nav === 1 ? 'invert(1)' : '' }} />
          <Typography
            variant="body1"
            sx={{
              fontSize: "11px",
              fontWeight: 500,
              color: nav === 1 ? theme.palette.primary.main : "black", // Changed to check for nav === 1
            }}
          >
            Promotion
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
          component={NavLink}
          onClick={() => navigation(4)}
          to="/wallet"
        >
          <Box component="img" src={walletactive} width={30} sx={{ filter: nav === 4 ? 'invert(1)' : '' }} />
          <Typography
            variant="body1"
            sx={{
              fontSize: "11px",
              fontWeight: 500,
              color: nav === 4 ? theme.palette.primary.main : "black",
            }}
          >
            Wallet
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
          component={NavLink}
          onClick={() => navigation(5)}
          to="/account"
        >
          <Box component="img" src={accountactive} width={30} sx={{ filter: nav === 5 ? 'invert(1)' : '' }} />
          <Typography
            variant="body1"
            sx={{
              fontSize: "11px",
              fontWeight: 500,
              color: nav === 5 ? theme.palette.primary.main : "black",
            }}
          >
            Account
          </Typography>
        </Box>
      </Stack> */}
    </Box>
  );
}

export default Footer;
