'use client';

import { PrismTheme } from 'prism-react-renderer';

const makeCodeTheme = (): PrismTheme => ({
  plain: {
    backgroundColor: 'var(--color-background-1000)',
    color: 'var(--color-background-500)',
    fontWeight: '400',
    fontStyle: 'normal',
  },
  styles: [
    {
      types: ['comment', 'prolog', 'doctype', 'cdata', 'punctuation'],
      style: {
        color: 'var(--color-background-600)',
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
        color: 'var(--color-background-300)',
      },
    },
    {
      types: ['property', 'function'],
      style: {
        color: 'var(--color-success-1000)',
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
        color: 'var(--color-warning-1000)',
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
        color: 'var(--color-tertiary-1000)',
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
        color: 'var(--color-primary-1000)',
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
