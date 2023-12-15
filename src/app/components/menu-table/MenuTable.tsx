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


function createData(
  id: string,
  name: string,
  level: string,
  order: string,
  isActive: string,
  parentId: string,
  link: string
) {
  return { id, name, level, order, isActive, parentId, link };
}

interface MenuTableProps {
  allMenu: IMenu[];
}
export default function MenuTable({ allMenu }: MenuTableProps) {
  const dispatch = useDispatch();
  const router = useRouter()
  const data = useMemo(() => allMenu, [allMenu]);

  const column = useMemo(
    () => [
      {
        name: "Tên menu",
      },
      {
        name: "Trạng thái",
      },
      { name: "Mức" },
      {
        name: "Thứ tự",
      },
      {
        name: "Id cha",
      },
      {
        name: "Link",
      },
      { name: "Chức năng" },
    ],
    []
  );

  const rows = useMemo(
    () => data.map((menu) => createData(`${menu._id}`,`${menu.name}`,`${menu.level}`,`${menu.order}`,`${menu.isActive}`,`${menu.parentID}`,`${menu.link}`)),
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
                {row.name}
              </TableCell>
              <TableCell align="center" component="th" scope="row">
                {row.isActive}
              </TableCell>
              <TableCell align="center" component="th" scope="row">
                {row.level}
              </TableCell>
              <TableCell align="center" component="th" scope="row">
                {row.order}
              </TableCell>
              <TableCell align="center" component="th" scope="row">
                {row.parentId}
              </TableCell>
              <TableCell align="center" component="th" scope="row">
                {row.link}
              </TableCell>
              <TableCell align="center">
                <Button
                  sx={{ marginRight: "10px" }}
                    onClick={() => {
                      router.push(`/admin/menu/${row.id}`)
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
