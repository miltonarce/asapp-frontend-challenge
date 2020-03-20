module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: [
    "plugin:react/recommended",
    "plugin:prettier/recommended",
    "airbnb"
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: "module"
  },
  plugins: ["react"],
  rules: {
    quotes: ["error", "double"],
    "comma-dangle": ["error", "never"],
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
    "arrow-parens": ["error", "as-needed"]
  }
};
