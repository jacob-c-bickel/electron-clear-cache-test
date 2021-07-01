const btn = document.getElementById("renameBtn");
const imgContainer = document.getElementById("container");

btn.addEventListener("click", async () => {
  // This works, but requires insecure nodeIntegration=true and no preload script
  // await require("electron").ipcRenderer.invoke("SWAP_FILENAMES");
  // require("electron").webFrame.clearCache();

  await window.api.swapFilenames(); // Comment out to test webFrame

  // Rerender the image tags.
  imgContainer.innerHTML = '<img width=200 height=200 src="./images/1.jpg"> <img width=200 height=200 src="./images/2.jpg">';
});