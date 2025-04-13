const directions = [
  [-1, 0], // Up
  [1, 0],  // Down
  [0, -1], // Left
  [0, 1],  // Right
];

function walk(maze: string[], wall: string, current: Point, ending: Point, seen: boolean[][], path: Point[]): boolean {
  // Check if the current position is out of bounds or a wall
  if (
    current.x < 0 ||
    current.x >= maze[0].length ||
    current.y < 0 ||
    current.y >= maze.length ||
    maze[current.y][current.x] === wall
  ) {
    return false;
  }

  // Check if the current position is the ending point
  if (current.x === ending.x && current.y === ending.y) {
    path.push(ending);
    return true;
  }

  // Check if the current position has already been visited
  if (seen[current.y][current.x]) {
    return false;
  }


  // pre
  seen[current.y][current.x] = true;
  path.push(current);


  // recursion
  for (let i = 0; i < directions.length; i++) {
    const [dy, dx] = directions[i];
    if (walk(maze, wall, { x: current.x + dx, y: current.y + dy }, ending, seen, path)) {
      return true;
    }
  }

  // post
  path.pop();

  return false;
}

export default function solve(maze: string[], wall: string, start: Point, end: Point): Point[] {
  const seen: boolean[][] = [];
  const path: Point[] = [];

  for (let i = 0; i < maze.length; i++) {
    seen.push(new Array(maze[0].length).fill(false));
  }

  walk(maze, wall, start, end, seen, path);

  return path;
}