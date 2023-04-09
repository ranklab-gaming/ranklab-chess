import "./styles.css"

document.addEventListener("DOMContentLoaded", () => {
  const appDiv = document.getElementById("app")

  if (!appDiv) {
    throw new Error("Could not find the app div")
  }

  appDiv.innerHTML = "Hello, World"
})
