import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import pluginReactJSXRuntime from "eslint-plugin-react/configs/jsx-runtime.js";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  pluginReactJSXRuntime,
];
