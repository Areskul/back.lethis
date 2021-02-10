import { defaultCSS } from "./css/default";

export const resetPasswordHtml = (token: string) => {
  const html =
    `
<div class="gradient"></div>
  <h1 class="banner">POC</h1>
  <div class="body">
  <h2>Nouveau mot de passe</h2>
  <p>Vous pouvez renouveler votre mot de passe en cliquant sur
  <a href=http://localhost:8080/reset/${token}>
      ce lien
  </a></p>
  <p>Si vous n'êtes pas à l'origine de cette demande, contactez nous immediatement</p>
</div>
` + defaultCSS;

  return {
    html,
  };
};
