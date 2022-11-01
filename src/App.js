import CollapsBtn from "./CollapseBtn/CollapseBtn";

const canvas = document.querySelector("canvas");

const wrapper = document.querySelector('.wrapper');
const stock = document.createElement("p");
stock.textContent = 'This browser is not support canvas elements';

console.log(canvas)

// if (canvas.getContext) {
  
  
//   const line = new Path2D();
//   line.moveTo(125, 35);
//   line.lineTo(200, 200);
  
//   const line2 = new Path2D();
//   line2.moveTo(150, 150);
//   line2.lineTo(300, 400);

//   // ctx.stroke(line);
//   // ctx.stroke(line2)
  
//   ctx.beginPath();
//   ctx.moveTo(50, 20);
//   ctx.lineTo(100, 50);
//   ctx.stroke();
// } else {
//   wrapper.append(stock);
// }



// let isStartDrawing = false;
// let mouseStartPos = null;

const mouse = {
  isStartDrawing: false,
  isDeleteLine: false,
  mouseStartPos: null,
  currentPos: null,

  setStart(e, elem) {
    this.isStartDrawing = !this.isStartDrawing;
    this.mouseStartPos = this.getMousePosition(elem, e);
  },

  setStartFalse() {
    this.isStartDrawing = false;
  },

  setCurrent(e, elem) {
    this.currentPos = this.getMousePosition(elem, e);
  },

  getMousePosition(canvas, click) {
    let rect = canvas.getBoundingClientRect();

    const x = click.clientX - rect.left;
    const y = click.clientY - rect.top;
    return { x, y };
  },

  setDeleteLine() {
    this.isDeleteLine = !this.isDeleteLine;
  }
};

class Line {
  #k = null;
  #b = null;
  #points = [];
  constructor(start, end) {
    this.start = start;
    this.end = end;
    this.#k = (this.end.y - this.start.y) / (this.end.x - this.start.x);
    this.#b = this.start.y - this.#k * this.start.x;
    this.#points = this.addPoints();
  };

  k() {
    return this.#k;
  };
  b() {
    return this.#b;
  };
  points() {
    return this.#points;
  }
  pushPoint(point) {
    this.#points.push(point);
  }

  addPoints() {
    const lineK = this.k();
    const lineB = this.b();

    lines.forEach((element, index, array) => {
      if (array.length - 1 !== index) {
        const { start, end } = element;
        const elemK = element.k();
        const elemB = element.b();
        
        const startX = this.start.x;
        const startY = this.start.y;
        const endX = this.end.x;
        const endY = this.end.y;
        
        const pointX = (lineB - elemB) / (elemK - lineK);
        const pointY = lineK * pointX + lineB;
        
        if (Math.max(Math.abs(pointX - startX), Math.abs(pointX - endX)) <= Math.abs(endX - startX) && Math.max(Math.abs(pointX - start.x), Math.abs(pointX - end.x)) <= Math.abs(end.x - start.x)) {
          console.log('add')
          this.pushPoint({x: pointX , y: pointY});
        }
      }
    });
  }

  drawLine(ctx) {
    ctx.beginPath();
    ctx.moveTo(this.start.x, this.start.y);
    ctx.lineWidth = 3;
    ctx.lineTo(this.end.x, this.end.y);
    ctx.stroke();

    this.drawPoints(ctx);
  };

  drawPoints(ctx) {
    this.points().forEach(point => {
      const { x, y } = point;
      ctx.beginPath();
      ctx.fillStyle = 'red';
      ctx.arc(x, y, 5, 0, Math.PI * 2, true);
      ctx.fill();
    });
  };
};

const ctx = canvas.getContext("2d");
const lines = [];

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); 
  lines.forEach(line => {
    line.drawLine.call(line, ctx);
  });
};

function handleMouseClick(e) {
  e.preventDefault();

  if (e.button === 0) {
    mouse.setStart(e, canvas);
    mouse.setDeleteLine();
  
    const line = new Line(mouse.mouseStartPos, mouse.mouseStartPos);
    console.log(line.points())
    if (mouse.isStartDrawing) {
      lines.push(line);

      // lines.forEach((element, index, array) => {
      
      //   if (array.length - 1 !== index) {
      //     console.log('in func')
      //   if (element.k() * line.start.x + element.b() === line.start.y) {
      //     console.log(lines.start)
      //     points.push({ ...mouse.mouseStartPos });
      //     }
      //   }
      // });
      draw();
    };
  }

  if (e.button === 2) {
    mouse.setStartFalse();
    if (mouse.isDeleteLine) {
      lines.pop();
      mouse.setDeleteLine();
      draw();
      // ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  if (e.button === 1) {
    mouse.setStartFalse();
  }
};

function handleMouseMove(e) {
  if (mouse.isStartDrawing) {
    mouse.setCurrent(e, canvas);

    let line = new Line(mouse.mouseStartPos, mouse.currentPos);
    
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    lines.pop();
    
    lines.push(line);
    
    draw();
  }
};

canvas.addEventListener('mousedown', handleMouseClick);
canvas.addEventListener('mousemove', handleMouseMove);

// canvas.addEventListener('mousedown', (e) => {
//   e.preventDefault();
  
//   mouseStartPos = getMousePosition(e);
  
//   const line = {
//     start: mouseStartPos,
//     end: mouseStartPos
//   };

//   if (e.button === 0) {
//     isStartDrawing = !isStartDrawing;
//     if (isStartDrawing) {
//       drawLine(ctx, line);
//     }
//   } if (e.button === 2) {
//     isStartDrawing = false;
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//   } if (e.button === 1) {
//     isStartDrawing = false;
//   }
// });

// canvas.addEventListener('mousemove', (e) => {
//   if (isStartDrawing) {
//     let line = {
//       start: mouseStartPos,
//       end: getMousePosition(e),
//     }
//     ctx.clearRect(0, 0, canvas.width, canvas.height);

//     drawLine(ctx, line);
//   }
// });

canvas.oncontextmenu = ((e) => {
  return false;
});






function App() {
  
  return (
    <div className="App">
      <CollapsBtn/>
    </div>
  );
}

export default App;
