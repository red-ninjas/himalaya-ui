'use client';
import React from 'react';
import useTheme from '../use-theme';

const Scrollbar: React.FC<React.PropsWithChildren<{ background?: string }>> = ({ children, background }) => {
	const theme = useTheme();

	return (
		<div className="scroll-area">
			<div className="outer-scroll">
				<div className="inner-scroll">{children}</div>
				<style jsx>{`
					.scroll-area {
						width: 100%;
						height: 100%;
						position: relative;
					}
					.outer-scroll {
						position: absolute;
						width: 100%;
						height: 100%;
						overflow: hidden;
						background: ${background || theme.palette.background};
					}

					.inner-scroll {
						overflow: visible overlay !important;
						scrollbar-width: auto;
						width: 100%;
						height: 100%;
					}

					.inner-scroll::-webkit-scrollbar {
						width: var(--page-scrollbar-width, 6px);
						background-color: transparent;
					}

					.inner-scroll::-webkit-scrollbar-track:vertical {
						border-radius: ${theme.style.radius};
						cursor: pointer;
					}

					.inner-scroll::-webkit-scrollbar-thumb:vertical {
						border-radius: ${theme.style.radius};
						cursor: pointer;
					}

					.inner-scroll::-webkit-scrollbar-track:horizontal {
						border-radius: ${theme.style.radius};
						cursor: pointer;
					}

					.inner-scroll::-webkit-scrollbar-thumb:horizontal {
						border-radius: ${theme.style.radius};
						cursor: pointer;
					}

					.inner-scroll::-webkit-scrollbar-corner,
					.inner-scroll::-webkit-resizer {
						background: inherit;
					}

					.inner-scroll:hover::-webkit-scrollbar-track:vertical {
						z-index: 9999;
					}

					.inner-scroll:hover::-webkit-scrollbar-thumb:vertical {
						background: ${theme.palette.accents_2};
					}

					.inner-scroll:hover::-webkit-scrollbar-track:horizontal {
						background: ${theme.palette.accents_2};
					}

					.inner-scroll:hover::-webkit-scrollbar-thumb:horizontal {
						background: ${theme.palette.accents_2};
					}

					.inner-scroll:hover::-webkit-scrollbar-corner,
					.inner-scroll:hover::-webkit-resizer {
						background: ${theme.palette.accents_2};
					}
				`}</style>
			</div>
		</div>
	);
};

export default Scrollbar;
