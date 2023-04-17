/* eslint-disable @typescript-eslint/no-explicit-any */
import { Path } from "@ranklab-gaming/lichess-pgn-viewer/path"
import "./styles.scss"
import LichessPgnViewer from "@ranklab-gaming/lichess-pgn-viewer"
import Ctrl from "@ranklab-gaming/lichess-pgn-viewer/ctrl"

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

let ctrl: Ctrl | null = null

window.addEventListener("message", function (event) {
  if (event.data.type === "loadPgn") {
    const boardElement = document.getElementById("board")
    if (!boardElement) return

    ctrl = LichessPgnViewer(boardElement, {
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

  if (event.data.type === "move") {
    ctrl?.toPath(new Path(event.data.move.path.path))
  }
})
