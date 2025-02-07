import { RadioOption } from "../types/TodoType";

const radioOption: RadioOption[] = [
  { id: 0, text: "いつでも" },
  { id: 1, text: "重要" },
  { id: 2, text: "緊急" },
];

enum RadioTextName {
  FREE = "free",
  IMPORTANT = "important",
  EMERGENCY = "emergency",
  ERROR = "error",
}

enum ActionType {
  CREATE = "create",
  EDIT = "edit",
  DELETE = "delete",
}

export { ActionType, radioOption, RadioTextName };
