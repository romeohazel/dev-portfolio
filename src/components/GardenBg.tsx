"use client";

import { useEffect, useRef } from "react";

export default function GardenBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let animationId: number;
    let t = 0;

    interface Spore {
      x: number;
      y: number;
      vy: number;
      vx: number;
      r: number;
      opacity: number;
      life: number;
      maxLife: number;
    }

    interface Flower {
      x: number;
      y: number;
      size: number;
      hue: number;
      pulseSpeed: number;
      phase: number;
    }

    interface GrassBlade {
      x: number;
      baseY: number;
      height: number;
      sway: number;
      speed: number;
      hue: number;
      lightness: number;
      opacity: number;
    }

    interface Vine {
      points: { x: number; y: number }[];
      thickness: number;
      opacity: number;
      leaves: { x: number; y: number; size: number; angle: number; swayPhase: number }[];
    }

    interface Tree {
      x: number;
      baseY: number;
      trunkH: number;
      branches: { angle: number; length: number; thickness: number }[];
      opacity: number;
    }

    const spores: Spore[] = [];
    const flowers: Flower[] = [];
    const grasses: GrassBlade[] = [];
    const vines: Vine[] = [];
    const trees: Tree[] = [];
    const MAX_SPORES = 45;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const init = () => {
      flowers.length = 0;
      grasses.length = 0;
      vines.length = 0;
      trees.length = 0;

      const w = canvas.width;
      const h = canvas.height;

      // Grass clusters along bottom
      for (let i = 0; i < 120; i++) {
        grasses.push({
          x: Math.random() * w,
          baseY: h,
          height: Math.random() * 50 + 20,
          sway: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.006 + 0.002,
          hue: 85 + Math.random() * 45,
          lightness: 16 + Math.random() * 12,
          opacity: Math.random() * 0.08 + 0.04,
        });
      }

      // Grass along top edge (hanging)
      for (let i = 0; i < 40; i++) {
        grasses.push({
          x: Math.random() * w,
          baseY: 0,
          height: -(Math.random() * 30 + 10),
          sway: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.005 + 0.002,
          hue: 90 + Math.random() * 35,
          lightness: 14 + Math.random() * 10,
          opacity: Math.random() * 0.05 + 0.02,
        });
      }

      // Grass along left and right edges
      for (let i = 0; i < 60; i++) {
        const onLeft = i < 30;
        grasses.push({
          x: onLeft ? Math.random() * 60 : w - Math.random() * 60,
          baseY: Math.random() * h,
          height: (onLeft ? 1 : -1) * (Math.random() * 25 + 10),
          sway: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.004 + 0.002,
          hue: 85 + Math.random() * 40,
          lightness: 15 + Math.random() * 10,
          opacity: Math.random() * 0.06 + 0.02,
        });
      }

      // Vines creeping from edges
      const vineCount = 6 + Math.floor(Math.random() * 4);
      for (let i = 0; i < vineCount; i++) {
        const fromLeft = Math.random() > 0.5;
        const startX = fromLeft ? 0 : w;
        const startY = Math.random() * h;
        const dir = fromLeft ? 1 : -1;
        const segments = 40 + Math.floor(Math.random() * 60);
        const points: { x: number; y: number }[] = [];
        let x = startX;
        let y = startY;
        const curlFreq = Math.random() * 0.08 + 0.03;
        const curlAmp = Math.random() * 3 + 1;

        for (let s = 0; s < segments; s++) {
          points.push({ x, y });
          x += dir * (Math.random() * 1.5 + 0.8);
          y += Math.sin(s * curlFreq) * curlAmp;
        }

        const leaves: Vine["leaves"] = [];
        const leafCount = 3 + Math.floor(Math.random() * 5);
        for (let l = 0; l < leafCount; l++) {
          const idx = Math.floor(((l + 1) / (leafCount + 1)) * points.length);
          const p = points[idx];
          if (p) {
            leaves.push({
              x: p.x,
              y: p.y,
              size: Math.random() * 5 + 3,
              angle: (Math.random() - 0.5) * 1.2,
              swayPhase: Math.random() * Math.PI * 2,
            });
          }
        }

        vines.push({
          points,
          thickness: Math.random() * 0.6 + 0.3,
          opacity: Math.random() * 0.06 + 0.03,
          leaves,
        });
      }

      // Small subtle trees on edges
      const treeCount = 2 + Math.floor(Math.random() * 3);
      for (let i = 0; i < treeCount; i++) {
        const tx = Math.random() > 0.5 ? Math.random() * 80 + 10 : w - Math.random() * 80 - 10;
        const trunkH = Math.random() * 100 + 60;
        const branchCount = 3 + Math.floor(Math.random() * 4);
        const branches: Tree["branches"] = [];
        for (let b = 0; b < branchCount; b++) {
          branches.push({
            angle: (Math.random() - 0.5) * 1.4,
            length: Math.random() * 30 + 15,
            thickness: Math.random() * 0.4 + 0.2,
          });
        }
        trees.push({
          x: tx,
          baseY: h,
          trunkH,
          branches,
          opacity: Math.random() * 0.06 + 0.03,
        });
      }

      // Flowers scattered everywhere
      const flowerCount = Math.floor((w * h) / 40000);
      for (let i = 0; i < flowerCount; i++) {
        flowers.push({
          x: Math.random() * w,
          y: Math.random() * h,
          size: Math.random() * 2 + 0.8,
          hue: [340, 35, 280, 50, 15, 310][Math.floor(Math.random() * 6)],
          pulseSpeed: Math.random() * 0.008 + 0.003,
          phase: Math.random() * Math.PI * 2,
        });
      }
    };

    const drawGrass = () => {
      for (const g of grasses) {
        const swayOffset = Math.sin(t * g.speed + g.sway) * 3;
        const isVertical = g.baseY === canvas.height || g.baseY === 0;

        ctx.beginPath();
        if (isVertical) {
          ctx.moveTo(g.x, g.baseY);
          ctx.quadraticCurveTo(
            g.x + swayOffset,
            g.baseY - g.height * 0.6,
            g.x + swayOffset * 1.5,
            g.baseY - g.height
          );
        } else {
          // Side grass — grows horizontally
          ctx.moveTo(g.x, g.baseY);
          ctx.quadraticCurveTo(
            g.x + g.height * 0.6,
            g.baseY + swayOffset,
            g.x + g.height,
            g.baseY + swayOffset * 1.5
          );
        }
        ctx.strokeStyle = `hsla(${g.hue}, 35%, ${g.lightness}%, ${g.opacity})`;
        ctx.lineWidth = 0.7;
        ctx.stroke();
      }
    };

    const drawVines = () => {
      for (const v of vines) {
        // Draw vine path
        ctx.beginPath();
        for (let i = 0; i < v.points.length; i++) {
          const p = v.points[i];
          const sway = Math.sin(t * 0.003 + i * 0.1) * 0.5;
          if (i === 0) ctx.moveTo(p.x, p.y + sway);
          else ctx.lineTo(p.x, p.y + sway);
        }
        ctx.strokeStyle = `rgba(58, 90, 58, ${v.opacity})`;
        ctx.lineWidth = v.thickness;
        ctx.stroke();

        // Draw leaves
        for (const leaf of v.leaves) {
          const leafSway = Math.sin(t * 0.005 + leaf.swayPhase) * 3;
          ctx.save();
          ctx.translate(leaf.x + leafSway * 0.3, leaf.y + leafSway * 0.5);
          ctx.rotate(leaf.angle + Math.sin(t * 0.004 + leaf.swayPhase) * 0.1);
          ctx.beginPath();
          ctx.ellipse(0, 0, leaf.size, leaf.size * 0.45, 0, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(80, 115, 68, ${v.opacity * 1.5})`;
          ctx.fill();
          // Leaf vein
          ctx.beginPath();
          ctx.moveTo(-leaf.size * 0.8, 0);
          ctx.lineTo(leaf.size * 0.8, 0);
          ctx.strokeStyle = `rgba(60, 95, 50, ${v.opacity})`;
          ctx.lineWidth = 0.3;
          ctx.stroke();
          ctx.restore();
        }
      }
    };

    const drawTrees = () => {
      for (const tree of trees) {
        // Trunk
        ctx.beginPath();
        const trunkSway = Math.sin(t * 0.001) * 1;
        ctx.moveTo(tree.x, tree.baseY);
        ctx.quadraticCurveTo(
          tree.x + trunkSway,
          tree.baseY - tree.trunkH * 0.5,
          tree.x + trunkSway * 2,
          tree.baseY - tree.trunkH
        );
        ctx.strokeStyle = `rgba(61, 51, 41, ${tree.opacity * 2})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Branches
        const topX = tree.x + trunkSway * 2;
        const topY = tree.baseY - tree.trunkH;
        for (const branch of tree.branches) {
          const bSway = Math.sin(t * 0.003 + branch.angle) * 2;
          const endX = topX + Math.sin(branch.angle) * branch.length + bSway;
          const endY = topY - Math.cos(branch.angle) * branch.length * 0.6;

          ctx.beginPath();
          ctx.moveTo(topX, topY);
          ctx.lineTo(endX, endY);
          ctx.strokeStyle = `rgba(61, 51, 41, ${tree.opacity * 1.5})`;
          ctx.lineWidth = branch.thickness;
          ctx.stroke();

          // Leaf cluster at branch end
          ctx.beginPath();
          ctx.arc(endX, endY, 4 + Math.random() * 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(70, 105, 58, ${tree.opacity * 1.2})`;
          ctx.fill();
        }
      }
    };

    const drawFlowers = () => {
      for (const f of flowers) {
        const pulse = 0.4 + Math.sin(t * f.pulseSpeed + f.phase) * 0.25;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${f.hue}, 45%, ${55}%, ${pulse * 0.12})`;
        ctx.fill();
        // Tiny glow
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.size * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${f.hue}, 40%, 50%, ${pulse * 0.02})`;
        ctx.fill();
      }
    };

    const drawSpores = () => {
      if (Math.random() < 0.05 && spores.length < MAX_SPORES) {
        spores.push({
          x: Math.random() * canvas.width,
          y: canvas.height + 10,
          vy: -(Math.random() * 0.2 + 0.08),
          vx: (Math.random() - 0.5) * 0.12,
          r: Math.random() * 1.5 + 0.4,
          opacity: 0,
          life: 0,
          maxLife: Math.random() * 800 + 500,
        });
      }

      for (let i = spores.length - 1; i >= 0; i--) {
        const s = spores[i];
        s.life++;
        s.x += s.vx + Math.sin(s.life * 0.005) * 0.1;
        s.y += s.vy;

        const progress = s.life / s.maxLife;
        if (progress < 0.15) s.opacity = progress / 0.15;
        else if (progress > 0.7) s.opacity = (1 - progress) / 0.3;

        if (s.life > s.maxLife || s.y < -20) {
          spores.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(138, 154, 114, ${s.opacity * 0.25})`;
        ctx.fill();
      }
    };

    const draw = () => {
      if (document.hidden) {
        animationId = requestAnimationFrame(draw);
        return;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t++;
      drawGrass();
      drawVines();
      drawTrees();
      drawFlowers();
      drawSpores();
      animationId = requestAnimationFrame(draw);
    };

    resize();
    init();

    if (prefersReducedMotion) {
      // Draw a single static frame
      drawGrass();
      drawVines();
      drawTrees();
      drawFlowers();
    } else {
      draw();
    }

    const onResize = () => {
      resize();
      init();
    };
    window.addEventListener("resize", onResize);
    return () => {
      if (!prefersReducedMotion) cancelAnimationFrame(animationId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0"
      style={{ pointerEvents: "none" }}
      aria-hidden="true"
    />
  );
}
