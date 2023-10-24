'use client';

import React from 'react';
import Card from '../card';
import Link from '../link';
import useTheme from '../use-theme';
import NextLink from 'next/link';

export type HomeCellProps = {
  url: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
};

const UspCell: React.FC<HomeCellProps> = ({ url, title, desc, icon }) => {
  const theme = useTheme();
  return (
    <>
      <NextLink href={url} passHref legacyBehavior>
        <Link>
          <Card padding="5px" shadow width="100%" height={'100%'}>
            <h4 className="feature_title">
              <div className="feature_icon">{icon}</div>
              {title}
            </h4>
            <p className="feature_description">{desc}</p>
          </Card>
        </Link>
      </NextLink>
      <style jsx>{`
        .feature_description {
          margin: 1em 0;
          font-size: 1em;
          line-height: 1.625em;
          margin-bottom: 0;
          color: ${theme.palette.accents_6};
        }
        .feature_title {
          display: -webkit-box;
          display: -webkit-flex;
          display: -ms-flexbox;
          display: flex;
          -webkit-flex-direction: row;
          -ms-flex-direction: row;
          flex-direction: row;
          -webkit-align-items: center;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          font-size: 1.25rem;
          letter-spacing: -0.02em;
          font-weight: 600;
        }
        .feature_icon {
          height: 2.5rem;
          width: 2.5rem;
          padding: 0.625rem;
          margin-right: 8pt;
          display: -webkit-box;
          display: -webkit-flex;
          display: -ms-flexbox;
          display: flex;
          -webkit-align-items: center;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          -webkit-justify-content: center;
          justify-content: center;
          background: linear-gradient(#3291ff, #0761d1);
          color: #fff;
          border-radius: 2rem;
        }
      `}</style>
    </>
  );
};

export default UspCell;
