import { getPath, isValid, offsets, sleep, updateGrid } from '../utils'

export const dfs = async (start, end, grid, setGrid, obstacle) => {
  const directions = ["up", "right", "down", "left"]
  let current, neighbours = [], predecessors, delay = 10;

  neighbours = [start] // <-- this is the stack
  predecessors = { [start]: null } // <-- this will keep track of the path
  
  while (neighbours.length !== 0) { // as long as the neighbours array is not depleted
    current = neighbours.pop() // get the latest coordinate

    await sleep(delay)

    updateGrid(grid, setGrid, current, 'popped')

    if (current[0] === end[0] && current[1] === end[1]) { // if current coordinate is equal to end coordinate
      let path = getPath(predecessors, start, end)

      for (let i = 0; i < path.length; i++) {
        await sleep(delay / 2)

        let current = path[i]
        updateGrid(grid, setGrid, current, 'path')
      }
      return
    }

    let row_offset, col_offset, neighbour
    for (let i = 0; i < 4; i++) { // loop through up, right, down, left
      [row_offset, col_offset] = offsets[directions[i]]
      neighbour = [current[0] + row_offset, current[1] + col_offset] // get the coordinate of the neighbour

      await sleep(delay / 5) // 1/5th of popped sleep

      if (isValid(neighbour, obstacle) && !(neighbour in predecessors)) { // if neighbour is valid and NOT found in predecessors
        neighbours.push(neighbour) // add the neighbour to our stack
        predecessors[neighbour] = current // add the neighbour in predecessors
        updateGrid(grid, setGrid, neighbour, 'discovered')
      }
    }
  }
  return
}