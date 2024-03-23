'use client';

import { Link, Text, useTheme } from 'components';
import NextLink from 'next/link';
import React from 'react';

export type HomeCellProps = {
  url: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
};

const HomeCell: React.FC<HomeCellProps> = ({ url, title, desc, icon }) => {
  const theme = useTheme();
  return (
    <NextLink href={url} passHref legacyBehavior>
      <Link style={{ width: '100%', height: '100%' }}>
        <div className="feature shine-effect">
          <div className="feature__icon">{icon}</div>
          <Text h4 mt={'8px'} mb={'24px'} font={1.5}>
            {title}
          </Text>

          <Text color={theme.palette.background.hex_300} m={0} font={1} className="feature-desc">
            {desc}
          </Text>

          <div className="shine-effect"></div>
        </div>
        <style jsx>{`
          .feature {
            width: 100%;
            padding: 40px 40px;
            border: 1px solid ${theme.palette.border.value};
            height: 100%;
            border-radius: 10px;
            display: flex;
            flex-direction: column;
          }

          .feature__icon {
            height: 40px;
            width: 40px;
            border-radius: 2rem;
            background: ${theme.palette.background.hex_900};
            border: 1px solid ${theme.palette.border.value};
            color: ${theme.palette.background.hex_400};
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 8px;
            padding: 8px;
          }
          :global(.feature-desc) {
            color: ${theme.palette.background.hex_300} !important;
          }
        `}</style>
      </Link>
    </NextLink>
  );
};

export default HomeCell;
