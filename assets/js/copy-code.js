document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("pre.highlight").forEach((codeBlock) => {
    const button = document.createElement("button");
    button.className = "copy-code-button";
    button.type = "button";
    button.innerText = "Copy";

    button.addEventListener("click", () => {
      const code = codeBlock.innerText;
      navigator.clipboard.writeText(code).then(() => {
        button.innerText = "Copied!";
        setTimeout(() => {
          button.innerText = "Copy";
        }, 2000);
      });
    });

    codeBlock.appendChild(button);
  });
});
