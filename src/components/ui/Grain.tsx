import { useEffect, useRef } from "react";

export function Grain({ opacity = 0.05 }: { opacity?: number }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            drawNoise();
        };

        const createNoisePattern = () => {
            const patternCanvas = document.createElement("canvas");
            // Set pattern size - smaller size tiled is much better for performance
            patternCanvas.width = 128; 
            patternCanvas.height = 128;
            const patternCtx = patternCanvas.getContext("2d");

            if (!patternCtx) return null;

            const patternData = patternCtx.createImageData(128, 128);
            const buffer32 = new Uint32Array(patternData.data.buffer);

            // Generate high-quality static noise once
            for (let i = 0; i < buffer32.length; i++) {
                // Monochrome noise: Black, with random alpha
                const value = Math.random() * 255;
                buffer32[i] = (255 << 24) | (value << 16) | (value << 8) | value;
            }

            patternCtx.putImageData(patternData, 0, 0);
            return patternCanvas;
        };

        const patternCanvas = createNoisePattern();

        const drawNoise = () => {
            if (!patternCanvas) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = ctx.createPattern(patternCanvas, "repeat") || "rgba(0,0,0,0)";
            
            // Random offset for animated grain
            const xOffset = -Math.random() * 128;
            const yOffset = -Math.random() * 128;
            
            ctx.translate(xOffset, yOffset);
            ctx.fillRect(-xOffset, -yOffset, canvas.width + 128, canvas.height + 128);
            ctx.translate(-xOffset, -yOffset);

            // Throttle animation to roughly 15fps for that cinematic film feel
            setTimeout(() => {
                animationFrameId = requestAnimationFrame(drawNoise);
            }, 1000 / 15);
        };

        window.addEventListener("resize", resize);
        resize();

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-[100] mix-blend-multiply dark:mix-blend-overlay"
            style={{ opacity }}
            aria-hidden="true"
        />
    );
}
