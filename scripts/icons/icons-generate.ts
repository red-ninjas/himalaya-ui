import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';
import fs from 'fs-extra';
import path from 'path';
import { optimize } from 'svgo/lib/svgo';
import { transform } from '@babel/core';
import { moduleBabelConfig, allModulesBabelConfig, replaceAll, toHumpName, toComponentName, makeBasicDefinition } from './utils';
import { svgoOptions } from './svgo.config';

const outputDir = path.join(__dirname, '../', '../', 'src/components/icons');
const sourceFile = path.join(__dirname, '../', '../', '.source');

export default (async () => {
  await fs.remove(outputDir);
  const html = await fs.readFile(sourceFile, 'utf8');
  const document = new JSDOM(html).window.document;

  let exports = `import { SVGAttributes } from 'react';

export interface IconProps {
  size?: string|number,
  color?: string,
}

type NativeAttrs = Omit<SVGAttributes<SVGElement>, keyof IconProps>
export type IconPropsNative = IconProps & NativeAttrs
  `;
  let definition = makeBasicDefinition();

  const icons = document.querySelectorAll('.geist-list .icon');
  const promises = Array.from(icons).map(async (icon: Element) => {
    const name: string = icon.querySelector('.geist-text').textContent;
    const componentName = toComponentName(name);
    const fileName = toHumpName(name);

    const svg = icon.querySelector('svg');

    const { data: optimizedSvgString } = await optimize(svg.outerHTML, svgoOptions);
    const styles = parseStyles(svg.getAttribute('style'));

    console.log(styles);

    const component = `'use client';
import React from 'react';
import {IconPropsNative} from './'
const ${componentName} = ({ size = 24, color, style, ...props } : IconPropsNative ) => {
  return ${parseSvg(optimizedSvgString, styles, svg.getAttribute('style'))};
}
export default ${componentName};`;

    exports += `export { default as ${componentName} } from './${fileName}';\n`;
    definition += `export const ${componentName}: Icon;\n`;

    await fs.outputFile(path.join(outputDir, `${fileName}.tsx`), component);
  });

  await Promise.all(promises);
  await fs.outputFile(path.join(outputDir, 'index.ts'), exports);
})();

const parseSvg = (svg: string, styles: any, styleOv) => {
  svg = svg.replace(styleOv, '');
  svg = svg.replace('style="" ', '');
  svg = replaceAll(svg, 'var(--geist-fill)', 'currentColor');
  svg = replaceAll(svg, '--geist-stroke', '--ui-icon-background');

  svg = svg.replace(/-([a-z])(?=[a-z\-]*[=\s/>])/g, g => g[1].toUpperCase());
  svg = svg.replace(/<svg([^>]+)>/, `<svg$1 {...props} height={size} width={size} style={{...style, color: color }}>`);

  return svg;
};

const parseStyles = (inlineStyle = '') => {
  return (inlineStyle || '').split(';').reduce((styleObject, stylePropertyValue) => {
    // extract the style property name and value
    let [property, value] = stylePropertyValue
      .split(/^([^:]+):/)
      .filter((val, i) => i > 0)
      .map(item => item.trim().toLowerCase());

    styleObject[property] = value;
    return styleObject;
  }, {});
};
