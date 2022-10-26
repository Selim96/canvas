import CollapsBtn from "./CollapseBtn/CollapseBtn";

const canvas = document.querySelector("canvas");

const wrapper = document.querySelector('.wrapper');
const stock = document.createElement("p");
stock.textContent = 'This browser is not support this file';

const ctx = canvas.getContext("2d");
console.log(canvas)

if (canvas.getContext) {
  
  

  const line = new Path2D();
  line.moveTo(125, 35);
  line.lineTo(200, 200);
  
  const line2 = new Path2D();
  line2.moveTo(150, 150);
  line2.lineTo(300, 400);

  // ctx.stroke(line);
  // ctx.stroke(line2)
  
  // ctx.beginPath();
  // ctx.moveTo(50, 20);
  // ctx.lineTo(100, 50);
  // ctx.stroke();
} else {
  wrapper.append(stock);
}

function startDrawing(elem, e) {
  const [x, y] = getMousePosition(elem, e);
  
  const ctx = canvas.getContext("2d");
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineWidth = 1;
  ctx.lineCap = 'round';
  ctx.lineTo(300, 300);
  ctx.stroke();
}

function getMousePosition(canvas, click) {
  let rect = canvas.getBoundingClientRect();
  
  const x = click.clientX - rect.left;
  const y = click.clientY - rect.top;
  
  return [x, y];
}

// const startX = 200;
// const startY = 200;
canvas.addEventListener('click', (e) => {
  startDrawing(canvas, e);
});


function App() {
  

  return (
    <div className="App">
      <CollapsBtn/>
    </div>
  );
}

export default App;
