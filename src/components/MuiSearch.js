import React from "react";
import { Paper, InputBase, IconButton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import SearchIcon from "@mui/icons-material/Search";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    //width: 400
  },
  input: {
    marginLeft: "10px",
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
}));

function MuiSearch({ searchText, searchTextOnChange }) {
  const classes = useStyles();
  return (
    <>
      <Paper className={classes.root}>
        <InputBase value={searchText} onChange={searchTextOnChange} className={classes.input} placeholder="Search" inputProps={{ "aria-label": "search" }} />
        <IconButton className={classes.iconButton} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
    </>
  );
}

export default MuiSearch;
