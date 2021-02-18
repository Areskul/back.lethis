export const defaultCSS = `
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
    padding-right: var(--indent);
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
</style>
`;
