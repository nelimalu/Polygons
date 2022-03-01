var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');
var vertices = [];
var vertex_radius = 15;
var moving = null;


function distance(x1, y1, x2, y2) {
	return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}


function fillPolygon(points, color) {
    if (points.length > 0) {
        c.fillStyle = color;

      	let point = points[0];

        c.beginPath();
        c.moveTo(point.x, point.y);

        for (let i = 1; i < points.length; ++i) {
            point = points[i];

            c.lineTo(point.x, point.y);
        }

        c.closePath();
        c.fill();
    }
}


class Vertex {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	draw() {
		c.beginPath();
		c.arc(this.x, this.y, vertex_radius, 0, Math.PI * 2, false);
		c.fillStyle = "gray";
		c.fill();
	}
}

window.oncontextmenu = function(e) {
  e.preventDefault();
}

window.addEventListener('mousedown', function(event) {
	let counter = -1;
	for (let vertex of vertices) {
		counter++;
		if (distance(vertex.x, vertex.y, event.x, event.y) <= vertex_radius) {
			if (event.which == 1 || event.button == 0)
				moving = vertex;
			else if (event.which == 3 || event.button == 2) {
				vertices.splice(counter, 1);
			}
			return;
		}
	}
	
	if (moving === null && (event.which == 1 || event.button == 0))
		vertices.push(new Vertex(event.x, event.y));
});

window.addEventListener('mousemove', function(event) {
	if (moving !== null) {
		moving.x = event.x;
		moving.y = event.y;
	}
});

window.addEventListener('mouseup', function(event) { moving = null; });


function animate() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	requestAnimationFrame(animate);
	c.clearRect(0, 0, innerWidth, innerHeight);

	fillPolygon(vertices, "aquamarine");
	for (let vertex of vertices) {
		vertex.draw();
		c.moveTo(vertex.x, vertex.y);
		c.lineTo(vertex.x, vertex.y);
	}
	
}
animate();
