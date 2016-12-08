(function() {
    "use strict";
    
    angular
        .module("ccd.services", [])
        .service("canvasService", canvasService);
    
    function canvasService() {
        var canvas = document.getElementById('simCanvas'); // Canvas object
        var context = canvas.getContext('2d'); // Canvas context
        
        // Canvas dimensions
        canvas.width = 1000;
        canvas.height = 400;
        context.globalAlpha = 1.0;
        
        // Function: drawVertex(xPos, yPos, size, vertexColor)
        // Draws a circle at clicked position of given size and (optional) weight
        this.drawVertex = function(xPos, yPos, size, vertexColor, vName) {
            // Draw circle representing vertex
            context.fillStyle = vertexColor;
            context.beginPath();
            context.arc(xPos, yPos, size, 0, 2 * Math.PI);
            context.closePath();
            context.fill();
            context.lineWidth = 2;
            context.stroke();
            
            // Fill circle with text
            context.fillStyle = "black"; // font color to write the text with
            var width = context.measureText(vName).width;
            var height = context.measureText("w").width;
            var font = "bold 20px arial";
            context.font = font;
            context.fillText(vName, xPos - (width/2) ,yPos + (height/2));
        }
        
        // Function: drawEdge(v1, v2)
        // draws connecting line (edge) between two vertices in V(G)
        this.drawEdge = function(v1, v2, weight){
            
        }
        
    }
})();
