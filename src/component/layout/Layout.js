import Header from "./component/Header";
import Footer from "./component/Footer";
import { Box, Container } from "@mui/material";
import { useEffect } from "react";
import noise from "../../assets/images/Noise-bg.gif";

function Layout(props) {
  const { header = true, footer = true, children } = props;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

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
      <Box>
        {header && <Header />}
        <Box>{children}</Box>
        {footer && <Footer />}
      </Box>
    </Container>
  );
}

export default Layout;
