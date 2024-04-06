'use client';

import { PrismTheme } from 'prism-react-renderer';

const makeCodeTheme = (): PrismTheme => ({
  plain: {
    backgroundColor: 'var(--color-background-1000)',
    color: 'var(--color-background-600)',
    fontWeight: '400',
    fontStyle: 'normal',
  },

  styles: [
    {
      types: ['comment', 'prolog', 'doctype', 'cdata', 'punctuation'],
      style: {
        color: 'var(--color-background-1200)',
        opacity: 0.8,
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
        color: 'var(--color-warning-1200)',
      },
    },
    {
      types: ['property', 'function'],
      style: {
        color: 'var(--color-link-1200)',
      },
    },
    {
      types: ['tag-id', 'selector', 'atrule-id'],
      style: {
        color: 'var(--color-background-100)',
      },
    },
    {
      types: ['attr-name'],
      style: {
        color: 'var(--color-success-1200)',
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
        color: 'var(--color-tertiary-1100)',
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
        color: 'var(--color-warning-1100)',
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
        color: 'var(--color-tertiary-1800)',
      },
    },
  ],
});

export default makeCodeTheme;
