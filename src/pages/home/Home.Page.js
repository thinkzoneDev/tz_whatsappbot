import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { format, intervalToDuration, formatDistanceStrict } from "date-fns";

// thunks
import { get_messaging_history } from "./Home.Thunk";

import { Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import MuiHeader from "../../components/MuiHeader";
import MessagingPage from "./../messaging/Messaging.Page";

function HomePage() {
  const dispatch = useDispatch();

  const data = useSelector((state) => (state.HomeSlice.data.data ? state.HomeSlice.data.data : []));
  const loading = useSelector((state) => state.HomeSlice.loading);

  useEffect(() => {
    dispatch(get_messaging_history());
  }, [dispatch]);

  // ---------------- table -----------------
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(4);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  // ----------------------------------------

  // --------- open messaging page ----------
  const [showMessagingPage, setShowMessagingPage] = useState(false);
  const open_messaging_page = () => {
    setShowMessagingPage(true);
  };
  const close_messaging_page = () => {
    setShowMessagingPage(false);
  };
  // ----------------------------------------

  return (
    <>
      <MuiHeader header="Home" />
      <div>
        <div>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={6}>
              <div>Message history: {data.length} Record(s) found</div>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <div>
                <Button variant="contained" color="primary" onClick={open_messaging_page}>
                  Send Message
                </Button>
              </div>
            </Grid>
          </Grid>
        </div>

        <div>
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" style={{ minWidth: 100 }}>
                      Srl.
                    </TableCell>
                    <TableCell align="center" style={{ minWidth: 100 }}>
                      Total
                    </TableCell>
                    <TableCell align="center" style={{ minWidth: 100 }}>
                      Sent
                    </TableCell>
                    <TableCell align="center" style={{ minWidth: 100 }}>
                      Failed
                    </TableCell>
                    <TableCell align="center" style={{ minWidth: 100 }}>
                      Invalid
                    </TableCell>
                    <TableCell align="center" style={{ minWidth: 100 }}>
                      Time taken
                    </TableCell>
                    <TableCell align="center" style={{ minWidth: 100 }}>
                      Date
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                    return (
                      <>
                        <TableRow hover role="checkbox" tabIndex={-1}>
                          <TableCell align="center">{index + 1}</TableCell>
                          <TableCell align="center">{row.total_contacts}</TableCell>
                          <TableCell align="center">{row.total_sent}</TableCell>
                          <TableCell align="center">{row.total_failed}</TableCell>
                          <TableCell align="center">{row.total_invalid}</TableCell>
                          <TableCell align="center">{formatDistanceStrict(new Date(row.endon), new Date(row.starton))}</TableCell>
                          {/* <TableCell align="center">{format(new Date(row.starton), "dd/mm/yyyy")}</TableCell> */}
                          <TableCell align="center">{new Date(row.starton).getDate() + "/" + (new Date(row.starton).getMonth() + 1) + "/" + new Date(row.starton).getFullYear()}</TableCell>
                        </TableRow>
                      </>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination rowsPerPageOptions={[10, 25, 100]} component="div" count={data.length} rowsPerPage={rowsPerPage} page={page} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} />
          </Paper>
        </div>
      </div>

      {/* Messaging page */}
      <MessagingPage open={showMessagingPage} onClose={close_messaging_page} />
    </>
  );
}

export default HomePage;
