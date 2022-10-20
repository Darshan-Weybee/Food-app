module.exports = {
  // parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  settings: {
    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
   extends: [
    'react-app',
    'react-app/jest',
    'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  plugins: ['react', 'react-hooks'],
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // e.g. "@typescript-eslint/explicit-function-return-type": "off",    
    "no-unused-vars": ["warn"],
    "prettier/prettier": ["error", {"singleQuote": false}],
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "react/jsx-uses-react": 1,
    "react/jsx-uses-vars": 1,
    "react/react-in-jsx-scope": 1,
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "react/display-name": 0,
    "react/prop-types": [0, { "ignore": ["children"] }],
    "jsx-a11y/anchor-is-valid": 0
  }

  // "env": {
  //   "jest": true,
  //   "browser": true
  // },
  // "rules": {
  //   "import/no-extraneous-dependencies": "off",
  //   "import/prefer-default-export": "off",
  //   "no-confusing-arrow": "off",
  //   "linebreak-style": "off",
  //   "arrow-parens": ["error", "as-needed"],
  //   "comma-dangle": [
  //     "error",
  //     {
  //       "arrays": "always-multiline",
  //       "objects": "always-multiline",
  //       "imports": "always-multiline",
  //       "exports": "always-multiline",
  //       "functions": "ignore"
  //     }
  //   ],
  //   "no-plusplus": "off"
  // },
  // "parser": "babel-eslint",
  // "plugins": ["react"],
  // "globals": {
  //   "browser": true,
  //   "$": true,
  //   "before": true,
  //   "document": true
  // }
}

