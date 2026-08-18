import { useEffect, useRef } from "react";
import "./Antigravity.css";

const Antigravity = ({
  count = 300,
  magnetRadius = 10,
  ringRadius = 10,
  waveSpeed = 0.4,
  waveAmplitude = 1,
  particleSize = 2,
  lerpSpeed = 0.1,
  color = "#FF9FFC",
  autoAnimate = false,
  particleVariance = 1,
  rotationSpeed = 0,
  depthFactor = 1,
  pulseSpeed = 3,
  particleShape = "capsule",
  fieldStrength = 10,
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return undefined;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2, active: false };
    let animationFrame;
    let particles = [];

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * ratio;
      canvas.height = window.innerHeight * ratio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);

      particles = Array.from({ length: count }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        homeX: Math.random() * window.innerWidth,
        homeY: Math.random() * window.innerHeight,
        phase: Math.random() * Math.PI * 2,
        variance: 0.6 + Math.random() * particleVariance,
        angle: Math.random() * Math.PI * 2,
      }));
    };

    const updatePointer = (event) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;
    };

    const draw = (time = 0) => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      context.clearRect(0, 0, width, height);
      context.fillStyle = color;

      particles.forEach((particle) => {
        const magnetDistance = magnetRadius * 26;
        const dx = particle.x - pointer.x;
        const dy = particle.y - pointer.y;
        const distance = Math.hypot(dx, dy);
        const wave = Math.sin(time * 0.001 * waveSpeed + particle.phase) * waveAmplitude * 12;
        const useMagnet = pointer.active && distance < magnetDistance;
        const targetAngle = Math.atan2(dy, dx) + particle.phase * 0.12 + time * 0.0001 * rotationSpeed;
        const targetRadius = ringRadius * 13 + wave + particle.variance * depthFactor * 8;
        const idleX = particle.homeX + Math.sin(time * 0.00035 * pulseSpeed + particle.phase) * 16;
        const idleY = particle.homeY + Math.cos(time * 0.00028 * pulseSpeed + particle.phase) * 16;
        const targetX = useMagnet ? pointer.x + Math.cos(targetAngle) * targetRadius : idleX;
        const targetY = useMagnet ? pointer.y + Math.sin(targetAngle) * targetRadius : idleY;
        const speed = Math.min(Math.max(lerpSpeed, 0.02), 0.3) * (0.6 + fieldStrength / 25);

        particle.x += (targetX - particle.x) * speed;
        particle.y += (targetY - particle.y) * speed;
        particle.angle += 0.02 + rotationSpeed * 0.002;

        const size = particleSize * particle.variance;
        context.globalAlpha = useMagnet ? 0.78 : 0.26;
        context.save();
        context.translate(particle.x, particle.y);
        context.rotate(particle.angle);

        if (particleShape === "capsule") {
          context.fillRect(-size * 0.45, -size * 1.5, size * 0.9, size * 3);
        } else {
          context.beginPath();
          context.arc(0, 0, size, 0, Math.PI * 2);
          context.fill();
        }

        context.restore();
      });

      context.globalAlpha = 1;
      if (!reducedMotion) animationFrame = window.requestAnimationFrame(draw);
    };

    const handleLeave = () => {
      if (!autoAnimate) pointer.active = false;
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", updatePointer);
    window.addEventListener("pointerleave", handleLeave);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", updatePointer);
      window.removeEventListener("pointerleave", handleLeave);
    };
  }, [
    autoAnimate,
    color,
    count,
    depthFactor,
    fieldStrength,
    lerpSpeed,
    magnetRadius,
    particleShape,
    particleSize,
    particleVariance,
    pulseSpeed,
    ringRadius,
    rotationSpeed,
    waveAmplitude,
    waveSpeed,
  ]);

  return <canvas ref={canvasRef} className="antigravity-background" aria-hidden="true" />;
};

export default Antigravity;
