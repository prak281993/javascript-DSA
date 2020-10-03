class Graph {
  constructor() {
    this.adjacencyList = new Map();
    this.traversal = '';
    this.visited = new Set();
  }
  addVertex(vertex) {
    this.adjacencyList.set(vertex, []);
  }
  addEdge(origin, destination) {
    this.adjacencyList.get(origin).push(destination);
    this.adjacencyList.get(destination).push(origin);
  }
  breadthFirstSearch(start) {
    const queue = [];
    const visited = new Set();
    let traversed = start + ' ';
    visited.add(start);
    queue.push(start);
    while (queue.length > 0) {
      const origin = queue.shift();
      const edges = this.adjacencyList.get(origin);
      for (let edge of edges) {
        if (!visited.has(edge)) {
          visited.add(edge);
          queue.push(edge);
          traversed += edge + " ";
        }
      }
    }
    return traversed;
  }

  depthFirstSearch(start, visited = new Set()) {
    this.traversal += `${start} `;
    visited.add(start);
    const edges = this.adjacencyList.get(start);
    for (let edge of edges) {
      if (!visited.has(edge)) {
        this.depthFirstSearch(edge, visited)
      }
    }
    return;
  }
  connectedComponents() {
    let count = 0;
    const dfsForConnected = (vertex) => {
      const edges = this.adjacencyList.get(vertex);
      for (let edge of edges) {
        if (!this.visited.has(edge)) {
          this.visited.add(edge);
          dfsForConnected(edge);
        }
      }
    }
    const vertices = this.adjacencyList.keys();
    for (let vertex of vertices) {
      if (!this.visited.has(vertex)) {
        this.visited.add(vertex);
        dfsForConnected(vertex);
        count++;
      }
    }
    return count;
  }

  detectCycle() {
    const vertices = this.adjacencyList.keys();
    for (let vertex of vertices) {
      this.visited = new Set();
      this.visited.add(vertex);
      if (this.isCycle(vertex))
        return true;
    }
    return false;
  }
  isCycle(vertex, parent = -1) {
    const edges = this.adjacencyList.get(vertex);
    for (let edge of edges) {
      if (this.visited.has(edge)) {
        if (edge !== parent)
          return true;
        else continue;
      }
      else {
        this.visited.add(edge);
        if (this.isCycle(edge, vertex))
          return true;
      }
    }
    return false;
  }

  isConnected() {
    this.visited = new Set();
    this.visited.add(0);
    const dfsForConnected = (vertex) => {
      const edges = this.adjacencyList.get(vertex);
      for (let edge of edges) {
        if (!this.visited.has(edge)) {
          this.visited.add(edge);
          dfsForConnected(edge);
        }
      }
    }
    dfsForConnected(0);
    const allVertices = [...this.adjacencyList.keys()];
    const allVisited = [...this.visited];
    allVertices.sort();
    allVisited.sort();
    return allVertices.join('') === allVisited.join('');
  }

  generate2DMatrix(arr, m) {
    const matrix = arr.reduce((acc, item, index) => {
      if (index === 0) {
        acc.push([item]);
      }
      else {
        let last = acc.pop();
        if (last.length === m) {
          acc.push(last);
          acc.push([item]);
        }
        else {
          last.push(item);
          acc.push(last);
        }
      }
      return acc;
    }, []);
    return matrix;
  }

  createGraph(m, n) {
    Array.from(Array(m * n), (x, i) => i + 1).forEach(v => this.addVertex(v));
    let k = 1;
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        if (i === m) {
          if (j !== n) {
            this.addEdge(k, k + 1);
          }
        }
        else if (j === n) {
          this.addEdge(k, k + n);
        }
        else {
          this.addEdge(k, k + 1);
          this.addEdge(k, k + n);
        }
        k++;
      }
    }
  }

  findNearest(arr, m, n) {
    const matrix = this.generate2DMatrix(arr, m);
    this.createGraph(m, n);
    const dist = Array.from(Array((m * n) + 1), (x, i) => Number.MAX_VALUE);
    let k = 1;
    const queue = [];
    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        if (matrix[i][j] === 1) {
          dist[k] = 0;
          this.visited.add(k);
          queue.push(k);
        }
        k++;
      }
    }
    while (queue.length > 0) {
      let vertex = queue.shift();
      const edges = this.adjacencyList.get(vertex);
      for (let edge of edges) {
        if (!this.visited.has(edge)) {
          dist[edge] = Math.min(dist[edge], parseInt(dist[vertex]) + 1);
          queue.push(edge);
          this.visited.add(edge);
        }
      }
    }
    dist.shift();
    return dist;
  }

  findSafePaths(arr, survivalLimit) {
    let safePathCount = 0;
    const dfsForSafePath = (vertex, arr, landMine = 0) => {
      let edges = this.adjacencyList.get(vertex);
      const visitedArray = [...this.visited];
      if (edges.every(e => visitedArray.includes(e))) {
        if (landMine <= survivalLimit) {
          safePathCount++;
          return;
        }
        if(landMine > survivalLimit)
        return;
      }

      for (let edge of edges) {
        if (!this.visited.has(edge)) {
          this.visited.add(edge);
          if (arr[edge] == 1)
            dfsForSafePath(edge, arr, +landMine + 1);
          else{
            if(landMine > survivalLimit)
            dfsForSafePath(edge, arr, +landMine);
            else
            dfsForSafePath(edge, arr, 0);
            }
        }
      }
    }

    let vertices = this.adjacencyList.keys();
    for (let vertex of vertices) {
      if (!this.visited.has(vertex)) {
        this.visited.add(vertex)
        dfsForSafePath(vertex, arr, arr[vertex]);
      }
    }
    console.log(safePathCount);
  }

  findMaximumEdges() {
    let count = 0, max = 0, maximumEdge = 0;
    const vertices = this.adjacencyList.keys();
    const dfsToFindMaximumEdges = (vertex) => {
      const edges = this.adjacencyList.get(vertex);
      for (let edge of edges) {
        count++;
        if (!this.visited.has(edge)) {
          this.visited.add(edge);
          dfsToFindMaximumEdges(edge);
        }
      }
    }
    for (let vertex of vertices) {
      if (!this.visited.has(vertex)) {
        this.visited.add(vertex);
        if (maximumEdge <= count / 2) {
          maximumEdge = count / 2;
        }
        count = 0;
        dfsToFindMaximumEdges(vertex);
      }
    }
    return maximumEdge;
  }

  findKnightsPosition(x, y, N) {
    const dx = [-2, -1, 1, 2, -2, -1, 1, 1];
    const dy = [-1, -2, -2, -1, 1, 2, 2, 1];
    const isInside = (x1, y1, N) => {
      if (x1 >= 1 && x1 <= N && y1 >= 1 && y1 <= N) {
        return true;
      }
      return false;
    }
    const queue = [];
    queue.push({
      x, y,
      dis: 0
    });

    const visited = Array.from(Array(N), (x, i) => Array.from({ length: N }, (x, i) => false));
    while (queue.length > 0) {
      const last = queue.shift();
      if (last.x === 1 && last.y === 1)
        return last.dis;
      for (let i = 0; i < 8; i++) {
        let nextPosX = last.x + dx[i];
        let nextPosY = last.y + dy[i];
        if (isInside(nextPosX, nextPosY, N) && !visited[nextPosX][nextPosY]) {
          visited[nextPosX][nextPosY] = true;
          queue.push({
            x: nextPosX,
            y: nextPosY,
            dis: last.dis + 1
          })
        }
      }
    }
    return Number.MAX_SAFE_INTEGER
  }

  // clan war problem
  checkBiPartiteGraph() {
    const queue = [];
    const vertices = [...this.adjacencyList.keys()];
    const firstVertex = vertices[0];
    const color = Array.from(Array(vertices.length), (x, i) => -1);
    queue.push(firstVertex);
    color[firstVertex] = 1;
    while (queue.length > 0) {
      let first = queue.shift();
      let edges = this.adjacencyList.get(first);
      for (let edge of edges) {
        if (color[edge] === -1) {
          color[edge] = 1 - color[first];
          queue.push(edge);
        }
        else if (color[edge] === color[first])
          return false;
      }
    }
    return true;
  }

}

const vertices = 'A B C D E F G H'.split(' ');
const edges = [
  ['A', 'B'],
  ['B', 'C'],
  ['B', 'E'],
  ['C', 'D'],
  ['D', 'F'],
  ['E', 'G'],
  ['E', 'H'],
  ['G', 'H']
];

const edges1 = [
  ['A', 'C'],
  ['A', 'B'],
  ['A', 'D'],
  ['D', 'E'],
  ['E', 'F'],
  ['B', 'G']
]

const vertices2 = '50 10 200 20 15 30 5 300'.split(' ');
const edges2 = [
  ['200', '50'],
  ['200', '20'],
  ['50', '10'],
  ['10', '15'],
  ['15', '30'],
  ['15', '5'],
  ['30', '5'],
  ['30', '300'],
  ['5', '300']
];
const graph = new Graph();
vertices.forEach(vertex => graph.addVertex(vertex));
edges.forEach(edge => graph.addEdge(...edge));

console.log('Breadth first search:', graph.breadthFirstSearch('A'));
graph.depthFirstSearch('A')
console.log('Depth first search:', graph.traversal);

const graph2 = new Graph();
vertices2.forEach(vertex => graph2.addVertex(vertex));
edges2.forEach(edge => graph2.addEdge(...edge));

console.log('Breadth first search:', graph2.breadthFirstSearch('50'));
graph2.depthFirstSearch('50')
console.log('Depth first search:', graph2.traversal);

const vertices3 = '0 1 2 3'.split(' ');
const edges3 = [
  ['0', '2'],
  ['1', '2']
]

const graph3 = new Graph();
vertices3.forEach(vertex => graph3.addVertex(vertex));
edges3.forEach(edge => graph3.addEdge(...edge));
console.log(graph3.connectedComponents());


const vertices4 = Array.from(Array(10), (x, index) => index);
const edgesCyclic = [
  [5, 0],
  [4, 0],
  [3, 6],
  [8, 7],
  [8, 1],
  [9, 3],
  [7, 9],
  [2, 0],
  [8, 4],
  [8, 2],
  [1, 4]
];

const edgesNotCyclic = [
  [0, 2],
  [0, 5],
  [1, 2],
  [2, 4],
  [2, 8],
  [3, 5],
  [3, 7],
  [4, 9],
  [6, 7]
]

// detect cycle in graph
const graph4 = new Graph();
vertices4.forEach(vertex => graph4.addVertex(vertex));
edgesCyclic.forEach(edge => graph4.addEdge(...edge));
console.log(graph4.detectCycle());


// find nearest 1 for each 0
const matrix = '1 0 1 0 0 0 0 0 0 0 0 0 1 1 1 0'.split(' ').map(x => parseInt(x));
const graph5 = new Graph();
console.log(graph5.findNearest(matrix, 4, 4));


// find safe paths
const graph6 = new Graph();
const vertices6 = Array.from(Array(12), (x, i) => i);
const edges6 = [
  [7, 8],
  [9, 8],
  [7, 1],
  [9, 6],
  [0, 2],
  [2, 8],
  [4, 9],
  [7, 11],
  [7, 3],
  [5, 2],
  [10, 9]
];
vertices6.forEach(vertex => graph6.addVertex(vertex));
edges6.forEach(edge => graph6.addEdge(...edge));

const edges6i = [
  [5, 6],
  [5, 3],
  [11, 10],
  [1, 0],
  [2, 9],
  [2, 6],
  [8, 11],
  [7, 3],
  [1, 3],
  [2, 4],
  [6, 11]
]

const landMineLocations = '0 0 1 0 0 1 0 1 1 0 0 0'.split(' ');
graph6.findSafePaths(landMineLocations, 2);

const landMineLocations1 = '1 1 1 1 0 0 1 0 0 0 1 0'.split(' ');
const graph6i = new Graph();

vertices6.forEach(vertex => graph6i.addVertex(vertex));
edges6i.forEach(edge => graph6i.addEdge(...edge));
graph6i.findSafePaths(landMineLocations1, 3);

// find maximum edges
const graph7 = new Graph();
const vertices7 = Array.from(Array(5), (x, i) => i);
const edges7 = [
  [0, 1],
  [1, 2],
  [2, 4]
];

vertices7.forEach(vertex => graph7.addVertex(vertex));
edges7.forEach(edge => graph7.addEdge(...edge));

console.log("Maximum edges: ", graph7.findMaximumEdges());

const x = 4;
const y = 9;
const boardSize = 100;
const graph8 = new Graph();
console.log("Minimum moves for knight to reach (1,1): ", graph8.findKnightsPosition(x, y, boardSize));


const graph9 = new Graph();
const vertices8 = Array.from(Array(9), (x, i) => i);
const edges8 = [
  [0, 2],
  [0, 5],
  [1, 7],
  [2, 4],
  [4, 7],
  [3, 5],
  [7, 8],
  [4, 8]
];

vertices8.forEach(vertex => graph9.addVertex(vertex));
edges8.forEach(edge => graph9.addEdge(...edge));

console.log(graph9.isConnected());


const graph10 = new Graph();
const vertices9 = Array.from(Array(4), (x, i) => i);
const edges9 = [
  [0, 2],
  [1, 3],
  [2, 3]
];

vertices9.forEach(vertex => graph10.addVertex(vertex));
edges9.forEach(edge => graph10.addEdge(...edge));

console.log("The graph is bipartite:", graph10.checkBiPartiteGraph());

