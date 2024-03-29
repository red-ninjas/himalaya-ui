import React, { PropsWithChildren, useState } from 'react';
import { ProjectParams } from './get-docs';

export type DocumentationProps = {
  projectDoc: ProjectParams;
};

export interface DocumentationProviderConfig {
  setDocumentation: (value: ProjectParams) => void;
  documentation: ProjectParams;
}

const defaultContext = {
  documentation: {},
  setDocumentation: () => {},
};

export const DocumentationContext = React.createContext<DocumentationProviderConfig>(defaultContext);
export const useDocumentation = (): DocumentationProviderConfig => React.useContext<DocumentationProviderConfig>(DocumentationContext);

export const DocumentationProvider = ({ children, projectDoc }: PropsWithChildren<DocumentationProps>) => {
  const [project, setProject] = useState<ProjectParams>(projectDoc);

  return (
    <DocumentationContext.Provider
      value={{
        setDocumentation: setProject,
        documentation: project,
      }}
    >
      {children}
    </DocumentationContext.Provider>
  );
};
