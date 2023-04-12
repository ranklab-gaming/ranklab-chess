import "./styles.scss"
import LichessPgnViewer from "@ranklab-gaming/lichess-pgn-viewer"

document.addEventListener("DOMContentLoaded", function () {
  window.parent.postMessage({ type: "ready" }, "*")
})

window.addEventListener("message", function (event) {
  if (event.data.type === "loadPgn") {
    LichessPgnViewer(document.getElementById("board")!, {
      pgn: event.data.pgn,
      drawArrows: false,
      lichess: false,
    })
  }
})
