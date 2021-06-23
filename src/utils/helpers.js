import { num_rows, num_cols } from '../utils'

export const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const arrayEquals = (x, y) => {
  let output = true
  for (let i = 0; i < x.length; i++) {
    if (x[i] !== y[i]) {
      output = false
      break;
    }
  }
  return output
}

export const initialGrid = (start, end, obstacle) => {
  let grid = [], row

  for (let i = 0; i < num_rows; i++) {
    row = []
    for (let j = 0; j < num_cols; j++) {
      row.push({
        id: `node-${i}-${j}`,
        status: (start[0] === i && start[1] === j) ? 'start' : (end[0] === i && end[1] === j) ? 'destination' : (obstacle.findIndex(el => arrayEquals([i,j], el)) !== -1) ? 'obstacle' : 'undiscovered'
      })
    }
    grid.push(row)
  }

  return grid
}

export const isValid = (coordinate, obstacle) => {
  let i, j
  [i, j] = coordinate
  return i >= 0 && i < num_rows && j >= 0 && j < num_cols && obstacle.findIndex(el => arrayEquals([i,j], el)) === -1
}

export const getPath = (predecessors, start, end) => {
  let current, path = []
  current = end
  while (current !== start) {
    path.push(current)
    current = predecessors[current]
  }
  path.push(current)
  path.reverse()
  return path
}

export const updateGrid = (grid, setGrid, current, className) => {
  let node = grid[current[0]][current[1]]
  node['status'] = className
  grid[current[0]][current[1]] = node
  setGrid(prevGrid => prevGrid.slice())
}