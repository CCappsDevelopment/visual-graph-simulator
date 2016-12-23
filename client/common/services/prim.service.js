(function() {
    "use strict";
    
    angular
        .module("ccd.service.prim", [])
        .service("primService", primService);
    
    function primService() {
       
        var tree = []; // holds id of nodes in MWST
        var usedNodes = {}; // usedNodes[node] is true/false depending on if node is in MWST
        var MWST = { // MWST passed back to GraphController
            vertices: [],
            edges: []
        };
        
        // Function primsMWST(graph)
        // Runs Prim's Minimum Weight
        // Spanning Tree finding algorithm
        // on passed in Graph object
        // returns MWST object to GraphController
        this.primMWST = function(graph) {
            
            tree = [];
            usedNodes = {};
            MWST = {
                vertices: [],
                edges: []
            };
            
            // V(T) = {startNode}
            // E(T) = {}
            var startNode = graph.vertices[0];
            tree.push(startNode.id);
            MWST.vertices.push(startNode);
            usedNodes[startNode.id] = startNode.id;
            
            // while(|V(T)| < |V(G)|){
            //     (t,v) = MinWeightEdge(V(T), G=(V,E));
            //     
            //     V(T) = V(T) U {v};
            //     E(T) = E(T) U {(t,v)}
            // }
            var min = this.minWeightEdge(graph);
            var minNodeId = min.nodeId;
            var minNode = min.node;
            var minEdge = min.edge;
            while(minNodeId != null) {
                tree.push(minNodeId);
                MWST.vertices.push(graph.vertices[minNodeId]);
                MWST.edges.push(minEdge);
                usedNodes[minNodeId] = minNodeId;
                min = this.minWeightEdge(graph);
                minNodeId = min.nodeId;
                minNode = min.node;
                minEdge = min.edge;
            }  
            
            // Return T = (V, E), Minumum Weight Spanning Tree
            return MWST;
        };
        
        // Function minWeightEdge(graph)
        // find the edge with the least weight
        // from all adjeacent edges from nodes in V(T)
        // to nodes not in V(T), then returns the
        // min node, edge, and nodeId
        this.minWeightEdge = function(graph) {
            var min = [999999, null];
            var minEdge, minNode = null;
            
            for(var i = 0; i < tree.length; i++){ 
                for(var j = 0; j < graph.edges[tree[i]].length; j++) {

                    if(graph.edges[tree[i]][j].weight < min[0] && usedNodes[graph.edges[tree[i]][j].v2.id] === undefined) {
                        min = [graph.edges[tree[i]][j].weight, graph.edges[tree[i]][j].v2.id];
                        minEdge = graph.edges[tree[i]][j];
                        minNode = graph.edges[tree[i]][j].v2;
                    }
                }
            }
            
            return {
                nodeId: min[1],
                node: minNode,
                edge: minEdge
            };
        };
        
    }
    
})();

// The specific code used was inspired from
// an implementation of Prim's algorithm found here:
// https://gist.github.com/methodin/1577481
