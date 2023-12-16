"use client";
import { useMemo } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { ICategory } from "@/app/redux/category/categoryInterface";
import { useDispatch } from "react-redux";
import { IMenu } from "@/app/redux/menu/menuInterface";
import { useRouter } from "next/navigation";
import { IShowtime } from "@/app/redux/showtime/showtimeInterface";
import { FilmObjectType } from "@/app/pages/AdminShowtime";

function createData(
  id: string,
  filmId: string,
  date: string,
  time: string,
  available: string,
  money: string
) {
  return { id, filmId, date, time, available, money };
}

interface ShowtimeTableProps {
  allShowtime: IShowtime[];
  obj: FilmObjectType;
}
export default function ShowtimeTable({
  allShowtime,
  obj,
}: ShowtimeTableProps) {
  const dispatch = useDispatch();
  const router = useRouter();
  const data = useMemo(() => allShowtime, [allShowtime]);

  const column = useMemo(
    () => [
      {
        name: "Tên phim",
      },
      {
        name: "Ngày chiếu",
      },
      { name: "Giờ chiếu" },
      { name: "Trạng thái" },
      {
        name: "Giá tiền/1 vé",
      },
      { name: "Chức năng" },
    ],
    []
  );

  const rows = useMemo(
    () =>
      data.map((showtime) =>
        createData(
          `${showtime._id}`,
          `${obj[showtime.filmId]}`,
          `${showtime.date}`,
          `${showtime.time}`,
          `${showtime.available}`,
          `${showtime.money}`
        )
      ),
    [data]
  );
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {column.map((c, index) => (
              <TableCell align="center" key={index}>
                {c.name}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {/* <TableCell align="center" component="th" scope="row">
                {row.id}
              </TableCell> */}
              <TableCell align="center" component="th" scope="row">
                {row.filmId}
              </TableCell>
              <TableCell align="center" component="th" scope="row">
                {row.date}
              </TableCell>
              <TableCell align="center" component="th" scope="row">
                {row.time}
              </TableCell>
              <TableCell align="center" component="th" scope="row">
                {row.available}
              </TableCell>
              <TableCell align="center" component="th" scope="row">
                {row.money}
              </TableCell>
              <TableCell align="center">
                <Button
                  sx={{ marginRight: "10px" }}
                  onClick={() => {
                    router.push(`/admin/menu/${row.id}`);
                  }}
                  color="warning"
                  variant="contained"
                >
                  Sửa
                </Button>
                <Button
                  //   onClick={() => {
                  //     handleOpenDelete(row.id)
                  //   }}
                  color="error"
                  variant="contained"
                >
                  Xóa
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
