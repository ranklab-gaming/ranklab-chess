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
      lichess: false,
      drawArrows: event.data.drawArrows ?? false,
      initialPly: 1,
      showPlayers: false,
      orientation: event.data.playerColor ?? "white",
      events: {
        onMove: (move) => {
          window.parent.postMessage({ type: "move", move: filterFunctions(move) }, "*")
        },
        onSideResize: ({ width, height }) => {
          window.parent.postMessage({ type: "sideResize", dimensions: { width, height } }, "*")
        },
      },
      chessground: {
        drawable: {
          enabled: event.data.drawArrows ?? false,
          visible: true,
          onChange: (shapes) => {
            window.parent.postMessage({ type: "shapesChange", shapes }, "*")
          },
        },
      },
    })
  }

  if (event.data.type === "move") {
    ctrl?.toPath(new Path(event.data.move.path.path))
  }

  if (event.data.type === "setShapes") {
    ctrl?.ground?.setShapes(event.data.shapes)
  }
})
