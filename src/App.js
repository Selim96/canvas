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

const ctx = canvas.getContext("2d");

function drawLine(ctx, line) {
  const {start, end } = line;
  ctx.beginPath();
  ctx.moveTo(start.x, start.y);
  ctx.lineWidth = 3;
  ctx.lineTo(end.x, end.y);
  ctx.stroke();
};

let isStartDrawing = false;
let mouseStartPos = null;


function getMousePosition(click) {
  let rect = canvas.getBoundingClientRect();
  
  const x = click.clientX - rect.left;
  const y = click.clientY - rect.top;
  return {x, y};
}

canvas.addEventListener('mousedown', (e) => {
  e.preventDefault();
  
  mouseStartPos = getMousePosition(e);
  
  const line = {
    start: mouseStartPos,
    end: mouseStartPos
  };

  if (e.button === 0) {
    isStartDrawing = !isStartDrawing;
    if (isStartDrawing) {
      drawLine(ctx, line);
    }
  } if (e.button === 2) {
    isStartDrawing = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  } if (e.button === 1) {
    isStartDrawing = false;
  }
});

canvas.addEventListener('mousemove', (e) => {
  if (isStartDrawing) {
    let line = {
      start: mouseStartPos,
      end: getMousePosition(e),
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawLine(ctx, line);
  }
});

canvas.oncontextmenu = ((e) => {
  return false;
});
// canvas.oncontextmenu = (function (e) {
  
//   if (isRMBActive) {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//   }
//   // isRMBActive = false;
//   return false;
// });






function App() {
  
  return (
    <div className="App">
      <CollapsBtn/>
    </div>
  );
}

export default App;
