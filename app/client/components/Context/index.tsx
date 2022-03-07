import useAuthCtx, { AuthCtxProvider } from "./useAuthCtx";
import useUICtx, { UICtxProvider } from "./useUICtx";
import useProfile, { ProfileCtxProvider } from "./useProfileCtx";

const Index = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthCtxProvider>
      <ProfileCtxProvider>
        <UICtxProvider>
          {/*  */}
          {children}
        </UICtxProvider>
      </ProfileCtxProvider>
    </AuthCtxProvider>
  );
};

export default Index;

export { useAuthCtx, useUICtx, useProfile };
