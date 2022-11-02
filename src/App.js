import CollapsBtn from "./CollapseBtn/CollapseBtn";
import Line from "./classes/classes";

const canvas = document.querySelector("canvas");

// const wrapper = document.querySelector('.wrapper');
const stock = document.createElement("p");
stock.textContent = 'This browser is not support canvas elements';

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

const ctx = canvas.getContext("2d");
let lines = [];

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); 
  lines.forEach(line => {
    line.drawLine(ctx, lines);
  });
};

function handleMouseClick(e) {
  e.preventDefault();

  if (e.button === 0) {
    mouse.setStart(e, canvas);
    mouse.setDeleteLine();
  
    const line = new Line(mouse.mouseStartPos, mouse.mouseStartPos);
    
    if (mouse.isStartDrawing) {
      lines.push(line);
      draw();
    };
  }

  if (e.button === 2) {
    mouse.setStartFalse();
    if (mouse.isDeleteLine) {
      lines.pop();
      mouse.setDeleteLine();
      draw();
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

function collapsAll(ctx) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  lines = [];
};

canvas.addEventListener('mousedown', handleMouseClick);
canvas.addEventListener('mousemove', handleMouseMove);

canvas.oncontextmenu = ((e) => {
  return false;
});

function App() {
  
  return (
    <div className="app">
      <CollapsBtn func={()=>collapsAll(ctx)} />
    </div>
  );
}

export default App;