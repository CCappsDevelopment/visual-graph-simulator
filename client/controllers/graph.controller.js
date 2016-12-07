(function() {
    "use strict";
    
    angular
        .module("smitty.graph", [])
        .controller("GraphController", GraphController);
    
    GraphController.$inject = ["canvasService"];
    
    function GraphController(canvasService) {
        var vm = this; // View Model
        
        var nextVertexId = 0;
        var vertexColor = "#CC8193";
        
        // Set of vertices in graph - V(G)
        vm.vertices = [
            {
                id: 0, // id of vertex
                xPos: 0, // x-position
                yPos: 0, // y-position
                weight: 0, // vertex weight (if applicable)
                size: 20 // size of vertex (radius)
            }
        ];
        
        // Set of edges in graph - E(G)
        vm.edges = [
            {
                // TODO
            }
        ];
        
        // Function: addVertex()
        // adds vertex to V(G)
        vm.addVertex = function(event) {
            vm.offsetX = event.offsetX;
            vm.offsetY = event.offsetY;
            vm.id = nextVertexId;
            
            vm.vertices.push({
                id: vm.id,
                xPos: vm.offsetX,
                yPos: vm.offsetY,
                weight: 0,
                size: 10
            });
            nextVertexId++;
            
            vm.update();
        }
        
        // Function: addEdge(v, u, weight)
        // draws a connecting line from vertex v to vertex u
        // line will be edge (v, u) with weight W
        // adds edge to E(G)
        vm.addEdge = function() {
            // TODO
        }
        
        // Function: drawEdge(v1, v2)
        // draws connecting line (edge) between two vertices in V(G)
        vm.drawEdge = function(v1, v2){
            // TODO
        }
        
        // Function: update()
        // Updates contents of canvas
        vm.update = function() { 
            for(var i = 0; i < vm.vertices.length; i++) {
                var v = vm.vertices[i];
                canvasService.drawVertex(v.xPos, v.yPos, v.size, vertexColor);
                
                if(i > 0) {
                    //drawEdge(v1, v2);
                }
            }
        }
        
        vm.update();
    }
})();

// TODO: Add ability to create custom vertices (weight, size, etc.)
// TODO: Add method to create edges between selected vertices
