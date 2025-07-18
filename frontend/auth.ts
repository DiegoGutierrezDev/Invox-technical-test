import { UserManager } from "oidc-client-ts";

const cognitoAuthConfig = {
  authority: "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_ZBe5MgStb",
  client_id: "4eum6d6164su7tv4fthg1g7ckk",
  redirect_uri: "http://localhost:3000/dashboard",
  response_type: "code",
  scope: "phone openid email",
};

export const userManager = new UserManager({
  ...cognitoAuthConfig,
});

export async function signOutRedirect() {
  const clientId = "4eum6d6164su7tv4fthg1g7ckk";
  const logoutUri = "<http://localhost:3000/logged_out>";
  const cognitoDomain =
    "https://us-east-1zbe5mgstb.auth.us-east-1.amazoncognito.com>";
  window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(
    logoutUri
  )}`;
}
