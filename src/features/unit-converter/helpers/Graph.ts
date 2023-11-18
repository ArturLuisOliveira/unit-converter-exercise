export class Graph<VertexValue, EdgeData> {
  equalityFunction = (a: VertexValue, b: VertexValue) => a == b;
  vertices: Set<Vertex<VertexValue>> = new Set();
  adjacencyList: Map<VertexValue, Map<VertexValue, EdgeData>> = new Map();

  constructor(equalityFunction?: (a: VertexValue, b: VertexValue) => boolean) {
    if (equalityFunction != null) this.equalityFunction = equalityFunction;
  }

  addVertex(vertex: Vertex<VertexValue>) {
    this.vertices.add(vertex);
    this.adjacencyList.set(vertex.value, new Map());
  }

  addEdge({
    from,
    to,
    data,
  }: {
    from: VertexValue;
    to: VertexValue;
    data: EdgeData;
  }) {
    const neighbors = this.adjacencyList.get(from);
    neighbors!.set(to, data);
  }

  clear() {
    this.vertices = new Set();
    this.adjacencyList = new Map();
    this.equalityFunction = (a: VertexValue, b: VertexValue) => a == b;
  }
}

export class Vertex<T> {
  value: T;

  constructor(value: T) {
    this.value = value;
  }
}

type Color = "white" | "grey" | "black";

export const breadthFirstSearch = <VertexValue, EdgeData>({
  graph,
  callback,
  startVertexValue,
}: {
  graph: Graph<VertexValue, EdgeData>;
  startVertexValue: VertexValue;
  callback?: (vertex: VertexValue) => void;
}) => {
  const vertices = graph.vertices;
  const adjList = graph.adjacencyList;
  const distances = new Map<VertexValue, number>();
  const predecessors = new Map<VertexValue, VertexValue | null>();
  const colors = new Map<VertexValue, Color>();
  for (const vertex of vertices) {
    colors.set(vertex.value, "white");
    distances.set(vertex.value, 0);
    predecessors.set(vertex.value, null);
  }
  const queue: VertexValue[] = [startVertexValue];
  while (queue.length) {
    const current = queue.pop();
    const neighbors = adjList.get(current as VertexValue);
    colors.set(current!, "grey");

    for (const [neighbor] of neighbors!) {
      if (colors.get(neighbor) === "white") {
        queue.unshift(neighbor);
        distances.set(neighbor, distances.get(current!)! + 1);
        predecessors.set(neighbor, current!);
        colors.set(neighbor, "grey");
      }
    }
    colors.set(current!, "black");
    if (callback != null) callback(current!);
  }

  return {
    distances,
    predecessors,
  };
};

export const pathTo = <VertexValue, EdgeData>({
  from,
  to,
  graph,
}: {
  from: VertexValue;
  to: VertexValue;
  graph: Graph<VertexValue, EdgeData>;
}) => {
  const { predecessors } = breadthFirstSearch({
    graph,
    startVertexValue: from,
  });
  const path: VertexValue[] = [];
  let current: VertexValue | undefined | null = to;
  while (current != null) {
    current = predecessors.get(current);
    if (current != null) path.unshift(current);
  }
  if (path.length < 1) return undefined;

  path.push(to);

  return path;
};
