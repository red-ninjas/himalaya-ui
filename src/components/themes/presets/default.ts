import { UIThemes, UIThemesExpressiveness, UIThemesPalette } from './index';
import { defaultFont, defaultStyles, generateAccents, generateColors } from './shared';
const ascents = generateAccents('#FFFFFF', false);
const colors = generateColors();
export const palette: UIThemesPalette = Object.assign(
	ascents,
	{
		foreground: '#000',
		selection: '#79ffe1',
		code: '#47b6b7',
		link: '#47b6b7',
		purple: '#f81ce5',
		alert: '#ff0080',
		magenta: '#eb367f',

		gradient_1: {
			from: '#b822ef',
			to: '#4723f8',
		},
		gradient_2: {
			from: '#7d00d9',
			to: '#ff0080',
		},
		gradient_3: {
			from: '#ff4d4d',
			to: '#fbca00',
		},
	},
	colors,
);

export const expressiveness: UIThemesExpressiveness = {
	linkStyle: 'none',
	linkHoverStyle: 'none',
	dropdownBoxShadow: '0 4px 4px 0 rgba(0, 0, 0, 0.02)',
	scrollerStart: 'rgba(255, 255, 255, 1)',
	scrollerEnd: 'rgba(255, 255, 255, 0)',
	shadowSmall: '0 5px 10px rgba(0, 0, 0, 0.12)',
	shadowMedium: '0 8px 30px rgba(0, 0, 0, 0.12)',
	shadowLarge: '0 30px 60px rgba(0, 0, 0, 0.12)',
	portalOpacity: 0.25,
};

export const font = defaultFont;

export const style = defaultStyles;

export const themes: UIThemes = {
	type: 'light',
	font,
	palette,
	style,
	expressiveness,
};

export default themes;
