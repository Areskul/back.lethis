import { defaultCSS } from "./css/default";

export const welcomeHtml = (user: any) => {
  const html =
    `
<div class="gradient"></div>
  <h1 class="banner">POC</h1>
  <div class="body">
  <h2>Bienvenue ${user.name}</h2>
  <p>L'équipe des developpeurs de POC vous souhaite la bienvenue!</p>
` + defaultCSS;

  return {
    html,
  };
};
