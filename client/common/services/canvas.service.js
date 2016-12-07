(function() {
    "use strict";
    
    angular
        .module("smitty.services", [])
        .service("canvasService", canvasService);
    
    function canvasService() {
        var canvas = document.getElementById('simCanvas'); // Canvas object
        var context = canvas.getContext('2d'); // Canvas context
        
        // Canvas dimensions
        canvas.width = 500;
        canvas.height = 500;
        context.globalAlpha = 1.0;
        
        // Function: drawVertex(v - Vertex)
        // Draws a circle at clicked position of given size and (optional) weight
        this.drawVertex = function(xPos, yPos, size, vertexColor) {
            context.beginPath();
            
            context.arc(xPos, yPos, size, 0, 2 * Math.PI);
            context.fillStyle = vertexColor;
            context.fill();
            context.lineWidth = 2;
            
            context.stroke();
        }
    }
})();
