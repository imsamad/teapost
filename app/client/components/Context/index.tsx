import useAuthCtx, { AuthCtxProvider } from "./useAuthCtx";
import useProfile, { ProfileCtxProvider } from "./useProfileCtx";
import useUICtx, { UICtxProvider } from "./useUICtx";

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
