import { Box, Grid, Stack } from '@mui/material'
import React from 'react'
import downloadbtn from '../../../assets/images/downloadbtn.png'
import logo from '../../../assets/images/aviatorimage.png'
import messageicon from '../../../assets/images/messageicon.png'
import theme from '../../../utils/theme'


function Header() {
    return (
        <Box sx={{ background: '#221f20', py: '5px', px: 1, }} >
            <Grid container spacing={0} xs={12}>
                <Grid container item xs={12} >
                    <Box component='img' src={logo} sx={{ height: '40px !important', margin: 'auto' }}></Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Header
