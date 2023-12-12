// Dummy data for bus stops and routes
const busStops = {
    "A": { "B": 5, "C": 10 },
    "B": { "C": 3, "D": 7 },
    "C": { "D": 2, "E": 8 },
    "D": { "E": 4 },
    "E": {}
};

// Dijkstra's algorithm implementation
function dijkstra(graph, source, destination) {
    const distances = {};
    const previous = {};
    const visited = {};

    // Initialize distances and previous nodes
    for (const node in graph) {
        distances[node] = Infinity;
        previous[node] = null;
        visited[node] = false;
    }

    distances[source] = 0;

    // Iterate until all nodes are visited
    while (Object.keys(visited).length !== Object.keys(graph).length) {
        // Find the unvisited node with the smallest distance
        let current = null;
        let minDistance = Infinity;
        for (const node in distances) {
            if (!visited[node] && distances[node] < minDistance) {
                minDistance = distances[node];
                current = node;
            }
        }

        // Stop if no unvisited nodes remain
        if (!current) {
            break;
        }

        visited[current] = true;

        // Update distances of unvisited neighbors
        for (const neighbor in graph[current]) {
            if (!visited[neighbor]) {
                const newDistance = distances[current] + graph[current][neighbor];
                if (newDistance < distances[neighbor]) {
                    distances[neighbor] = newDistance;
                    previous[neighbor] = current;
                }
            }
        }
    }

    // Reconstruct the shortest path
    const path = [];
    let node = destination;
    while (node !== null) {
        path.unshift(node);
        node = previous[node];
    }

    return {
        path,
        distance: distances[destination]
    };
}

// Handle form
