class Line {
  #k = null;
  #b = null;
  #points = [];
  constructor(start, end) {
    this.start = start;
    this.end = end;
    this.#k = (this.end.y - this.start.y) / (this.end.x - this.start.x);
    this.#b = this.start.y - this.#k * this.start.x;
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

  addPoints(lines) {
    const lineK = this.k();
    const lineB = this.b();
    const startX = this.start.x;
    const endX = this.end.x;
    
    lines.forEach((element, index, array) => {
      if (array.length - 1 !== index) {
        const { start, end } = element;
        const elemK = element.k();
        const elemB = element.b();
      
        const pointX = (lineB - elemB) / (elemK - lineK);
        const pointY = lineK * pointX + lineB;
        
        if (Math.max(Math.abs(pointX - startX), Math.abs(pointX - endX)) <= Math.abs(endX - startX) && Math.max(Math.abs(pointX - start.x), Math.abs(pointX - end.x)) <= Math.abs(end.x - start.x)) {
          this.pushPoint({x: pointX , y: pointY});
        }
      }
    });
  };

  drawPoints(ctx, lines) {
    this.addPoints(lines);
    this.points().forEach(point => {
        const { x, y } = point;
        ctx.beginPath();
        ctx.fillStyle = 'red';
        ctx.arc(x, y, 4, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.stroke();
    });
  };

  drawLine(ctx, lines) {
    ctx.beginPath();
    ctx.moveTo(this.start.x, this.start.y);
    ctx.lineCap = "round";
    ctx.lineWidth = 1;
    ctx.lineTo(this.end.x, this.end.y);
    ctx.stroke();

    this.drawPoints(ctx, lines);
  };
};

export default Line;