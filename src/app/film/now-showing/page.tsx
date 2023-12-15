"use client";
import React from "react";
import { styled } from "@mui/system";
import Categories from "@/app/components/categories/Categories";
import { Grid } from "@mui/material";
import FilmsShowing from "@/app/components/films-showing/FilmsShowing";

const Container = styled("div")({
  position: "relative",
  padding: "80px 20px 0 100px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
export default function page() {
  return (
    <Container>
      <Grid container>
        <Grid xs={2}>
          <Categories />
        </Grid>
        <Grid xs={10}>
          <FilmsShowing />
        </Grid>
      </Grid>
    </Container>
  );
}
