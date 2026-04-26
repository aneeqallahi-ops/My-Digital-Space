import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { cn } from "@/lib/utils";

type DottedSurfaceProps = Omit<React.ComponentProps<"div">, "ref">;

export function DottedSurface({ className, ...props }: DottedSurfaceProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer | null = null;
    let frameId: number | null = null;
    let geometry: THREE.BufferGeometry | null = null;
    let material: THREE.PointsMaterial | null = null;

    const cleanup = () => {
      if (frameId !== null) cancelAnimationFrame(frameId);
      window.removeEventListener("resize", onResize);
      if (renderer) {
        if (renderer.domElement && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
        renderer.dispose();
      }
      geometry?.dispose();
      material?.dispose();
    };

    function onResize() {
      if (!renderer || !container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }

    const W = container.clientWidth || window.innerWidth;
    const H = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 1000);
    camera.position.set(0, 0, 28);

    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

      const ctx = renderer.getContext();
      if (!ctx) {
        cleanup();
        return cleanup;
      }

      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(W, H);
      renderer.setClearColor(0x000000, 0);
      container.appendChild(renderer.domElement);

      const COLS = 40;
      const ROWS = 60;
      const SPACING = 0.7;
      const offsetX = ((COLS - 1) * SPACING) / 2;
      const offsetZ = ((ROWS - 1) * SPACING) / 2;

      const count = COLS * ROWS;
      const positions = new Float32Array(count * 3);

      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const i = (r * COLS + c) * 3;
          positions[i]     = c * SPACING - offsetX;
          positions[i + 1] = 0;
          positions[i + 2] = r * SPACING - offsetZ;
        }
      }

      geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

      material = new THREE.PointsMaterial({
        color: new THREE.Color(0.78, 0.78, 0.78),
        size: 0.12,
        transparent: true,
        opacity: 0.55,
        sizeAttenuation: true,
      });

      const points = new THREE.Points(geometry, material);
      scene.add(points);

      let t = 0;
      const capturedRenderer = renderer;
      const capturedGeometry = geometry;

      function animate() {
        frameId = requestAnimationFrame(animate);
        t += 0.012;

        const pos = capturedGeometry.attributes.position as THREE.BufferAttribute;
        for (let r = 0; r < ROWS; r++) {
          for (let c = 0; c < COLS; c++) {
            const i = (r * COLS + c) * 3;
            const x = c * SPACING - offsetX;
            const z = r * SPACING - offsetZ;
            pos.array[i + 1] = Math.sin(x * 0.4 + t) * 0.35 + Math.cos(z * 0.3 + t * 0.8) * 0.25;
          }
        }
        pos.needsUpdate = true;
        points.rotation.y = Math.sin(t * 0.05) * 0.08;
        capturedRenderer.render(scene, camera);
      }

      animate();
      window.addEventListener("resize", onResize);
    } catch {
      cleanup();
    }

    return cleanup;
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn("absolute inset-0 pointer-events-none", className)}
      {...props}
    />
  );
}
