(function() {
    "use strict";
    
    angular
        .module("ccd.graph", [])
        .controller("GraphController", GraphController);
    
    GraphController.$inject = ["$timeout", "primService", "canvasService"];
    
    function GraphController($timeout, primService, canvasService) {
        var vm = this; // View Model
        var nextVertexId = 0; // Specifies id for next vertex added to V(G)
        var nextEdgeId = 0; // Specifies id for next edge added to E(G)
        var vertexColor = "#CC8193";
        var selectedColor = "#00FFFF";
        var selectedVertices = [];
        
        var Edge = function(v1, v2, weight) {
            this.v1 = v1;
            this.v2 = v2;
            this.weight = weight;
        }
        
        vm.isDrawing = false;
        vm.isSelecting = false;
        vm.isWeighted = false;
        vm.isLocked = false;
        vm.isPrimRunning = false;
        vm.clearMessage = false;
        vm.lockWarningLabel = false;
        vm.weightWarningLabel = false;
        
        // Set of vertices in graph - V(G)
        vm.vertices = [];
        
        // Set of edges in graph - E(G)
        vm.edges = [];
        vm.E = {};

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
            if(!vm.isLocked) { vm.isDrawing = !vm.isDrawing; }
        };
        
        // Function: toggleSelecting()
        // toggles the isSelecting switch
        vm.toggleSelecting = function() {
            if(!vm.isLocked) { 
                selectedVertices = [];
                update();
                vm.isSelecting = !vm.isSelecting;
            }
        };
        
        // Function: toggleLock()
        // toggles the isLocked switch
        vm.toggleLock = function() {
            vm.isLocked = !vm.isLocked;
        };
        
        // Function: toggleWeighted()
        // toggles between weighted and
        // unweighted graphs, clears graph
        vm.toggleWeighted = function() {
            vm.isWeighted = !vm.isWeighted;
            
            vm.clearGraph(true);
        };
        
        // Function: clearGraph(canClear) 
        // clears the canvas as well as V(G) and E(G)
        // displays clear message for brief period
        vm.clearGraph = function(canClear) { 
            if(!vm.isLocked || canClear) { 
                nextVertexId = 0;
                nextEdgeId = 0;
                vm.vertices = [];
                vm.edges = [];
                vm.E = {};
                vm.clearMessage = true;
                vm.isPrimRunning = false;

                canvasService.clear();
                $timeout(function() { vm.clearMessage = false; }, 2000);
                
                update();
            }
        };
        
        // Function runPrim()
        // passes G=(V,E) to Prim algorithm 
        // in the Prim Service, returns MWST
        // then draws result to canvas
        vm.runPrim = function() {
            vm.MWST = {};
            vm.graph = {
                vertices: vm.vertices,
                edges: vm.E
            };
            
            if(vm.isLocked && vm.isWeighted) {
                vm.isPrimRunning = true;
                vm.MWST = primService.primMWST(vm.graph);
                
                vm.MWST.edges.forEach(function(e) {
                    canvasService.drawEdge(e.v1.xPos, e.v1.yPos, e.v2.xPos, e.v2.yPos, e.weight, "blue");
                });
            
                vm.MWST.vertices.forEach(function(v) {
                    canvasService.drawVertex(v.xPos, v.yPos, v.size, "#8193CC", v.text);
                });    
            } 
            if(!vm.isLocked) {
                vm.lockWarningLabel = true;
                $timeout(function() { vm.lockWarningLabel = false; }, 2000);
            }
            if(!vm.isWeighted) {
                vm.weightWarningLabel = true;
                $timeout(function() { vm.weightWarningLabel = false; }, 2000);
            }            
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
                size: 20,
                text: nextChar(id)
            });
            
            vm.E[vm.vertices[nextVertexId].id] = [];
            
            nextVertexId++;
            vm.isDrawing = false;
            
            update();
        };
        
        // Function: addEdge(v, u, weight)
        // draws a connecting line from vertex v to vertex u
        // line will be edge (v, u) with weight W
        // adds edge to E(G)
        function addEdge() {
            var weight = 0;
            
            if(vm.isWeighted) {
                weight = parseInt(prompt("Enter (Positive) Edge Weight: ", "0"), 10);
            }
            else {
                weight = null;
            }

            vm.E[selectedVertices[0].id].push(new Edge(selectedVertices[0], selectedVertices[1], weight));
            vm.E[selectedVertices[1].id].push(new Edge(selectedVertices[1], selectedVertices[0], weight));
            
            vm.edges.push(new Edge(selectedVertices[0], selectedVertices[1], weight));

            selectedVertices = [];
            
            update();
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
            
            if(selectedVertices.length === 2) {
                vm.isSelecting = false;
                addEdge();
            }
        };
        
        // Function: isWithinVertex(mouseX, mouseY, vertex)
        // checks if mouse coords were inside a vertex
        function isWithinVertex(mouseX, mouseY, vX, vY, vSize) {
            return Math.sqrt(Math.pow(mouseX - vX, 2) + Math.pow(mouseY - vY, 2)) < vSize;
        };
        
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
        };
        
        // Function: update()
        // updates contents of canvas
        function update() {
            
            vm.edges.forEach(function(e) {
                canvasService.drawEdge(e.v1.xPos, e.v1.yPos, e.v2.xPos, e.v2.yPos, e.weight, "black");
            });
            
            vm.vertices.forEach(function(v) {
                canvasService.drawVertex(v.xPos, v.yPos, v.size, vertexColor, v.text);
            });
            
            selectedVertices.forEach(function(v) {
                canvasService.drawVertex(v.xPos, v.yPos, v.size, selectedColor, v.text);
            });
        };
        
        
    }
})();