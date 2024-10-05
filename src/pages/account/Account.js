
import { BorderColor, CastSharp, CopyAll, GroupAddRounded, Height, PhoneAndroidOutlined, SupportAgentTwoTone, Wallet } from "@mui/icons-material";
import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useQuery, useQueryClient } from "react-query";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import a1 from "../../assets/images/a1.png";
import b1 from "../../assets/images/b1.png";
import c1 from "../../assets/images/c1.png";
import dep from "../../assets/images/dep.png";
import depo from "../../assets/images/depo.png";
import f1 from "../../assets/images/f1.png";
import l1 from "../../assets/images/l1.png";
import n1 from "../../assets/images/n1.png";
import s1 from "../../assets/images/s1.png";
import trx from "../../assets/images/trx.png";
import vip from "../../assets/images/vip.png";
import atmbg from "../../assets/images/atmbg.jpg";
import wal from "../../assets/images/wal.png";
import wih from "../../assets/images/with.png";
import wit from "../../assets/images/witt.png";
import Layout from "../../component/layout/Layout";
import { ProfileDataFunction, Update_ProfileFn, getBalanceFunction, logOutFunction, showRank } from "../../services/apiCallings";
import { endpoint, front_end_domain } from "../../services/urls";
import CustomCircularProgress from "../../shared/loder/CustomCircularProgress";
import ImageSelectorModal from "./ImageSelectorModal";
import CustomDate from "../../shared/CustomiztionDate/CustomDate";
import { deCryptData } from "../../shared/secret";
import { avred1 } from "../../shared/color";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import banner4 from "../../assets/images/banner4.jpg";
import banner2 from "../../assets/images/banner2.jpg";
import banner3 from "../../assets/images/banner3.jpg";

const SimpleFeatureCard = ({ icon, title, description }) => (
  <Paper
    elevation={3}
    sx={{
      maxWidth: '400px',
      padding: '20px',
      textAlign: 'center',
      margin: 'auto',
      borderRadius: '16px',
    }}
  >
    <Box sx={{ marginBottom: '16px' }}>
      {icon}
    </Box>
    <Typography
      variant="h6"
      sx={{
        fontWeight: 'bold',
        color: '#E4063A',
        marginBottom: '12px',
      }}
    >
      {title}
    </Typography>
    <Typography
      variant="body1"
      sx={{ color: '#000', fontWeight: 500 }}
    >
      {description}
    </Typography>
  </Paper>
);

function Account() {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };

  const or_m_user_type = deCryptData(localStorage.getItem("or_m_user_type"));
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const transactionId = searchParams?.get("orderid");
  const client = useQueryClient();
  const navigate = useNavigate();
  const [opend, setOpend] = useState(false);
  const [selectedImages, setselectedImages] = useState("");
  const images = [
    "https://mui.com/static/images/avatar/2.jpg",
    "https://mui.com/static/images/avatar/3.jpg",
    "https://mui.com/static/images/avatar/4.jpg",
    "https://mui.com/static/images/avatar/1.jpg",
    "https://mui.com/static/images/avatar/5.jpg"
  ];
  const { isLoading, data } = useQuery(["profile"], () => ProfileDataFunction(), {
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
    retryOnMount: false,
    refetchOnWindowFocus: false
  });
  const profile = data?.data?.earning || [];

  const [balance, setBalance] = useState("");
  const { data: wallet_amount } = useQuery(
    ["wallet_amount_amount"],
    () => getBalanceFunction(setBalance),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      retryOnMount: false,
      refetchOnWindowFocus: false
    }
  );
  const wallet_amount_data = wallet_amount?.data?.earning || 0;

  const { data: update_pic } = useQuery(
    ["Update_pic", selectedImages],
    () => Update_ProfileFn(selectedImages, client),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      retryOnMount: false,
      refetchOnWindowFocus: false
    }
  );

  async function sendUrlCallBackToBackend(transactionId) {
    try {
      const res = await axios.get(
        `${endpoint?.payin_response_akash}?orderid=${transactionId}`
      );

      if (res?.data?.status === "200") {
        window.location.href = `${front_end_domain}/account`
      }
      console.log(res);
    } catch (e) {
      console.log(e);
    }
    client.removeQueries("profile");
    client.removeQueries("wallet_amount_amount");
  }

  useEffect(() => {
    if (transactionId) {
      sendUrlCallBackToBackend(transactionId);
    }
  }, []);




  return (
    <Layout header={true}>
      <Container>
        <CustomCircularProgress isLoading={isLoading} />
        <Box >
          <Box className="flex justify-start items-center " sx={{ background: '#E4063A !important', padding: 2, }} >
            <Typography className="  !mr-1"
              onClick={() => setOpend(true)}>
              <img src={profile?.rec?.User_image} alt="" className='!rounded-full  w-[72px] h-[72px]' />
              {/* <BorderColor fontSize="small" className="!text-white   !rounded-full !bg-gray-400  " /> */}
            </Typography>
            <ImageSelectorModal
              setOpend={setOpend}
              setselectedImages={setselectedImages}
              open={opend}
              onClose={() => setOpend(false)}
              images={images} />
            <Box className="flex flex-col gap-1">
              <Box className="flex justify-start items-center">
                <Typography className=" !font-bold text-" sx={{ mr: 1 }}>{profile?.rec?.Associate_Name}</Typography>
                <img src={vip} alt="" style={{ width: '40px', ml: 1, }} />
              </Box>
              <Box sx={{ background: 'rgb(0 0 0)' }} className=" w-40 h-6 rounded-full p-1   realtive !left-40 flex gap-3 justify-center">
                <Typography className="text-white !text-xs">UID </Typography>
                <Typography className="text-white !text-xs">| </Typography>
                <Typography className="text-white !text-xs">{profile?.rec?.Login_Id} <CopyAll fontSize="small" /> </Typography>
              </Box>

              {profile?.rec?.Club !== 0 &&
                <Box className="  realtive !left-36 flex gap-3 justify-center">
                  <Typography className="text-white !text-sm">Rank: </Typography>
                  <Typography className="text-white !text-sm">{showRank(profile?.rec?.Club)}</Typography>
                </Box>}
              <CustomDate />
            </Box>
          </Box>
          <Box className=" shadow-xl rounded-lg py-5 relative " sx={{
            mx: 2,
            overflow: 'hidden', my: 2,
            background: '#000000',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundImage: `url(${atmbg})`,
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              opacity: 0.2, // Set the opacity of the background image here
              // zIndex: -1, // Make sure the background is behind the content
            },
          }}>
            <Typography className=" px-3" sx={{ position: 'relative', color: 'white', }}>Total Balance</Typography>
            <Typography sx={{ position: 'relative', color: 'white', }} className="!font-bold px-3"> ₹ {Number(wallet_amount_data || 0)?.toFixed(2)}
            </Typography>
            <Box sx={{ position: 'relative', }} className="fca  pt-5">
              <Box className=" fccc w20"
                onClick={() => {
                  if (or_m_user_type === "Dummy User") {
                    toast("Dummy User");
                  } else {
                    navigate('/deposit');
                  }
                }}>
                <Typography> <img src={dep} alt="" className="w-8" style={{ filter: 'grayscale(1)' }} /> </Typography>
                <Typography sx={{ color: avred1, }} className="fp13 fw700"> Deposit</Typography>
              </Box>
              <Box className=" fccc w20"
                onClick={() => {
                  if (or_m_user_type === "Dummy User") {
                    toast("Dummy User");
                  } else {
                    navigate('/withdraw');
                  }
                }}>
                <Typography><img src={wih} alt="" className="w-8" style={{ filter: 'grayscale(1)' }} /></Typography>
                <Typography sx={{ color: avred1, }} className="fp13 fw700">Withdraw</Typography>
              </Box>
              <Box className=" fccc w25"
                onClick={() => {
                  if (or_m_user_type === "Dummy User") {
                    toast("Dummy User");
                  } else {
                    navigate('/withdraw');
                  }
                }}>
                <Typography><img src={wih} alt="" className="w-8" style={{ filter: 'grayscale(1)' }} /></Typography>
                <Typography sx={{ color: avred1, }} className="fp13 fw700">DPT History</Typography>
              </Box>
              <Box className=" fccc w25"
                onClick={() => {
                  if (or_m_user_type === "Dummy User") {
                    toast("Dummy User");
                  } else {
                    navigate('/withdraw');
                  }
                }}>
                <Typography><img src={wih} alt="" className="w-8" style={{ filter: 'grayscale(1)' }} /></Typography>
                <Typography sx={{ color: avred1, }} className="fp13 fw700">WDRL History</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
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

        <Box sx={{ padding: '16px' }}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} >
              <SimpleFeatureCard
                icon={<Wallet sx={{ color: avred1, '&>path': { width: '70px', } }} />}
                title="Fast Deposit and Withdrawal Transactions"
                description="Efficiency and user-friendliness, making financial transactions easy. This service prioritizes fast processing, allowing consumers to deposit and withdraw payments quickly."
              />
            </Grid>
            <Grid item xs={12} >
              <SimpleFeatureCard
                icon={<SupportAgentTwoTone sx={{ color: avred1, '&>path': { width: '70px', } }} />}
                title="24/7 Customer Service Assistance"
                description="The Aviatorare known for having great customer service that is available 24/7, so that everyone who goes or plays can always get help."
              />
            </Grid>
          </Grid>
        </Box>

        <button style={{
          width: "95%",
          // marginLeft: '2.5%',
          color: 'white !important',
          margin: '16px 2.5%'
        }}
          disableElevation
          className={`th-btn `}
          onClick={() => logOutFunction()}>
          Logout
        </button>
      </Container>
    </Layout>
  );
}

export default Account;

const style = {
  banner: { height: "200px !important" },
}