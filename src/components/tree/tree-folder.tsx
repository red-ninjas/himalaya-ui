'use client';
import React, { useEffect, useMemo, useState } from 'react';
import Expand from '../shared/expand';
import useClasses from '../use-classes';
import useTheme from '../use-theme';
import { setChildrenProps } from '../utils/collections';
import { useTreeContext } from './tree-context';
import TreeFile from './tree-file';
import TreeFolderIcon from './tree-folder-icon';
import { makeChildPath, sortChildren, stopPropagation } from './tree-help';
import TreeIndents from './tree-indents';
import TreeStatusIcon from './tree-status-icon';

interface Props {
  name: string;
  extra?: string;
  parentPath?: string;
  level?: number;
  className?: string;
}

type NativeAttrs = Omit<React.HTMLAttributes<HTMLDivElement>, keyof Props>;
export type TreeFolderProps = Props & NativeAttrs;

const TreeFolder: React.FC<React.PropsWithChildren<TreeFolderProps>> = ({
  name,
  children,
  parentPath = '',
  level: parentLevel = 0,
  extra,
  className = '',
  ...props
}: React.PropsWithChildren<TreeFolderProps>) => {
  const theme = useTheme();
  const { initialExpand, isImperative } = useTreeContext();
  const [expanded, setExpanded] = useState<boolean>(initialExpand);
  useEffect(() => setExpanded(initialExpand), []);

  const currentPath = useMemo(() => makeChildPath(name, parentPath), []);
  const clickHandler = () => setExpanded(!expanded);

  const nextChildren = setChildrenProps(
    children,
    {
      parentPath: currentPath,
      level: parentLevel + 1,
    },
    [TreeFolder, TreeFile],
  );

  const sortedChildren = isImperative ? nextChildren : sortChildren(nextChildren, TreeFolder);

  return (
    <div className={useClasses('folder', className)} onClick={clickHandler} {...props}>
      <div className="names">
        <TreeIndents count={parentLevel} />
        <span className="status">
          <TreeStatusIcon active={expanded} />
        </span>
        <span className="icon">
          <TreeFolderIcon />
        </span>
        <span className="name">
          {name}
          {extra && <span className="extra">{extra}</span>}
        </span>
      </div>
      <Expand isExpanded={expanded}>
        <div className="content" onClick={stopPropagation}>
          {sortedChildren}
        </div>
      </Expand>

      <style jsx>{`
        .folder {
          cursor: pointer;
          line-height: 1;
          user-select: none;
        }

        .names {
          display: flex;
          height: 1.75rem;
          align-items: center;
          margin-left: calc(1.875rem * ${parentLevel});
          position: relative;
        }

        .names > :global(.indent) {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 1px;
          height: 100%;
          background-color: ${theme.palette.background.hex_700};
          margin-left: -1px;
        }

        .status {
          position: absolute;
          left: calc(-1.125rem);
          top: 50%;
          transform: translate(-50%, -50%);
          width: 0.875rem;
          height: 0.875rem;
          z-index: 10;
          background-color: ${theme.palette.background.value};
        }

        .icon {
          width: 1.5rem;
          height: 100%;
          margin-right: 0.5rem;
        }

        .status,
        .icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .name {
          transition: opacity 100ms ease 0ms;
          color: ${theme.palette.background.hex_100};
          white-space: nowrap;
          font-size: 0.875rem;
        }

        .extra {
          font-size: 0.75rem;
          align-self: baseline;
          padding-left: 4px;
          color: ${theme.palette.background.hex_400};
        }

        .name:hover {
          opacity: 0.7;
        }

        .content {
          display: flex;
          flex-direction: column;
          height: auto;
        }
      `}</style>
    </div>
  );
};

TreeFolder.displayName = 'HimalayaTreeFolder';
export default TreeFolder;
