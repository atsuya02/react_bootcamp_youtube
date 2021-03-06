import {
  AppBar,
  Avatar,
  Button,
  IconButton,
  Toolbar,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import VideoCallIcon from "@material-ui/icons/VideoCall";
import { Logo } from "components/Logo";
import { SearchBar } from "templates/DashboardHeader/SearchBar"
import useStyles from "templates/DashboardHeader/style";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { GlobalUser } from "stores/User";

export const DashboardHeader = () => {
  const styles = useStyles();
  const globalUser = useRecoilValue(GlobalUser);

  return (
    <AppBar elevation={0} color="inherit">
      <Toolbar className={styles.between}>
        <div className={styles.flex}>
          <IconButton>
            <MenuIcon />
          </IconButton>
          <Link to="/" className={styles.logo}>
            <Logo />
          </Link>
        </div>

        <SearchBar />

        <div className={styles.flex}>
          {globalUser ? (
            <>
              <Link to="/upload">
                <IconButton>
                  <VideoCallIcon />
                </IconButton>
              </Link>
              <IconButton className={styles.profileIcon}>
                <Avatar />
              </IconButton>
            </>
          ) : (
            <Button variant="outlined" color="primary" href="/login">
              ログイン
            </Button>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};
