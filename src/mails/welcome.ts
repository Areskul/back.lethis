import { defaultCSS } from "./css/default";

export const welcomeHtml = (user: any) => {
  const html =
    `
<div class="gradient"></div>
  <h1 class="banner">Lethis</h1>
  <div class="body">
  <h2>Bienvenue ${user.name}</h2>
  <p>L'équipe des developpeurs de Lethis vous souhaite la bienvenue!</p>
` + defaultCSS;

  return {
    html,
  };
};
