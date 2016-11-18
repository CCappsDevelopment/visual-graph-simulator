(function(){
    "use strict";
    
    angular
        .module("canvas", [])
        .controller("CanvasController", CanvasController);
    
    function CanvasController($scope, $http){ 
        var canvas = document.getElementById('simCanvas');
        var context = canvas.getContext('2d');
        var vm = this;
        
        vm.verticies = [
            {
                id: 0,
                xPos: 250,
                yPos: 250,
                weight: 10
            }
        ]
        
        // Function: getGraphSpecs()
        // retrives inputs for graph options from the view
        // initalizes canvas to selected options
        
        // Function: Draw()
        // Updates contents of canvas
        vm.draw = function() { 
            //console.log("draw called");
            for(var i = 0; i < vm.verticies.length; i++) {
                vm.drawVertex(vm.verticies[i]);
            }
        }
        
        
        // Function: addVertex()
        // adds vertex to V(G)
        vm.addVertex = function(xPos, yPos, weight) {
                 
        }
        
        // Function: drawVertex(v - Vertex)
        // draws a circle at clicked position of given size and (optional) weight
        vm.drawVertex = function(v) {
            context.beginPath();
            context.arc(v.xPos, v.yPos, 50, 0, 2*Math.PI);
            context.fillStyle = "#ccddff";
            context.fill();
            context.lineWidth = 2;
            context.stroke();  
        }
        
        // Function: createEdge(v, u, weight)
        // draws a connecting line from vertex v to vertex u
        // line will be edge (v, u) with weight W
        // adds edge to E(G)
        
        canvas.width = 600;
        canvas.height = 400;
        context.globalAlpha = 1.0;
        context.beginPath();
        vm.draw();
    }
    
})();