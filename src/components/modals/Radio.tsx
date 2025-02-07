import { radioOption } from "../../enums/Enum";

interface RadioProps {
  selectVal: number;
  setSelectVal: React.Dispatch<React.SetStateAction<number>>;
}

/**
 * Radio コンポーネント
 * 優先度の選択欄
 *
 * @param {object} props
 * @param {number} props.selectVal - 現在のラジオボタン選択状態
 * @param {React.Dispatch<React.SetStateAction<number>>} props.setSelectVal - ラジオボタン選択状態の更新関数
 * @returns {React.ReactElement}
 */
const Radio: React.FC<RadioProps> = (props: RadioProps) => {
  return (
    <div className="margin10">
      <label className="margin-right10">優先度：</label>
      {radioOption.map((opt) => {
        return (
          <div
            key={Math.random()}
            style={{ display: "inline-block" }}
          >
            <input
              type="radio"
              name="priority"
              value={opt.id}
              id={`priority-${opt.id}`}
              onChange={(e) => {
                props.setSelectVal(Number(e.target.value));
              }}
              checked={props.selectVal === opt.id}
            />
            <label htmlFor={`priority-${opt.id}`}>{opt.text}</label>
          </div>
        );
      })}
    </div>
  );
};

export default Radio;
