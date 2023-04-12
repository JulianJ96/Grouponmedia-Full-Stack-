import { getInstance } from "./auth0-plugin";

export const authenticationGuard = (to, from, next) => {
  const authService = getInstance();

  const guardAction = () => {
    if (authService.isAuthenticated) {
      return next();
    }

    authService.loginWithRedirect({ appState: { targetUrl: to.fullPath } });
  };

  // If the Auth0Plugin has loaded already, check the authentication state
  if (!authService.loading) {
    return guardAction();
  }

  authService.$watch('loading', (isLoading) => {
    if (isLoading === false) {
      return guardAction();
    }
  });
};

