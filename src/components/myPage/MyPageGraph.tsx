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
    categories: {[key: string]: number}
    className?: string
    profile: string
}
const MyPageGraph: React.FC<props> = ({ className, categories, profile }: props) => {
    const canvasRef: React.RefObject<HTMLCanvasElement > = useRef(null);
    useEffect(() => {
        const tagArray: [string, number][] = Object.entries(categories).sort((a: [string, number], b: [string, number]) => (b[1] - a[1]));

        let tagNum: number = 0;
        for (let i: number = 0; i < tagArray.length; i += 1) tagNum += tagArray[i][1];
        const canvas: HTMLCanvasElement|null = canvasRef.current;
        if (!canvas) return;
        const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');
        if (!ctx) return;
        const dpr: number = window.devicePixelRatio || 1;
        const width: number = 500 / dpr;
        const height: number = 400 / dpr;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        const img: HTMLImageElement = new Image();
        img.onload = () => {
            const radius: number = Math.min(height, width) / 3;
            const x: number = width / 2;
            const y: number = height / 2;
            const gap: number = 8;
            let rgb: number[] = [8, 44, 172];
            const lineWidth: number = 5 / dpr;
            const fontSize: number = Math.ceil(12 / dpr);
            ctx.save();
            ctx.beginPath();
            ctx.arc(x, y, radius - 10 / dpr, 0, Math.PI * 2);
            ctx.fillStyle = '#f7cec0';
            ctx.fill();
            ctx.clip();
            ctx.drawImage(img, x - radius, y - radius, 2 * radius, 2 * radius);
            ctx.restore();
            if (tagArray.length === 0) return;
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
                    ctx.save();
                    ctx.font = `${fontSize}px NotoSansKRMedium`;
                    ctx.fillStyle = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
                    const standardText: string = '가나다라마바사아자차카';
                    const textWidth: number = Math.min(ctx.measureText(standardText).width, ctx.measureText(key).width);
                    const textHeight: number = fontSize;// (Math.ceil(textWidth / ctx.measureText(standardText).width)) * (ctx.measureText(standardText).actualBoundingBoxAscent + ctx.measureText(standardText).actualBoundingBoxDescent);
                    const a: number = binarySearch(radius, fontSize, ctx.measureText(key).width, Math.tan(centerAngle));
                    let sx: number = 0;
                    let sy: number = 0;
                    if (centerAngle > Math.PI / 2) {
                        if (Math.sin(a) < 0) {
                            ctx.fillStyle = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
                            sx = x - fontSize - ctx.measureText(key).width - (radius) * Math.cos(a);
                            sy = y + textHeight - (radius) * Math.sin(a);
                        }
                        else {
                            sx = x - fontSize - ctx.measureText(key).width - (radius) * Math.cos(a);
                            sy = y - (radius) * Math.sin(a);
                        }
                    }
                    else if (Math.sin(a) < 0) {
                        sx = x + fontSize + (radius) * Math.cos(a);
                        sy = y + (radius) * Math.sin(a);
                    }
                    else {
                        sx = x + fontSize + (radius) * Math.cos(a);
                        sy = y + textHeight + (radius) * Math.sin(a);
                    }
                    ctx.fillText(key, sx, sy);
                    ctx.restore();
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
                    ctx.arc(x, y, radius, toRad(cur) - Math.PI / 2, toRad(cur + 4) - Math.PI / 2);
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
                setTimeout(forSetInterval, 2);
            }
            ctx.lineWidth = lineWidth;
            setTimeout(forSetInterval, 2);
        };
        img.src = profile;
    }, [categories, profile]);
    return (
        <canvas className={className} ref={canvasRef} />
    );
};
MyPageGraph.defaultProps = {
    className: '',
};
export default React.memo(MyPageGraph);
