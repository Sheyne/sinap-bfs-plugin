export class Node {
    children: Edge[];
}

export class Edge {
    destination: Node;
}

export class Graph {
    nodes: Nodes[];
}

// tell sinap what all the node/edge types are
export type Nodes = Node;
export type Edges = Edge;

export class State {
    private active: Node[];

    constructor(
        public queue: Node[],
        public visited: Node[]
        ) {
        this.active = visited;
    }
}

export function start(input: Graph, startNode: Node): State | Node[] {
    return new State([startNode], []);
}

export function step(current: State): State | Node[] {
    if (current.queue.length === 0) {
        return current.visited;
    }

    const [next, ...rest] = current.queue;
    const children = next.children.map(c => c.destination);

    const unvisitedChildren = new Set([...rest, ...children.filter(c => current.visited.indexOf(c) === -1)]);

    return new State([...unvisitedChildren], [...current.visited, next]);
}