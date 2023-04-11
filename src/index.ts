import "./styles.scss"
import LichessPgnViewer from "@ranklab-gaming/lichess-pgn-viewer"

document.addEventListener("DOMContentLoaded", () => {
  LichessPgnViewer(document.getElementById("b1")!, {
    pgn: "e4 c5 Nf3 d6 e5 Nc6 exd6 Qxd6 Nc3 Nf6",
  })
})
