import { UIThemes, UIThemesExpressiveness, UIThemesPalette } from './index';
import { defaultFont, defaultStyles, generateAccents, generateColors } from './shared';

const ascents = generateAccents('#161618', true);
const colors = generateColors();
export const palette: UIThemesPalette = Object.assign(
	ascents,
	{
		foreground: '#fcfcfc',
		selection: '#f81ce5',
		code: '#47b6b7',
		link: '#47b6b7',
		purple: '#f81ce5',
		alert: '#ff0080',
		magenta: '#eb367f',

		gradient_1: {
			from: '#46e3b7',
			to: '#527cac',
		},
		gradient_2: {
			from: '#f537f9',
			to: '#f7be2b',
		},
		gradient_3: {
			from: '#e84e38',
			to: '#ba2cb8',
		},
	},
	colors,
);

export const expressiveness: UIThemesExpressiveness = {
	linkStyle: 'none',
	linkHoverStyle: 'none',
	dropdownBoxShadow: '0 0 0 1px ' + palette.border,
	scrollerStart: 'rgba(255, 255, 255, 1)',
	scrollerEnd: 'rgba(255, 255, 255, 0)',
	shadowSmall: '0 0 0 1px ' + palette.border,
	shadowMedium: '0 0 0 1px ' + palette.border,
	shadowLarge: '0 0 0 1px ' + palette.border,
	portalOpacity: 0.75,
};

export const font = defaultFont;

export const style = defaultStyles;

export const themes: UIThemes = {
	type: 'grey',
	font,
	palette,
	expressiveness,
	style,
};

export default themes;
