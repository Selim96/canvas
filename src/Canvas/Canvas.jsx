function Canvas() {
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');

    ctx.beginPath();
    ctx.moveTo(50, 50);
    ctx.lineCap = 'round';
    ctx.lineTo(200, 200);
    ctx.stroke();

    return (
    <div >
        <canvas></canvas>
    </div>
    );
}

export default Canvas;