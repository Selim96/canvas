import CollapsBtn from "./CollapseBtn/CollapseBtn";

const canvas = document.querySelector("canvas");
console.log(canvas)
const ctx = canvas.getContext("2d");

ctx.beginPath();
ctx.moveTo(20, 20);
ctx.lineWidth = 1;
ctx.lineCap = 'round';
ctx.lineTo(100, 100);
ctx.closePath()
ctx.moveTo(50, 20);
ctx.lineTo(100, 50);

ctx.stroke();

function App() {
  

  return (
    <div className="App">
      <CollapsBtn/>
    </div>
  );
}

export default App;
