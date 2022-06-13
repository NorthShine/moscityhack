module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'airbnb'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'react',
    '@typescript-eslint'
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts', '.tsx'],
        moduleDirectory: ['src', 'node_modules']
      }
    }
  },
  rules: {
    'comma-dangle': ['error', {
      arrays: 'never',
      objects: 'never',
      imports: 'never',
      exports: 'never',
      functions: 'never'
    }],
    camelcase: 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    'import/no-anonymous-default-export': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/prefer-default-export': 'off',
    'import/extensions': ['error', 'never', { png: 'always' }],
    'jsx-a11y/media-has-caption': 'off',
    'max-classes-per-file': 'off',
    'object-curly-newline': 'off',
    'padded-blocks': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js', 'jsx', '.tsx', '.png'] }],
    'react/jsx-props-no-spreading': 'off',
    'react/prefer-stateless-function': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/function-component-definition': [2, { namedComponents: 'arrow-function' }],
    'default-param-last': 'off',
    'no-param-reassign': 'off',
    'react/require-default-props': 'off',
    'react/jsx-no-constructed-context-values': 'off'
  }
};
