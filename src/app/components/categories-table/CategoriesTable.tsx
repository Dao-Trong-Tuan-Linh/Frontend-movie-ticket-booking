"use client";
import { useMemo} from "react";
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


function createData(id:string,name: string) {
  return { id,name };
}



interface CategoriesTableProps {
  allCategories: ICategory[];
  handleOpenEdit: (id:string) => void;
  handleOpenDelete: (id:string) => void;
}
export default function CategoriesTable({
  allCategories,
  handleOpenEdit,
  handleOpenDelete,
}: CategoriesTableProps) {
  const dispatch = useDispatch()
  const data = useMemo(() => allCategories, [allCategories]);
  
  const column = useMemo(
    () => [
      {
        name:'Id'
      },
      {
        name: "Tên danh mục",
      },
      { name: "Chức năng" },
    ],
    []
  );
  const rows = useMemo(
    () => data.map((category) => createData(`${category._id}`,`${category.name}`)),
    [data]
  );
  
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
           {column.map((c,index) => (
             <TableCell align="center" key={index}>{c.name}</TableCell>
           ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
            <TableCell align="center" component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="center" component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="center">
                <Button
                sx={{marginRight:'10px'}}
                  onClick={() => {
                    handleOpenEdit(row.id)
                  }}
                  color="warning"
                  variant="contained"
                >
                  Sửa
                </Button>
                <Button
                  onClick={() => {
                    handleOpenDelete(row.id)
                  }}
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
