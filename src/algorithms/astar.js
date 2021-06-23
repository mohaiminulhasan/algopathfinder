import { getPath, isValid, offsets, sleep, updateGrid, PriorityQueue } from '../utils'

const heuristic = (a, b) => {
  const [x1, y1] = a;
  const [x2, y2] = b;
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

export const astar = async (start, end, grid, setGrid, obstacle) => {
  const directions = ["up", "right", "down", "left"]
  let current, predecessors, delay = 10, g_values;

  let neighbours = new PriorityQueue(); // <-- this is the queue
  neighbours.enqueue([start, 0])
  predecessors = { [start]: null } // <-- this will keep track of the path
  g_values = { [start]: 0 }

  while (!neighbours.isEmpty()) { // as long as the neighbours array is not depleted
    current = neighbours.dequeue() // get one coordinate

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

    let row_offset, col_offset, neighbour, new_cost, f_value
    for (let i = 0; i < 4; i++) { // loop through up, right, down, left
      [row_offset, col_offset] = offsets[directions[i]]
      neighbour = [current[0] + row_offset, current[1] + col_offset] // get the coordinate of the neighbour

      await sleep(delay / 5) // 1/5th of popped sleep

      if (isValid(neighbour, obstacle) && !(neighbour in g_values)) { // if neighbour is valid and NOT found in predecessors
        new_cost = g_values[current] + 1
        g_values[neighbour] = new_cost
        f_value = new_cost + heuristic(end, neighbour)
        neighbours.enqueue([neighbour, f_value]) // add the neighbour to our queue
        predecessors[neighbour] = current // add the neighbour in predecessors
        updateGrid(grid, setGrid, neighbour, 'discovered')
      }
    }
  }
  return
}