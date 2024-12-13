import { ChessPieceComponent } from "src/app/chess-game/chess-piece/chess-piece.component";
import { piecesType } from "src/types/types";
function convertPiecesToCoords(pieces: piecesType, x: number | undefined = undefined, y: number | undefined = undefined) {
    let coords: { x: number, y: number, color: "b" | "w" }[] = []
    for (let c = 0; c < 2; c++) {
        for (let [key, val] of pieces[c]!) {
            for (let piece of val) {
                if (!(x && x == piece.instance.x && y && y == piece.instance.y))
                    coords.push({ x: piece.instance.x, y: piece.instance.y, color: piece.instance.color! })
            }
        }
    }
    return coords
}
export function canPawnMove(pieces: piecesType, x: number, y: number, turn: "w" | "b") {
    let greenBlocks: { x: number, y: number }[] = [];
    let k = turn == "b" ? 1 : -1
    let step = 1
    if (turn == "b") { if (x == 1) step = 2 } else { if (x == 6) step = 2 }
    let pawnCanKillPos: { x: number, y: number }[] = []
    let coords = convertPiecesToCoords(pieces, x, y)
    for (let i = 1; i <= step; i++) {
        if (y - 1 >= 0) pawnCanKillPos.push({ x: x + i * k, y: y - 1 })
        if (y + 1 < 8) pawnCanKillPos.push({ x: x + i * k, y: y + 1 })
        let addToGreenBlocks = true
        for (let coord of coords) {
            if (coord.x == x + k * i && coord.y == y) {
                addToGreenBlocks = false
            }
        }
        if (addToGreenBlocks) greenBlocks.push({ x: x + k * i, y: y })
    }
    let canKill: { x: number, y: number }[] = []
    for (let killPos of pawnCanKillPos) {
        for (let coord of coords) {
            if (coord.x == killPos?.x && coord.y == killPos.y && coord.color != turn) {
                canKill.push({ x: coord.x, y: coord.y })
            }
        }
    }
    return { greenBlocks, canKill }
}
export function canRookMove(pieces: piecesType, x: number, y: number, turn: "w" | "b") {
    console.log("🚀 ~ canRookMove ~ pieces:", pieces)
    let greenBlocks: { x: number, y: number }[] = [];
    let k = turn == "b" ? 1 : -1

    let steps: { x: number, y: number }[] = [{ x: 0, y: 1 }, { x: 0, y: -1 }, { x: 1, y: 0 }, { x: -1, y: 0 }]
    let canKill: { x: number, y: number }[] = []
    let coords = convertPiecesToCoords(pieces, x, y)

    for (let i = 0; i < steps.length; i++) {
        let doneSearching = false
        while (!doneSearching) {
            let addToGreenBlocks = true
            for (let coord of coords) {
                if (coord.x == x + steps[i].x && coord.y == y + steps[i].y) {
                    if (coord.color != turn) {
                        canKill.push({ x: x + steps[i].x, y: y + steps[i].y })
                    }
                    doneSearching = true
                    addToGreenBlocks = false
                    break
                }
            }
            
            if (addToGreenBlocks) greenBlocks.push({ x: x + steps[i].x, y: y + steps[i].y })
            if (x+steps[i].x > 7 || y+steps[i].y > 7 || x+steps[i].x < 0 || y+steps[i].y < 0) doneSearching = true
            switch (i) {
                case 0:
                    steps[i].y += 1
                    break
                case 1:
                    steps[i].y -= 1
                    break
                case 2:
                    steps[i].x += 1
                    break
                case 3:
                    steps[i].x -= 1
                    break
            }
        }
    }
    return { greenBlocks, canKill }
}