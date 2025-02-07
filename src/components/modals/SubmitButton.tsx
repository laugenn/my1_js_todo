import Button from "@mui/material/Button";

interface SubmitButtonProps {
  title: string;
}

/**
 * SubmitButton コンポーネント
 *
 * @param {object} props
 * @param {SubmitButtonProps} props.title - ボタンタイトル
 * @returns {React.ReactElement}
 */
const SubmitButton: React.FC<SubmitButtonProps> = (
  props: SubmitButtonProps,
) => {
  return (
    <>
      <Button
        type="submit"
        sx={{ marginTop: 3, fontWeight: "bold" }}
      >
        {props.title}
      </Button>
    </>
  );
};

export default SubmitButton;
