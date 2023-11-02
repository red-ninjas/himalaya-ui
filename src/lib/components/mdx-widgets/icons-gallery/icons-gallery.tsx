'use client';
import * as Icons from 'components/icons';
import { Card, Input, Modal, Snippet, useInput, useModal } from 'components';
import React, { useState } from 'react';
import IconsCell, { getImportString } from './icons-cell';

const ImportSnippet: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {
  return (
    <Snippet>
      {children}
      <style jsx>{`
        :global(pre:before) {
          display: none;
        }
      `}</style>
    </Snippet>
  );
};

const IconsGallery: React.FC<unknown> = () => {
  const { setVisible, bindings: modalBindings } = useModal();
  const { state: query, bindings } = useInput('');
  const [importStr, setImportStr] = useState({ title: '', single: '', normal: '' });
  const icons = Object.entries(Icons).filter(([name]) => !query || name.toLowerCase().includes(query.toLowerCase()));
  const onCellClick = (name: string) => {
    const { single, normal } = getImportString(name);
    setImportStr({ title: name, single, normal });
    setVisible(true);
  };

  return (
    <>
      <h3 className="title">{'Icons Gallery'}</h3>
      <p>
        Explore and select from a wide range of available icons to suit your specific needs, helping to improve the visual representation of various elements
        and actions in your UI.
      </p>
      <Card>
        <Input width="100%" icon={<Icons.Search />} placeholder={'Search'} {...bindings} />
        <div className="icons-grid">
          {icons.map(([name, component], index) => (
            <IconsCell name={name} component={component} key={`${name}-${index}`} onClick={onCellClick} />
          ))}
        </div>
        <Modal {...modalBindings}>
          <Modal.Title>{importStr.title}</Modal.Title>
          <Modal.Content>
            <p>{'Import:'}</p>
            <ImportSnippet>{importStr.normal}</ImportSnippet>
            <p>{'Import single component:'}</p>
            <ImportSnippet>{importStr.single}</ImportSnippet>
          </Modal.Content>
        </Modal>
      </Card>
      <style jsx>{`
        .title {
          line-height: 1;
          margin-top: 75px;
          margin-bottom: 30px;
        }

        :global(input) {
          margin-bottom: 4px !important;
        }

        .icons-grid {
          display: flex;
          flex-wrap: wrap;
          margin-top: 8pt;
          justify-content: space-around;
        }
      `}</style>
    </>
  );
};
IconsGallery.displayName = 'HimalayaIconsGallery';
export default IconsGallery;
