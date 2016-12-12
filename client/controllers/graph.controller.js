(function() {
    "use strict";
    
    angular
        .module("ccd.graph", [])
        .controller("GraphController", GraphController);
    
    GraphController.$inject = ["canvasService"];
    
    function GraphController(canvasService) {
        var vm = this; // View Model
        vm.isDrawing = false;
        vm.isSelecting = false;
        
        // Set of vertices in graph - V(G)
        vm.vertices = [];
        
        // Set of edges in graph - E(G)
        vm.edges = [];
        
        var nextVertexId = 0;
        var nextEdgeId = 0;
        var vertexColor = "#CC8193";
        var selectedColor = "#00FFFF";
        var selectedVertices = [];
        
        // Function: click(event)
        // handles click events inside the canvas
        vm.click = function(event) {
            if(vm.isDrawing) {
                addVertex(event);
            } else if(vm.isSelecting) {
                selectVertex(event);
            }
        };
        
        // Function: toggleDrawing()
        // toggles the isDrawing switch
        vm.toggleDrawing = function() {
            vm.isDrawing = !vm.isDrawing;
        };
        
        // Function: toggleSelecting()
        // toggles the isSelecting switch
        vm.toggleSelecting = function() {
            selectedVertices = [];
            update();
            vm.isSelecting = !vm.isSelecting;
        };
        
        // Function: addVertex(event)
        // adds vertex to V(G)
        function addVertex(event) {
            var offsetX = event.offsetX;
            var offsetY = event.offsetY;
            var id = nextVertexId;
        
            vm.vertices.push({
                id: id,
                xPos: offsetX,
                yPos: offsetY,
                weight: 0,
                size: 20,
                text: nextChar(id)
            });
            
            nextVertexId++;
            vm.isDrawing = false;
            
            update();
        };
        
        // Function: addEdge(v, u, weight)
        // draws a connecting line from vertex v to vertex u
        // line will be edge (v, u) with weight W
        // adds edge to E(G)
        function addEdge() {
            vm.edges.push({
                id: nextEdgeId,
                v1: selectedVertices[0],
                v2: selectedVertices[1]
            });
            
            selectedVertices = [];
            nextEdgeId++;
            
            update();
        };
        
        // Function: update()
        // updates contents of canvas
        function update() {
            vm.edges.forEach(function(e) {
                canvasService.drawEdge(e.v1.xPos, e.v1.yPos, e.v2.xPos, e.v2.yPos);
            });
            
            vm.vertices.forEach(function(v) {
                canvasService.drawVertex(v.xPos, v.yPos, v.size, vertexColor, v.text);
            });
            
            selectedVertices.forEach(function(v) {
                canvasService.drawVertex(v.xPos, v.yPos, v.size, selectedColor, v.text);
            });
        };
        
        // Function: selectVertex(event)
        // selects a vertex to draw an edge from/to
        function selectVertex(event) {
            var mouseX = event.offsetX;
            var mouseY = event.offsetY;
            
            for(var i = 0; i < vm.vertices.length; i++) {
                var v = vm.vertices[i];
                if(isWithinVertex(mouseX, mouseY, v.xPos, v.yPos, v.size)) {
                    selectedVertices.push(vm.vertices[i]);
                    update();
                    break;
                }
            }
            
            if(selectedVertices.length >= 2) {
                vm.isSelecting = false;
                addEdge();
            }
        }
        
        // Function: isWithinVertex(mouseX, mouseY, vertex)
        // checks if mouse coords were inside a vertex
        function isWithinVertex(mouseX, mouseY, vX, vY, vSize) {
            return Math.sqrt(Math.pow(mouseX - vX, 2) + Math.pow(mouseY - vY, 2)) < vSize;
        }
        
        // Function: nextChar(currentVertex)
        // Increments through alphabet to add corresponding
        // letter on newly inserted verticies
        function nextChar(currentVertex) {
            if(currentVertex < 26) {
                return String.fromCharCode('A'.charCodeAt(0) + currentVertex);    
            }
            else {
                return "[ ]";
            } 
        }
    }
})();

// TODO: Add ability to create custom vertices (weight, size, etc.)
