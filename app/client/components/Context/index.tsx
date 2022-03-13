import useAuthCtx, { AuthCtxProvider } from "./useAuthCtx";
import useProfile, { ProfileCtxProvider } from "./useProfileCtx";
import useUICtx, { UICtxProvider } from "./useUICtx";
// import useCollDrawer, { CollDrawerCtxProvider } from "./useCollDrawer";
const Index = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthCtxProvider>
      <ProfileCtxProvider>
        <UICtxProvider>
          {/* <CollDrawerCtxProvider> */}
          {/*  */}
          {children}
          {/* </CollDrawerCtxProvider> */}
        </UICtxProvider>
      </ProfileCtxProvider>
    </AuthCtxProvider>
  );
};

export default Index;

export { useAuthCtx, useUICtx, useProfile };
