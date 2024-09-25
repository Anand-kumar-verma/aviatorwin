import VolumeUpIcon from "@mui/icons-material/VolumeUpOutlined";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import { Box, Stack, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import banner4 from "../../assets/images/banner4.jpg";
import banner2 from "../../assets/images/banner2.jpg";
import banner3 from "../../assets/images/banner3.jpg";
import crown1 from "../../assets/images/crown1.png";
import crown2 from "../../assets/images/crown2.png";
import crown3 from "../../assets/images/crown3.png";
import place1 from "../../assets/images/place1.png";
import place2 from "../../assets/images/place2.png";
import place3 from "../../assets/images/place3.png";
import podium from "../../assets/images/podium.png";
import profile1 from "../../assets/images/profile1.png";
import profile2 from "../../assets/images/profile2.png";
import profile3 from "../../assets/images/profile3.png";
import winning_bg from "../../assets/images/winning_bg-d9c728ae.b7e0bb8e663fb68e6f70.png";
import winerbanner1 from "../../assets/images/winerbanner1.png";
import Layout from "../../component/layout/Layout";
import {
  LastTrade,
  checkTokenValidity
} from "../../services/apiCallings";
import { endpoint } from "../../services/urls";
import CustomCircularProgress from "../../shared/loder/CustomCircularProgress";
import theme from "../../utils/theme";
import Lottery from "./component/Lottery";
import { avred1 } from "../../shared/color";
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';


function Dashboard() {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };
  const [value, setValue] = useState(1);

  const handleChange = (newValue) => {
    setValue(newValue);
  };
  const { isLoading, data } = useQuery(["top_winner"], () => TopWinner(), {
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
    retryOnMount: false,
    refetchOnWindowFocus: false,
  });

  const res = data?.data?.earning || [];

  const { data: Trade } = useQuery(["last_trade"], () => LastTrade(), {
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
    retryOnMount: false,
    refetchOnWindowFocus: false,
  });
  const trade = Trade?.data?.earning || [];

  const TopWinner = async () => {
    try {
      const response = await axios.get(endpoint.win_list_top);
      return response;
    } catch (e) {
      toast(e?.message);
      console.log(e);
    }
  };

  useEffect(() => {
    if (!checkTokenValidity()) {
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = "/"; // Redirect to login page
    }
  }, []);


  const imageSources = [
    "https://mui.com/static/images/avatar/2.jpg",
    "https://mui.com/static/images/avatar/3.jpg",
    profile3,
    "https://mui.com/static/images/avatar/4.jpg",
    profile1,
    "https://mui.com/static/images/avatar/1.jpg",
    profile2,
    "https://mui.com/static/images/avatar/5.jpg",
  ];

  return (
    <Layout>
      <CustomCircularProgress isLoading={isLoading} />
      <Swiper
        style={{ marginTop: '16px', borderRadius: '5px', overflow: 'hidden' }}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper w95"
      >
        <SwiperSlide>
          <Box component="img" src={banner2} sx={style.banner}></Box>
        </SwiperSlide>
        <SwiperSlide>
          <Box component="img" src={banner3} sx={style.banner}></Box>
        </SwiperSlide>
        <SwiperSlide>
          <Box component="img" src={banner4} sx={style.banner}></Box>
        </SwiperSlide>
        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
      <Stack
        className="w95"
        direction="row"
        sx={{
          alignItems: "center",
          justifyContent: "space-between",
          px: 1,
          py: 1,
          background: avred1,
          border: `1px solid ${avred1}`, mt: 2,
          borderRadius: '3px'
        }}
      >
        <VolumeUpIcon sx={{ color: 'white', mr: 1 }} />
        <Typography
          className="fp13"
          sx={{
            mr: 1,
            textAlign: "center",
            color: 'white',
          }}
        >
          1.All recharge methods only available in RECHARGE menu on OFFICIAL
        </Typography>
        <Typography sx={{ background: '#131512' }} className="!text-white !text-xs  !font-bold rounded-2xl px-2 !flex justify-center">
          <WhatshotIcon fontSize="small" />{" "}
          <span className="my-1">Details</span>
        </Typography>
      </Stack>
      <Stack
        direction="row"
        sx={{
          alignItems: "center",
          justifyContent: "space-between",
          padding: "4px 15px",
          mt: 1,
        }}
      >


      </Stack>

      {value === 1 && <Lottery />}

      <Box sx={{ px: 2 }}>
        <Stack direction={"row"} sx={{ alignItems: "center" }} py={2}>
          {/* <Box
            sx={{
              background: theme.palette.primary.main,
              width: "4px",
              height: "16px",
            }}
          ></Box> */}
          <MilitaryTechIcon sx={{ color: avred1 }} />
          <Typography
            variant="body1"
            color="initial"
            sx={{ fontSize: "18px", fontWeight: 700, ml: 1, color: avred1 }}
          >
            Winning information
          </Typography>
        </Stack>
        <Box mt={2}>
          {res?.slice(2)?.map((i, index) => {
            return (
              <Stack
                key={index}
                direction="row"
                sx={style.winnerslider}
              >
                <div style={{ position: 'relative' }}>
                  <Box
                    width={25}
                    height={25}
                    component={"img"}
                    src={crown2}
                    sx={style.bca}
                  ></Box>
                  <Box
                    component={"img"}
                    src={imageSources[index]}
                    alt={`Profile ${index + 1} `}
                    width={45}
                    height={45}
                    sx={style.winnerprofile}
                  ></Box>

                </div>
                <Typography
                  variant="body1"

                  sx={style.winnername}
                >
                  <p className="!flex !flex-col">
                    <span>{i?.or_m_user_id}</span>
                    <span>{i?.or_m_name?.substring(0, 5)}</span>
                  </p>
                </Typography>
                <Box sx={style.winnerbannerouter}>
                  <Box
                    height={45}
                    component={"img"}
                    src={winerbanner1}
                    sx={style.winnerbannerinner}
                  ></Box>
                </Box>
                <Box>
                  <Typography
                    variant="body1"

                    sx={style.winneramout || 0}
                  >
                    Receive ₹{i?.max_tr_pv}
                  </Typography>
                  <Typography
                    variant="body1"

                    sx={style.winnertitle}
                  >
                    Winning amount
                  </Typography>
                </Box>
              </Stack>
            );
          })}
        </Box>
      </Box>
      <Box sx={{ px: 2, py: 3 }}>
        <Stack direction={"row"} sx={{ alignItems: "center" }}>
          <CalendarMonthOutlinedIcon sx={{ fontSize: "18px", fontWeight: 700, color: avred1 }} />
          <Typography
            variant="body1"
            sx={{ fontSize: "18px", fontWeight: 700, ml: 1, color: avred1 }}
          >
            Today's earnings chart
          </Typography>
        </Stack>
        <Box sx={{ mt: 5 }}>
          <Box sx={style.podiumbox}>
            <Stack direction="row" sx={style.podiumtextouterbox}>
              <Box sx={style.winner2box}>
                <Box
                  component={"img"}
                  src={crown2}
                  sx={style.winnercroun}
                ></Box>
                <Box
                  component={"img"}
                  src={profile1}
                  sx={style.winnerprofilepod}
                ></Box>
                <Box
                  component={"img"}
                  src={place2}
                  sx={style.winnerposition}
                ></Box>
                <Box sx={style.winner2amt}>
                  <Typography variant="body1" color="initial">
                    {"**"}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="initial"
                    sx={style.winningamount}
                  >
                    ₹{res?.[1]?.max_tr_pv}
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  width: "30%",
                  position: "absolute",
                  zIndex: 30,
                  top: "-18%",
                  left: "33.33%",
                  height: "100%",
                }}
              >
                <Box
                  component={"img"}
                  src={crown1}
                  sx={style.winnercroun}
                ></Box>
                <Box
                  component={"img"}
                  src={profile2}
                  sx={style.winnerprofilepod}
                ></Box>
                <Box
                  component={"img"}
                  src={place1}
                  sx={style.winnerposition}
                ></Box>
                <Box sx={style.winner2amt}>
                  <Typography variant="body1" color="initial">
                    {"**"}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="initial"
                    sx={style.winningamount}
                  >
                    ₹{res?.[0]?.max_tr_pv}
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{
                  width: "30%",
                  position: "absolute",
                  zIndex: 30,
                  top: 0,
                  right: 0,
                  height: "100%",
                }}
              >
                <Box
                  component={"img"}
                  src={crown3}
                  sx={style.winnercroun}
                ></Box>
                <Box
                  component={"img"}
                  src={profile3}
                  sx={style.winnerprofilepod}
                ></Box>
                <Box
                  component={"img"}
                  src={place3}
                  sx={style.winnerposition}
                ></Box>
                <Box sx={style.winner2amt}>
                  <Typography variant="body1" color="initial">
                    {"**"}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="initial"
                    sx={style.winningamount}
                  >
                    ₹{res?.[2]?.max_tr_pv}
                  </Typography>
                </Box>
              </Box>
            </Stack>
          </Box>
          {res?.slice(0, 2)?.map((i, index) => {
            return (
              <Stack
                key={index}
                direction="row"
                sx={style.winnerslider}
              >
                <div style={{ position: 'relative' }}>
                  <Box
                    width={25}
                    height={25}
                    component={"img"}
                    src={crown2}
                    sx={style.bca}
                  ></Box>
                  <Box
                    component={"img"}
                    src={imageSources[index]}
                    alt={`Profile ${index + 1} `}
                    width={45}
                    height={45}
                    sx={style.winnerprofile}
                  ></Box>

                </div>
                <Typography
                  variant="body1"

                  sx={style.winnername}
                >
                  <p className="!flex !flex-col">
                    <span>{i?.or_m_user_id}</span>
                    <span>{i?.or_m_name?.substring(0, 5)}</span>
                  </p>
                </Typography>
                <Box sx={style.winnerbannerouter}>
                  <Box
                    height={45}
                    component={"img"}
                    src={winerbanner1}
                    sx={style.winnerbannerinner}
                  ></Box>
                </Box>
                <Box>
                  <Typography
                    variant="body1"

                    sx={style.winneramout || 0}
                  >
                    Receive ₹{i?.max_tr_pv}
                  </Typography>
                  <Typography
                    variant="body1"

                    sx={style.winnertitle}
                  >
                    Winning amount
                  </Typography>
                </Box>
              </Stack>
            );
          })}
        </Box>
        <Box sx={{ mt: 5, mb: 5, }}>
          <Stack direction={"row"} sx={{ alignItems: "center" }}>
            <CalendarMonthOutlinedIcon sx={{ fontSize: "18px", fontWeight: 700, color: avred1 }} />
            <Typography
              variant="body1"
              sx={{ fontSize: "18px", fontWeight: 700, ml: 1, color: avred1 }}
            >
              Last Trade Top Winner
            </Typography>
          </Stack>
          {trade?.slice(0, 5)?.map((i, index) => {
            return (
              <Stack
                key={index}
                direction="row"
                sx={style.winnerslider}
              >
                <div style={{ position: 'relative' }}>
                  <Box
                    width={25}
                    height={25}
                    component={"img"}
                    src={crown2}
                    sx={style.bca}
                  ></Box>
                  <Box
                    component={"img"}
                    src={imageSources[index]}
                    alt={`Profile ${index + 1} `}
                    width={45}
                    height={45}
                    sx={style.winnerprofile}
                  ></Box>

                </div>
                <Typography
                  variant="body1"

                  sx={style.winnername}
                >
                  <p className="!flex !flex-col">
                    <span>{i?.or_m_user_id}</span>
                    <span>{i?.or_m_name?.substring(0, 5)}</span>
                  </p>
                </Typography>
                <Box sx={style.winnerbannerouter}>
                  <Box
                    height={45}
                    component={"img"}
                    src={winerbanner1}
                    sx={style.winnerbannerinner}
                  ></Box>
                </Box>
                <Box>
                  <Typography
                    variant="body1"

                    sx={style.winneramout || 0}
                  >
                    Receive ₹{i?.max_tr_pv}
                  </Typography>
                  <Typography
                    variant="body1"

                    sx={style.winnertitle}
                  >
                    Winning amount
                  </Typography>
                </Box>
              </Stack>
            );
          })}
        </Box>
      </Box>
    </Layout >
  );
}

export default Dashboard;
const style = {
  banner: { height: "200px !important" },
  gamecattext: {
    textAlign: "center",
    textDecoration: "none !important",
    fontSize: "11px",
    fontWeight: 500,
    mt: 1,
  },
  winbox: {
    background: "#F4F5F8",
    borderRadius: "20px",
    height: "160px",
    marginBottom: "20px",
    position: "relative",
  },
  positiongame: { position: "absolute", top: "10px", left: "20px" },
  gameheading: { fontSize: "20px", fontWeight: 700, color: "white" },
  winnerslider: {
    justifyContent: "space-around",
    alignItems: "center",
    padding: "10px 0px 10px 5px",
    backgroundImage: `url(${winning_bg})`,
    filter: 'hue-rotate(97deg)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 100%',
    borderRadius: "10px",
    my: 1.5,
    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
    animation: "infinite moves",
  },
  winnerprofile: {
    borderRadius: "50%",
    objectPosition: "center",
    objectFit: "cover",
    marginTop: '-25px',
    marginLeft: '-3px',
    filter: 'hue-rotate(-97deg)',
  },
  winnername: { fontSize: "12px", fontWeight: 400, mx: 1, color: 'white', '&>p>span': { color: 'white', } },
  winnerbannerouter: {
    background: theme.palette.primary.main,
    width: "23%",
    borderRadius: "10px",
    objectPosition: "center",
    filter: 'hue-rotate(-97deg)'
  },
  winnerbannerinner: {
    width: "100%",
    borderRadius: "10px",
    objectPosition: "center",
    objectFit: "cover",
    filter: 'hue-rotate(0deg)',
  },
  winneramout: { fontSize: "12px", fontWeight: 600, marginLeft: 1, color: 'white' },
  winnertitle: { fontSize: "11px", fontWeight: 400, marginLeft: 1, color: 'white' },
  podiumbox: {
    backgroundImage: `url(${podium})`,
    width: "100%",
    height: "140px",
    marginTop: "65px",
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 100%",
    position: "relative",
    zIndex: 10,
  },
  podiumtextouterbox: { width: "100%", height: "100%", position: "relative" },
  winner2box: {
    width: "30%",
    position: "absolute",
    zIndex: 30,
    top: 0,
    left: 0,
    height: "100%",
  },
  winnerposition: {
    width: "70px",
    height: "50px",
    objectFit: "contain",
    position: "absolute",
    left: "21%",
    top: "14%",
  },
  winnerprofilepod: {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    objectFit: "cover",
    position: "absolute",
    left: "25%",
    top: "-11%",
  },
  winnercroun: {
    width: "50px",
    height: "50px",
    objectFit: "contain",
    position: "absolute",
    left: "11%",
    top: "-25%",
    zIndex: 1000,
  },
  winner2amt: {
    width: "100%",
    position: "absolute",
    left: 0,
    bottom: "22%",
    textAlign: "center",
    "&>p": { color: "white", fontWeight: 400, fontSize: "11px" },
  },
  winningamount: {
    marginTop: "5px",
    padding: "5px",
    borderRadius: "10px",
    background: "#E4063A",
  },
  bca: {
    width: '25px',
    height: '25px',
    position: 'absolute',
    bottom: '120%',
    left: '-33%',
    transform: 'rotate(-7deg)',
  },
};
