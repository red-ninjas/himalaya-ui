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
    [
      'transform-rename-import',
      {
        replacements: [
          { original: 'styled-jsx/style', replacement: '../styled-jsx.es.js' },
          { original: 'styled-jsx/server', replacement: '../styled-jsx-server.es.js' },
        ],
      },
    ],
  ],

  ignore: [/@babel[\\|/]runtime/],
}
