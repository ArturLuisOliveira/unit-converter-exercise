import { Graph, breadthFirstSearch, pathTo } from "./Graph";

describe("Graph", () => {
  describe("given a graph", () => {
    const graph = new Graph();

    beforeEach(() => {
      graph.addVertex({ value: "km" });
      graph.addVertex({ value: "m" });
      graph.addVertex({ value: "cm" });
      graph.addVertex({ value: "mm" });
      graph.addVertex({ value: "mile" });

      graph.addEdge({
        from: "km",
        to: "m",
        data: { value: 1000, operand: "*" },
      });
      graph.addEdge({
        from: "m",
        to: "km",
        data: { value: 100, operand: "/" },
      });
      graph.addEdge({
        from: "m",
        to: "cm",
        data: { value: 100, operand: "*" },
      });
      graph.addEdge({
        from: "cm",
        to: "m",
        data: { value: 100, operand: "/" },
      });
      graph.addEdge({
        from: "cm",
        to: "mm",
        data: { value: 10, operand: "*" },
      });
      graph.addEdge({
        from: "mm",
        to: "cm",
        data: { value: 10, operand: "/" },
      });
      graph.addEdge({
        from: "mile",
        to: "km",
        data: { value: 1.609344, operand: "*" },
      });
      graph.addEdge({
        from: "km",
        to: "mile",
        data: { value: 1.609344, operand: "/" },
      });
    });

    test("should return the correct graph distances", () => {
      const { distances } = breadthFirstSearch({
        graph,
        startVertexValue: "km",
        callback: (vertex) => {},
      });

      expect(distances.get("km")).toBe(0);
      expect(distances.get("m")).toBe(1);
      expect(distances.get("cm")).toBe(2);
      expect(distances.get("mm")).toBe(3);
    });

    test("should return the correct graph predecessors", () => {
      const { predecessors } = breadthFirstSearch({
        graph,
        startVertexValue: "km",
        callback: (vertex) => {},
      });

      expect(predecessors.get("km")).toBe(null);
      expect(predecessors.get("m")).toBe("km");
      expect(predecessors.get("cm")).toBe("m");
      expect(predecessors.get("mm")).toBe("cm");
    });

    test.only("should return the path to the vertex", () => {
      const path = pathTo({ from: "km", to: "mm", graph });
      expect(path).toEqual(["km", "m", "cm", "mm"]);
    });

    afterEach(() => {
      graph.clear();
    });
  });
});
