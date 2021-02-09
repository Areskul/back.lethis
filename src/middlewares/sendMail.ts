import { createTransport } from "nodemailer";

export const sendMail = async (token: string, receivers: string[]) => {
  const transporter = createTransport({
    host: "areskul.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "areskul",
      pass: "areskul",
    },
  });
  const html = `
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
  <style lang="css">
  :root {
    --secondary: #fa709a;
    --warning: #fee140;
    --spacing: 80px;
    --spacing-sm: 60px;
    --spacing-xl: 100px;
    --indent: 10%;
  }
  .body{
    padding-top: var(--spacing-xl);
    padding-left: var(--indent);
    padding-bottom: var(--spacing-sm);
  }
  a {
    color: var(--secondary);
  }
  .banner {
    z-index: 0;
    position: absolute;
    height: var(--spacing);
    padding-bottom: var(--spacing);
    padding-left: var(--indent);
    padding-right: var(--indent);
  }
  .gradient {
    z-index: -1;
    position: absolute;
    width: 120%;
    left: -20%;
    top: -20%;
    padding-bottom: var(--spacing);
    height: var(--spacing);
    background: linear-gradient(
      30deg,
      var(--secondary) 0%,
      var(--warning) 100%
    );
    background-size: 120% 120%;
    //transform: skewY(4deg);
    display: inline-block;
  }
  </style>`;
  await transporter.sendMail({
    from: '"Areskul" <service@areskul.com>', // sender address
    to: receivers, // list of receivers
    subject: "Hello", // Subject line
    text: "Hello world?", // plain text body
    html: html,
  });
};
