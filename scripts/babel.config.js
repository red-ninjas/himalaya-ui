module.exports = {
  presets: [
    [
      '@babel/env',
      {
        bugfixes: true,
        modules: false,
      },
    ],
    '@babel/react',
    '@babel/typescript',
    [
      'next/babel',
      {
        'styled-jsx': {
          plugins: ['@styled-jsx/plugin-sass'],
        },
      },
    ],
  ],
  plugins: [
    '@babel/plugin-transform-block-scoping',
    '@babel/plugin-proposal-class-properties',
    ['@babel/plugin-proposal-object-rest-spread', { loose: true }],
    ['@babel/plugin-transform-runtime', { useESModules: true }],
  ],

  ignore: [/@babel[\\|/]runtime/],
}
