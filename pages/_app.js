import "../styles/globals.css";
import Link from "next/link";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import ToolBar from "@material-ui/core/Toolbar";
import MenuIcon from "@material-ui/icons/Menu";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";

import { Provider } from "react-redux";
import { useStore } from "../store";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme({});

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  paper: {
    paddding: theme.spacing(2),
    color: theme.palette.text.primary,
  },
}));

function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);
  const classes = useStyles();

  return (
    <Provider store={store}>
      <div className={classes.root}>
        <AppBar position="static">
          <ToolBar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className="classes.title">
              News
            </Typography>
          </ToolBar>
        </AppBar>
        <Link href="/">
          <Button>GotoHome</Button>
        </Link>
        <br />
        <Link href="/guest/input">
          <a>Goto input info</a>
        </Link>
        <Container>
          <Component {...pageProps} />
        </Container>
      </div>
    </Provider>
  );
}

export default MyApp;
