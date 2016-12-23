(function() {
    "use strict";
    
    angular
        .module("ccd.service.canvas", [])
        .service("canvasService", canvasService);
    
    function canvasService() {
        var canvas = document.getElementById('simCanvas'); // Canvas object
        var context = canvas.getContext('2d'); // Canvas context
        
        // Canvas dimensions
        canvas.width = 1300;
        canvas.height = 600;
        context.globalAlpha = 1.0;
        
        // Function: drawVertex(xPos, yPos, size, vertexColor)
        // Draws a circle at clicked position of given size and (optional) weight
        this.drawVertex = function(xPos, yPos, size, vertexColor, vName) {
            // Draw circle representing vertex
            context.fillStyle = vertexColor;
            context.beginPath();
            context.arc(xPos, yPos, size, 0, 2 * Math.PI);
            context.fill();
            context.lineWidth = 2;
            context.stroke();
            
            // Fill circle with text
            context.fillStyle = "black"; // font color to write the text with
            var width = context.measureText(vName).width;
            var height = context.measureText("w").width;
            var font = "bold 20px Arial";
            context.font = font;
            context.fillText(vName, xPos - (width / 2), yPos + (height / 2));
        };
        
        // Function: drawEdge(xPos1, yPos1, xPos2, yPos2, weight, color)
        // draws connecting line (edge) between two vertices in V(G)
        this.drawEdge = function(xPos1, yPos1, xPos2, yPos2, weight, color){
            context.beginPath();
            context.fillStyle = "white";
            context.strokeStyle = color;
            
            if(xPos1 === xPos2 && yPos1 === yPos2) {
                var selfEdgeRadius = 30;
                context.arc(xPos1 - selfEdgeRadius, yPos1, selfEdgeRadius, 0, 2 * Math.PI);
                context.stroke();
                if(weight) { context.fillText(weight, xPos1 - (selfEdgeRadius + 20), yPos1); }
            } else {
                context.moveTo(xPos1, yPos1);
                context.lineTo(xPos2, yPos2);
                context.stroke();
                 if(weight) { context.fillText(weight, (xPos1 + xPos2) / 2, (yPos1 + yPos2) / 2); }
            }
            
        };
        
        // Function: clear()
        // clears contents of canvas
        this.clear = function() {
            context.clearRect(0, 0, canvas.width, canvas.height);  
        };
    }
})();
