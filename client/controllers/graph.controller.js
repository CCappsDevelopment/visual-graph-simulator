(function() {
    "use strict";
    
    angular
        .module("ccd.graph", [])
        .controller("GraphController", GraphController);
    
    GraphController.$inject = ["canvasService"];
    
    function GraphController(canvasService) {
        var vm = this; // View Model
        
        var nextVertexId = 0;
        var vertexColor = "#CC8193";
        vm.canDraw = false;
        
        // Set of vertices in graph - V(G)
        vm.vertices = [
            {
                //id: 0, // id of vertex
                //xPos: 0, // x-position
                //yPos: 0, // y-position
                //weight: 0, // vertex weight (if applicable)
                //size: 0, // size of vertex (radius)
                //text: '' // vertex name/weight
            },
        ];
        
        // Set of edges in graph - E(G)
        vm.edges = [
            {
                //v1: 0,
                //v2: 0
            },
            {
                v1: 1,
                v2: 2
            },
            {
                v1: 3,
                v2: 1
            }
        ];
        
        // Function: nextChar(currentVertex)
        // Increments through alphabet to add corresponding
        // letter on newly inserted verticies
        vm.nextChar = function(currentVertex){
            if(currentVertex < 26) {
                return String.fromCharCode('A'.charCodeAt(0) + currentVertex);    
            }
            else {
                return "[ ]";
            } 
        }
        
        // Function: addVertex(event)
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
                size: 20,
                text: vm.nextChar(vm.id)
            });
            nextVertexId++;
            
            console.log("Vertex " + vm.nextChar(nextVertexId - 1) + ": ");
            console.log("\txPos: " + vm.vertices[nextVertexId].xPos);
            console.log("\tyPos: " + vm.vertices[nextVertexId].yPos);
            
            vm.canDraw = false;
            vm.update();
        }
        
        // Function: addEdge(v, u, weight)
        // draws a connecting line from vertex v to vertex u
        // line will be edge (v, u) with weight W
        // adds edge to E(G)
        vm.addEdge = function() {
            // TODO
        }
        
        // Function: update()
        // Updates contents of canvas
        vm.update = function() { 
            for(var i = 0; i < vm.vertices.length; i++) {
                var v = vm.vertices[i];
                canvasService.drawVertex(v.xPos, v.yPos, v.size, vertexColor, v.text);
            }
            for(var i = 0; i < vm.edges.length; i++) {    
                var e = vm.edges[i];
                canvasService.drawEdge(e.v1, e.v2, e.weight);    
            }
        }
        
        vm.update();
    }
})();

// TODO: Add ability to create custom vertices (weight, size, etc.)
// TODO: Add method to create edges between selected vertices
