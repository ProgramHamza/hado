import { useEffect, useRef } from "react";
import * as THREE from "three";

type Readout = { xy: HTMLElement | null; phase: HTMLElement | null; mag: HTMLElement | null };

const FIELD_W = 14;
const FIELD_H = 8;
const NX = 150;
const NY = 86;
const SENSORS: [number, number][] = [
  [-FIELD_W / 2, -2.4],
  [-FIELD_W / 2, -0.8],
  [-FIELD_W / 2, 0.8],
  [-FIELD_W / 2, 2.4],
];

const VERTEX = `
uniform vec2 uT; uniform float uTime; uniform float uPx; varying float vI;
void main(){
  vec3 p = position;
  float d = distance(p.xy, uT);
  float w = sin(d*3.2 - uTime*3.0) * exp(-d*.32);
  p.z = w*.42; vI = w;
  vec4 mv = modelViewMatrix * vec4(p,1.);
  gl_PointSize = (1.5 + abs(w)*5.5 + exp(-d*2.)*5.) * uPx * (9./-mv.z);
  gl_Position = projectionMatrix * mv;
}`;

const FRAGMENT = `
varying float vI;
void main(){
  vec2 c = gl_PointCoord - .5;
  float a = smoothstep(.5,.2,length(c));
  vec3 ink = vec3(.05,.11,.18); vec3 sig = vec3(1.,.35,.12);
  float t = smoothstep(.25,.8,abs(vI));
  gl_FragColor = vec4(mix(ink,sig,t), a*(.32+t*.7));
}`;

function buildField() {
  const pos = new Float32Array(NX * NY * 3);
  let k = 0;
  for (let j = 0; j < NY; j++) {
    for (let i = 0; i < NX; i++) {
      pos[k++] = (i / (NX - 1) - 0.5) * FIELD_W;
      pos[k++] = (j / (NY - 1) - 0.5) * FIELD_H;
      pos[k++] = 0;
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  return geo;
}

/**
 * Full-screen WebGL wave field: an 80 MHz "ripple" spreading from the touch point,
 * with a sensor array on the left edge and the emitter ring on the right.
 * Writes a live readout into the given elements without re-rendering React.
 */
export function WaveField({ readout, reduced }: { readout: React.RefObject<Readout>; reduced: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    } catch {
      return; // No WebGL: the page still works without the background.
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const cam = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    const rig = new THREE.Group();
    scene.add(rig);

    const uniforms = {
      uT: { value: new THREE.Vector2(2, 0) },
      uTime: { value: 0 },
      uPx: { value: 1 },
    };
    const fieldGeo = buildField();
    const fieldMat = new THREE.ShaderMaterial({
      uniforms,
      transparent: true,
      depthWrite: false,
      vertexShader: VERTEX,
      fragmentShader: FRAGMENT,
    });
    rig.add(new THREE.Points(fieldGeo, fieldMat));

    const inkMat = new THREE.MeshBasicMaterial({ color: 0x0d1b2e });
    const sigMat = new THREE.MeshBasicMaterial({ color: 0xff5a1f, side: THREE.DoubleSide });
    const disposables: { dispose(): void }[] = [fieldGeo, fieldMat, inkMat, sigMat];
    const track = <T extends { dispose(): void }>(g: T) => (disposables.push(g), g);

    SENSORS.forEach(([x, y]) => {
      const m = new THREE.Mesh(track(new THREE.BoxGeometry(0.22, 0.5, 0.12)), inkMat);
      m.position.set(x - 0.05, y, 0);
      rig.add(m);
    });
    const band = new THREE.Mesh(track(new THREE.BoxGeometry(0.1, 6.4, 0.05)), inkMat);
    band.position.set(-FIELD_W / 2 - 0.2, 0, 0);
    rig.add(band);
    const ring = new THREE.Mesh(track(new THREE.TorusGeometry(0.42, 0.07, 16, 48)), sigMat);
    ring.position.set(FIELD_W / 2 + 0.1, -3.2, 0);
    rig.add(ring);
    const touch = new THREE.Mesh(track(new THREE.RingGeometry(0.16, 0.22, 40)), sigMat);
    rig.add(touch);

    const lineGeo = track(new THREE.BufferGeometry());
    lineGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(SENSORS.length * 6), 3));
    const lineMat = track(new THREE.LineBasicMaterial({ color: 0x0d1b2e, transparent: true, opacity: 0.28 }));
    rig.add(new THREE.LineSegments(lineGeo, lineMat));

    const target = new THREE.Vector2(2.5, 0.5);
    const cur = new THREE.Vector2(2.5, 0.5);
    let mx = 0;
    let my = 0;
    let scrollV = 0;
    let idle = true;
    let frame = 0;
    let raf = 0;
    const t0 = performance.now();

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h, false);
      cam.aspect = w / h;
      cam.position.set(0, 0, w < 800 ? 27 : 20);
      uniforms.uPx.value = (renderer.getPixelRatio() * h) / 900;
      cam.updateProjectionMatrix();
    };
    const onPointer = (e: PointerEvent) => {
      idle = false;
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      mx = nx;
      my = ny;
      const s = cam.position.z > 22 ? 1.05 : 0.78;
      target.set(nx * FIELD_W * s * 1.1, -ny * FIELD_H * s * 1.2);
      target.x = Math.max(-FIELD_W / 2 + 0.8, Math.min(FIELD_W / 2 - 0.8, target.x));
      target.y = Math.max(-FIELD_H / 2 + 0.5, Math.min(FIELD_H / 2 - 0.5, target.y));
    };
    const onScroll = () => {
      scrollV = window.scrollY / window.innerHeight;
    };

    const render = (now: number) => {
      const t = (now - t0) / 1000;
      if (idle) target.set(3.2 + Math.sin(t * 0.5) * 2.8, Math.sin(t * 0.8) * 1.8);
      cur.lerp(target, 0.08);
      uniforms.uT.value.copy(cur);
      uniforms.uTime.value = reduced ? 0 : t;
      touch.position.set(cur.x, cur.y, 0.05);
      touch.scale.setScalar(1 + 0.15 * Math.sin(t * 4));

      const a = lineGeo.attributes.position.array as Float32Array;
      SENSORS.forEach(([sx, sy], i) => {
        a.set([cur.x, cur.y, 0, sx, sy, 0], i * 6);
      });
      lineGeo.attributes.position.needsUpdate = true;

      const s1 = Math.min(scrollV, 2.2);
      rig.rotation.set(-0.9 + s1 * 0.35, my * 0.05, -0.08 + mx * 0.06);
      rig.position.y = -1.2 - s1 * 1.5;

      if (++frame % 6 === 0 && readout.current) {
        const [first, last] = [SENSORS[0], SENSORS[SENSORS.length - 1]];
        const d1 = Math.hypot(cur.x - first[0], cur.y - first[1]);
        const d2 = Math.hypot(cur.x - last[0], cur.y - last[1]);
        const { xy, phase, mag } = readout.current;
        if (xy) xy.textContent = `${(((cur.x + FIELD_W / 2) / FIELD_W) * 100).toFixed(0)} / ${(((cur.y + FIELD_H / 2) / FIELD_H) * 100).toFixed(0)}`;
        if (phase) phase.textContent = `${(((d1 - d2) * 18) % 360).toFixed(0)}°`;
        if (mag) mag.textContent = `${(20 * Math.log10((1 + d2) / (1 + d1))).toFixed(1)} dB`;
      }
      renderer.render(scene, cam);
      if (!reduced) raf = requestAnimationFrame(render);
    };
    const renderOnce = () => requestAnimationFrame(render);

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    if (reduced) window.addEventListener("pointermove", renderOnce, { passive: true });
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("pointermove", renderOnce);
      window.removeEventListener("scroll", onScroll);
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
    };
  }, [readout, reduced]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 z-0 block h-full w-full animate-fade"
    />
  );
}
