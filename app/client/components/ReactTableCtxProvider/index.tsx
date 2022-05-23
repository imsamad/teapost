import { createContext, useContext } from 'react';

const ReactTableCtx = createContext<{ resetData: () => Promise<void> }>({
  resetData: async () => {},
});

const ReactTableCtxProvider = ({
  resetData,
  children,
}: {
  children: React.ReactNode;
  resetData: () => Promise<void>;
}) => {
  return (
    <ReactTableCtx.Provider value={{ resetData }}>
      {children}
    </ReactTableCtx.Provider>
  );
};

export const useResetData = () => useContext(ReactTableCtx);

export default ReactTableCtxProvider;
