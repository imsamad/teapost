import useAuthCtx, { AuthCtxProvider } from './useAuthCtx';
import useProfile, { ProfileCtxProvider } from './useProfileCtx';
const Index = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthCtxProvider>
      <ProfileCtxProvider>{children}</ProfileCtxProvider>
    </AuthCtxProvider>
  );
};

export default Index;

export { useAuthCtx, useProfile };
