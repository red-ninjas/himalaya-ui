'use client';

import { PrismTheme } from 'prism-react-renderer';
import { UIThemes } from 'components/themes/presets';

const makeCodeTheme = (theme: UIThemes): PrismTheme => ({
  plain: {
    backgroundColor: theme.palette.background.hex_1000,
    color: theme.palette.background.hex_500,
    fontWeight: '400',
    fontStyle: 'normal',
  },
  styles: [
    {
      types: ['comment', 'prolog', 'doctype', 'cdata', 'punctuation'],
      style: {
        color: theme.palette.background.hex_600,
        opacity: 0.5,
      },
    },
    {
      types: ['namespace'],
      style: {
        opacity: 1,
      },
    },
    {
      types: ['tag', 'operator', 'number'],
      style: {
        color: theme.palette.background.hex_300,
      },
    },
    {
      types: ['property', 'function'],
      style: {
        color: theme.palette.success.hex_1000,
      },
    },
    {
      types: ['tag-id', 'selector', 'atrule-id'],
      style: {
        color: '#eeebff',
      },
    },
    {
      types: ['attr-name'],
      style: {
        color: theme.palette.warning.hex_1000,
      },
    },
    {
      types: [
        'boolean',
        'string',
        'entity',
        'url',
        'attr-value',
        'keyword',
        'control',
        'directive',
        'unit',
        'statement',
        'regex',
        'at-rule',
        'placeholder',
        'variable',
      ],
      style: {
        color: theme.palette.tertiary.hex_1000,
      },
    },
    {
      types: ['deleted'],
      style: {
        textDecorationLine: 'line-through',
      },
    },
    {
      types: ['language-javascript', 'script'],
      style: {
        color: theme.palette.primary.hex_1000,
      },
    },
    {
      types: ['inserted'],
      style: {
        textDecorationLine: 'underline',
      },
    },
    {
      types: ['italic'],
      style: {
        fontStyle: 'italic',
      },
    },
    {
      types: ['important', 'bold'],
      style: {
        fontWeight: 'bold',
      },
    },
    {
      types: ['important'],
      style: {
        color: '#c4b9fe',
      },
    },
  ],
});

export default makeCodeTheme;
