import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import AddModal from "./modals/AddModal";

/**
 * Header コンポーネント
 *
 * @returns {React.ReactElement}
 */
const Header: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1 }}
          >
            TODO
          </Typography>
          <AddModal />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
