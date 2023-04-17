/* eslint-disable @typescript-eslint/no-explicit-any */
import "./styles.scss"
import LichessPgnViewer from "@ranklab-gaming/lichess-pgn-viewer"

document.addEventListener("DOMContentLoaded", function () {
  window.parent.postMessage({ type: "ready" }, "*")
})

function filterFunctions(obj: any) {
  const result = {} as any

  for (const key in obj) {
    if (typeof obj[key] === "object" && obj[key] !== null) {
      result[key] = filterFunctions(obj[key])
    } else if (typeof obj[key] !== "function") {
      result[key] = obj[key]
    }
  }

  return result
}

window.addEventListener("message", function (event) {
  const boardElement = document.getElementById("board")
  if (!boardElement) return

  if (event.data.type === "loadPgn") {
    LichessPgnViewer(boardElement, {
      pgn: event.data.pgn,
      drawArrows: false,
      lichess: false,
      initialPly: 1,
      events: {
        onMove: (move) => {
          window.parent.postMessage({ type: "move", move: filterFunctions(move) }, "*")
        },
      },
    })
  }
})
