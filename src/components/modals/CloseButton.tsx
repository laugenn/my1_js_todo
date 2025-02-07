import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { IconButton } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";

interface CloseButtonProps {
  onClick: () => void;
}

/**
 * CloseButton コンポーネント
 * モーダル表示した際の閉じるボタン
 *
 * @param {Object} props
 * @param {() => void} props.onClick - モーダルの開閉イベントハンドラ
 * @returns {React.ReactElement}
 */
const CloseButton: React.FC<CloseButtonProps> = (props: CloseButtonProps) => {
  return (
    <>
      <Tooltip
        title="モーダルを閉じる"
        placement="top"
      >
        <IconButton
          onClick={props.onClick}
          sx={{
            fontWeight: "bold",
            position: "relative",
            left: 160,
            top: -20,
          }}
        >
          <HighlightOffIcon sx={{ fontSize: 35 }} />
        </IconButton>
      </Tooltip>
    </>
  );
};

export default CloseButton;
