import { Box, Button, Stack, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import avaitorcategory3 from "../../../assets/images/air.png";
import lotteryimg from "../../../assets/images/lottery.png";
import rays from "../../../assets/images/pngwing.com (1).png";
import win3 from "../../../assets/images/win3.png";
import { endpoint } from "../../../services/urls";
import { avgraylight, avred1 } from "../../../shared/color";
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';


function Lottery() {
  const [status, setStatus] = useState(false);

  const getStatus = async () => {
    try {
      const res = await axios.get(endpoint.withdrawl_status);
      setStatus(res?.data?.earning);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getStatus();
  }, []);

  return (
    <Box sx={{ padding: "15px" }}>
      <Stack direction="row" sx={{ alignItems: "center", mb: 2 }}>
        <Box component="img" src={lotteryimg} width={25} sx={{ filter: 'grayscale(1)' }}></Box>
        <Typography
          variant="body1"
          color="initial"
          sx={{ ml: 1, fontSize: "15px", fontWeight: 600, color: avred1 }}
        >
          Lottery
        </Typography>
      </Stack>
      <NavLink to={String(status?.aviator_status) !== "0" && "/playgame"}>
        <Box sx={{ borderRadius: '5px', background: avgraylight, overflow: 'hidden' }} className="fccc">
          <Box sx={{ p: 1, background: avred1, textAlign: 'center', }}>
            <Typography className="fp17 fw700 w ">AVIATOR</Typography>
            <Typography className="fp13 fw500 w" sx={{ lineHeight: '13px', }}> Cash out at the perfect moment to lock in your winnings before the plane disappears.  </Typography>
          </Box>
          <Box sx={{
            pt: '60px', width: '100%', position: 'relative',
            width: '100%',
            height: '20vh',
            overflow: 'hidden',
          }}>
            <Box
              // sx={{
              //   position: 'absolute', top: '0', left: 0, width: '100%',
              //   height: '20vh', backgroundImage: `url('${rays}')`,
              //   backgroundSize: 'cover',
              //   backgroundPosition: 'center',
              //   animation: 'rotate-animation 20s infinite linear',
              //   '@keyframes rotate-animation': {
              //     '0%': {
              //       transform: 'rotate(0deg)',
              //     },
              //     '100%': {
              //       transform: 'rotate(360deg)',
              //     },
              //   },
              // }}
              sx={{
                position: 'absolute',
                width: '200%',
                height: '67vh',
                backgroundImage: `url('${rays}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                animation: 'rotate-animation 20s infinite linear',
                left: '-50%',
                top: '-45%',
                filter: 'brightness(0.01)',
                '@keyframes rotate-animation': {
                  '0%': {
                    transform: 'rotate(0deg)',
                  },
                  '100%': {
                    transform: 'rotate(360deg)',
                  },
                },
              }}
            ></Box>
            <Box
              component="img"
              className=" !rounded-full"
              src={avaitorcategory3}
              sx={{
                width: '100px',
                position: 'relative',
                animation: 'takeOffDiagonal 4s ease-in-out infinite',
                '@keyframes takeOffDiagonal': {
                  '0%': { transform: 'translate(0, 0)' },
                  '25%': { transform: 'translate(50px, -20px) rotate(-5deg)' },
                  '50%': { transform: 'translate(100px, -50px) rotate(0deg)' },
                  '75%': { transform: 'translate(150px, -20px) rotate(5deg)' },
                  '100%': { transform: 'translate(200px, 0)' },
                },
              }}
            />
          </Box>
          <button className="btnplay"><i className="animation"></i>Play Now<i className="animation"></i>
          </button>
        </Box>
        {/* <Box sx={style.winbox}>
          <Box
            component="img"
            src={win3}
            sx={{ width: "100%", height: "70%" }}
          ></Box>
          <Box sx={style.positiongame}>
            <Typography variant="body1" color="initial" sx={style.gameheading}>
              Aviator{" "}
            </Typography>
            <Box sx={{ mt: "15px" }}>
              <Typography variant="body1" color="initial">
                Play & Earn
              </Typography>
              <Typography variant="body1" color="initial ">
              </Typography>
            </Box>
          </Box>
          <Box sx={{ position: "absolute", top: "-20px", right: "5px" }}>
            <Box
              component="img"
              className=" !rounded-full"
              src={avaitorcategory3}
              sx={{ width: "100px" }}
            ></Box>
          </Box>
        </Box> */}
      </NavLink >

    </Box >
  );
}

export default Lottery;

const style = {
  winbox: {
    background: "#e9e9e9",
    borderRadius: "20px",
    height: "160px",
    marginBottom: "30px",
    position: "relative",
    boxShadow: "0 0.05333rem 0.10667rem #c5c5da42",
  },
  positiongame: {
    position: "absolute",
    top: "10px",
    left: "20px",
    "&>div>p": { fontSize: "12px", fontWeight: 400, color: "white" },
  },
  gameheading: { fontSize: "20px", fontWeight: 700, color: "white" },
};
