"use client"
import React from 'react'
import { Box, Typography,Grid } from '@mui/material'
import { styled } from '@mui/material'
import FilmItem from '../film-item/FilmItem'

const RowFilms = styled('div')({
    width:'100%',
    marginBottom:'30px'
})
export default function FilmsShowing() {
  return (
    <Box sx={{paddingLeft:'30px',marginBottom:'35px',position:'relative',width:'930px'}}>
        <Box sx={{marginBottom:'35px',borderBottom:'3px solid #fff'}}>
            <Typography sx={{marginBottom:'15px',textTransform:'capitalize',fontSize:'24px',color:'#fff'}} variant='h3'>phim đang chiếu</Typography>
        </Box>
        <Box sx={{width:'100%'}}>
            <RowFilms>
                <Grid container justifyContent={'space-between'}>
                    <Grid xs={2.5}>
                        <FilmItem/>
                    </Grid>
                    <Grid xs={2.5}>
                        <FilmItem/>
                    </Grid>
                    <Grid xs={2.5}>
                        <FilmItem/>
                    </Grid>
                    <Grid xs={2.5}>
                        <FilmItem/>
                    </Grid>
                </Grid>
            </RowFilms>
            <RowFilms>
                <Grid container justifyContent={'space-between'}>
                    <Grid xs={2.5}>
                        <FilmItem/>
                    </Grid>
                    <Grid xs={2.5}>
                        <FilmItem/>
                    </Grid>
                    <Grid xs={2.5}>
                        <FilmItem/>
                    </Grid>
                    <Grid xs={2.5}>
                        <FilmItem/>
                    </Grid>
                </Grid>
            </RowFilms>
        </Box>
    </Box>
  )
}
