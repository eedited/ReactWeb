import React, { useEffect, useRef } from 'react';

function binarySearch(r: number, h: number, w: number, tofind: number) {
    let s: number = -Math.PI / 2;
    let e: number = Math.PI / 2;
    let iter: number = 20;
    while (iter > 0) {
        const mid: number = (s + e) / 2;
        const val: number = (r * Math.sin(mid) + h / 2) / (r * Math.cos(mid) + w / 2);
        if (val < tofind) s = mid;
        else e = mid;
        iter -= 1;
    }
    return s;
}
function toRad(deg: number) {
    return (Math.PI * deg) / 180;
}
interface props{
    tags: {[key: string]: number}
}
const MyPageGraph: React.FC<props> = ({ tags }: props) => {
    const canvasRef: React.RefObject<HTMLCanvasElement > = useRef(null);
    useEffect(() => {
        const tagArray: [string, number][] = Object.entries(tags).sort((a: [string, number], b: [string, number]) => (b[1] - a[1]));
        let tagNum: number = 0;
        for (let i: number = 0; i < tagArray.length; i += 1) tagNum += tagArray[i][1];
        const canvas: HTMLCanvasElement|null = canvasRef.current;
        if (!canvas) return;
        const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');
        if (!ctx) return;
        const dpr: number = window.devicePixelRatio || 1;
        const width: number = 400 / dpr;
        const height: number = 400 / dpr;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        const img: HTMLImageElement = new Image();
        img.onload = function () {
            const radius: number = width / 3;
            const x: number = width / 2;
            const y: number = height / 2;
            const gap: number = 3;
            let rgb: number[] = [8, 44, 172];
            const lineWidth: number = 5 / dpr;
            const fontSize: number = Math.ceil(12 / dpr);
            ctx.save();
            ctx.beginPath();
            ctx.arc(x, y, radius - 10 / dpr, 0, Math.PI * 2);
            ctx.fillStyle = '#f7cec0';
            ctx.fill();
            ctx.clip();
            ctx.drawImage(img, x - radius + 10 / dpr, y - radius + 10 / dpr, x + radius - 10 / dpr, y + radius - 10 / dpr);
            ctx.restore();

            const step: number = (360 - (tagArray.length) * gap) / tagNum;
            let cur: number = 0;
            let prevAngle: number = 0;
            let nextAngle: number = tagArray[0][1] * step;
            let currentIdx: number = 0;

            function drawTag() {
                if (!ctx) return;
                prevAngle = 0;
                tagArray.forEach(([key, value]: [string, number]) => {
                    const currentAngle: number = prevAngle + (Math.PI * (step * value)) / 180;
                    const centerAngle: number = (currentAngle + prevAngle - Math.PI) / 2;
                    ctx.font = `${fontSize}px NotoSansKRMedium`;
                    ctx.fillStyle = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
                    const a: number = binarySearch(radius, fontSize, ctx.measureText(key).width, Math.tan(centerAngle));
                    if (centerAngle > Math.PI / 2) {
                        if (Math.sin(a) < 0) {
                            ctx.fillStyle = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
                            ctx.fillText(key, x - fontSize - ctx.measureText(key).width - (radius) * Math.cos(a), y + fontSize - (radius) * Math.sin(a));
                        }
                        else {
                            ctx.fillText(key, x - fontSize - ctx.measureText(key).width - (radius) * Math.cos(a), y - (radius) * Math.sin(a));
                        }
                    }
                    else if (Math.sin(a) < 0) {
                        ctx.fillText(key, x + fontSize + (radius) * Math.cos(a), y + (radius) * Math.sin(a));
                    }
                    else {
                        ctx.fillText(key, y + fontSize + (radius) * Math.cos(a), y + fontSize + (radius) * Math.sin(a));
                    }
                    prevAngle = currentAngle + (Math.PI * gap) / 180;
                    rgb = [rgb[0] + 10, rgb[1] + 10, rgb[2] + 10];
                });
            }

            function forSetInterval() {
                if (!ctx) return;
                if (cur >= 360) {
                    setTimeout(drawTag, 15);
                    return;
                }
                ctx.strokeStyle = `rgb(${rgb[0] + 10 * currentIdx},${rgb[1] + 10 * currentIdx},${rgb[2] + 10 * currentIdx})`;
                if (prevAngle <= cur && cur + 1 <= nextAngle) {
                    // cur~cur+1까지 그려.
                    ctx.beginPath();
                    ctx.arc(x, y, radius, toRad(cur) - Math.PI / 2, toRad(cur + 1) - Math.PI / 2);
                    ctx.stroke();
                }
                else if (prevAngle <= cur && cur + 1 > nextAngle) {
                    // cur ~ nextAngle 까지 그려.
                    // prevAngle, nextAngle 다시 계산.
                    ctx.beginPath();
                    ctx.arc(x, y, radius, toRad(cur) - Math.PI / 2, toRad(nextAngle) - Math.PI / 2);
                    if (currentIdx + 1 < tagArray.length) {
                        currentIdx += 1;
                    }
                    prevAngle = nextAngle + (gap);
                    nextAngle = prevAngle + ((step * tagArray[currentIdx][1]));
                    ctx.stroke();
                }
                else if (prevAngle > cur && cur + 1 < prevAngle) {
                    // 아무것도 그리지 마.
                }
                else if (prevAngle > cur && cur + 1 >= prevAngle) {
                    // prevAngle ~ cur+1까지 그려.
                    ctx.beginPath();
                    ctx.arc(x, y, radius, toRad(prevAngle) - Math.PI / 2, toRad(cur + 1) - Math.PI / 2);
                    ctx.stroke();
                }
                cur += 1;
                setTimeout(forSetInterval, 8);
            }
            ctx.lineWidth = lineWidth;
            setTimeout(forSetInterval, 8);
            /*
            tagArray.forEach(([key, value]: [string, number]) => {
                ctx.strokeStyle = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
                ctx.lineWidth = lineWidth;
                ctx.beginPath();
                const currentAngle: number = prevAngle + (Math.PI * (step * value)) / 180;
                ctx.arc(x, y, radius, prevAngle - Math.PI / 2, currentAngle - Math.PI / 2);
                const centerAngle: number = (currentAngle + prevAngle - Math.PI) / 2;
                ctx.font = `${fontSize}px NotoSansKRMedium`;
                ctx.fillStyle = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
                const a: number = binarySearch(radius, fontSize, ctx.measureText(key).width, Math.tan(centerAngle));
                if (centerAngle > Math.PI / 2) {
                    if (Math.sin(a) < 0) {
                        ctx.fillText(key, x - fontSize - ctx.measureText(key).width - (radius) * Math.cos(a), y + fontSize - (radius) * Math.sin(a));
                    }
                    else {
                        ctx.fillText(key, x - fontSize - ctx.measureText(key).width - (radius) * Math.cos(a), y - (radius) * Math.sin(a));
                    }
                }
                else if (Math.sin(a) < 0) {
                    ctx.fillText(key, x + fontSize + (radius) * Math.cos(a), y + (radius) * Math.sin(a));
                }
                else {
                    ctx.fillText(key, y + fontSize + (radius) * Math.cos(a), y + fontSize + (radius) * Math.sin(a));
                }
                ctx.stroke();
                prevAngle = currentAngle + (Math.PI * gap) / 180;
                rgb = [rgb[0] + 40, rgb[1] + 40, rgb[2] + 40];
            }); */
        };
        img.src = '/problem.png';
    }, [tags]);
    return (
        <canvas ref={canvasRef} />
    );
};

export default (MyPageGraph);
