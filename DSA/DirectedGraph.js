class Graph {
    constructor() {
      this.adjacencyList = new Map();
      this.traversal = '';
      this.visited = new Set();
      this.stack = [];
    }
    addVertex(vertex) {
      this.adjacencyList.set(vertex, []);
    }
    addEdge(origin, destination) {
      this.adjacencyList.get(origin).push(destination);
    }
    printHomeWork() {
      const topologicalSort = (vertex) => {
        this.visited.add(vertex);
        let edges = this.adjacencyList.get(vertex);
        for (let edge of edges) {
          if (!this.visited.has(edge)) {
            topologicalSort(edge);
          }
        }
        this.stack.push(vertex);
      }
      const vertices = this.adjacencyList.keys();
      for (let vertex of vertices) {
        if (!this.visited.has(vertex)) {
          topologicalSort(vertex);
        }
      }
      while (this.stack.length > 0) {
        console.log(this.stack.pop());
      }
    }
  }
  
  const graph = new Graph();
  const vertices = Array.from(Array(4), (x, i) => i);
  const edges = [
    [0, 1],
    [0, 2],
    [0, 3],
    [1, 2],
    [1, 3],
    [2, 3],
  ];
  
  vertices.forEach(vertex => graph.addVertex(vertex));
  edges.forEach(edge => graph.addEdge(...edge));
  //graph.printHomeWork();
  
  const vertices2 = Array.from(Array(9), (x, i) => i);
  const edges2 = [
    [0, 2],
    [8, 1],
    [3, 4],
    [2, 8],
    [3, 5],
    [0, 5],
    [2, 7],
    [1, 3],
    [4, 6],
    [1, 4],
  ];
  
  const graph2 = new Graph();
  vertices2.forEach(vertex => graph2.addVertex(vertex));
  edges2.forEach(edge => graph2.addEdge(...edge));
  graph2.printHomeWork();