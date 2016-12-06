(function() {
    "use strict";
    
    angular
        .module("canvas", [])
        .controller("CanvasController", CanvasController);
    
    function CanvasController($scope, $http){ 
        var canvas = document.getElementById('simCanvas'); // Canvas object
        var context = canvas.getContext('2d'); // Canvas context
        var vm = this; // View Model
        vm.id = 0; // Set initial id for V(G) -> |V(G)| = 0 
        
        // Set of verticies in graph - V(G)
        vm.verticies = [
            {
                id: 0, // id of vertex
                xPos: 0, // x-position 
                yPos: 0, // y-position
                weight: 0, // vertex weight (if applicable)
                size: 20 // size of vertex (radius)
            },
            {
                id: 1, 
                xPos: 500, 
                yPos: 0, 
                weight: 0,
                size: 20 
            },
            {
                id: 2, 
                xPos: 500,
                yPos: 500, 
                weight: 0,
                size: 20 
            },
            {
                id: 3, 
                xPos: 0,  
                yPos: 500, 
                weight: 0, 
                size: 20 
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
            vm.id += 1;
            console.log("click received");
            vm.verticies.push({
                id: 1,
                xPos: event.x - 48,
                yPos: event.y - 129,
                weight: 0,
                size: 10
            });
            console.log("xPos: " + vm.verticies[vm.id].xPos);
            console.log("yPos: " + vm.verticies[vm.id].yPos);
            
            vm.update();
        }
        
        // Function: addEdge(v, u, weight)
        // draws a connecting line from vertex v to vertex u
        // line will be edge (v, u) with weight W
        // adds edge to E(G)
        vm.addEdge = function() {
            // TODO
        }
        
        // Function: drawVertex(v - Vertex)
        // draws a circle at clicked position of given size and (optional) weight
        vm.drawVertex = function(v) {
            context.beginPath();
            context.arc(v.xPos, v.yPos, v.size, 0, 2*Math.PI);
            context.fillStyle = "#ccddff";
            context.fill();
            context.lineWidth = 2;
            context.stroke();  
        }
        
        // Function: drawEdge(v1, v2)
        // draws connecting line (edge) between two verticies in V(G)
        vm.drawEdge = function(v1, v2){
            // TODO
        }
        
        
        // Function: update()
        // Updates contents of canvas
        vm.update = function() { 
            //console.log("draw called");
            for(var i = 0; i < vm.verticies.length; i++) {
                vm.drawVertex(vm.verticies[i]);
                if(i > 0) {
                    //drawEdge(v1, v2);
                }
            }
        }
        
        // Canvas dimensions
        canvas.width = 500;
        canvas.height = 500;
        context.globalAlpha = 1.0;
        
        // Start canvas drawing
        context.beginPath();
        vm.update();
    }
    
})();

// TODO: Get exact offset for canvas coordinates.
// TODO: Refactoring: seperate graph specific functionality into new controller
// TODO: Add ability to create custom verticies (weight, size, etc.)
// TODO: Add method to create edges between selected verticies