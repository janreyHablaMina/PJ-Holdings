"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface ThreeHeroCanvasProps {
  objectType?: "gyroscope" | "prism" | "sphere";
}

export default function ThreeHeroCanvas({ objectType = "gyroscope" }: ThreeHeroCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      38,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.z = 11;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // Master sculpture group
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // Reusable Materials (Quiet Luxury: Matte Obsidian & Brushed Champagne Platinum)
    const obsidianMat = new THREE.MeshPhysicalMaterial({
      color: 0x16171d,
      roughness: 0.28,
      metalness: 0.88,
      clearcoat: 0.5,
      clearcoatRoughness: 0.2,
      reflectivity: 0.7,
    });

    const platinumMat = new THREE.MeshStandardMaterial({
      color: 0xd8d3c5, // Subtle warm champagne platinum
      roughness: 0.22,
      metalness: 0.95,
    });

    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x52525b,
      wireframe: true,
      transparent: true,
      opacity: 0.2,
    });

    // Sub-elements to animate
    let ring1: THREE.Mesh | null = null;
    let ring2: THREE.Mesh | null = null;
    let ring3: THREE.Mesh | null = null;
    let centralMesh: THREE.Mesh | null = null;
    let outerCage: THREE.Mesh | null = null;

    if (objectType === "gyroscope") {
      // 1. PRECISION GYROSCOPIC HORIZON (Watchmaker / Astronomical Instrument)
      // Inner Faceted Nucleus
      const coreGeo = new THREE.IcosahedronGeometry(1.2, 0);
      centralMesh = new THREE.Mesh(coreGeo, obsidianMat);
      masterGroup.add(centralMesh);

      // Outer delicate wireframe on core
      const coreWireGeo = new THREE.IcosahedronGeometry(1.24, 0);
      const coreWire = new THREE.Mesh(coreWireGeo, wireMat);
      masterGroup.add(coreWire);

      // Gimbal Ring 1 (Inner Titanium Gimbal)
      const ringGeo1 = new THREE.TorusGeometry(2.0, 0.045, 16, 120);
      ring1 = new THREE.Mesh(ringGeo1, platinumMat);
      ring1.rotation.x = Math.PI / 4;
      masterGroup.add(ring1);

      // Gimbal Ring 2 (Middle Equatorial Ring)
      const ringGeo2 = new THREE.TorusGeometry(2.7, 0.04, 16, 120);
      ring2 = new THREE.Mesh(ringGeo2, obsidianMat);
      ring2.rotation.y = Math.PI / 3;
      masterGroup.add(ring2);

      // Gimbal Ring 3 (Outer Horizon Ring)
      const ringGeo3 = new THREE.TorusGeometry(3.4, 0.035, 16, 120);
      ring3 = new THREE.Mesh(ringGeo3, platinumMat);
      ring3.rotation.z = Math.PI / 6;
      masterGroup.add(ring3);

    } else if (objectType === "prism") {
      // 2. ARCHITECTURAL CRYSTALLINE PRISM (Monolithic Diamond)
      const prismGeo = new THREE.OctahedronGeometry(2.4, 0);
      centralMesh = new THREE.Mesh(prismGeo, obsidianMat);
      masterGroup.add(centralMesh);

      const prismWireGeo = new THREE.OctahedronGeometry(2.48, 0);
      const prismWireMat = new THREE.MeshStandardMaterial({
        color: 0xd8d3c5,
        wireframe: true,
        roughness: 0.22,
        metalness: 0.95,
      });
      outerCage = new THREE.Mesh(prismWireGeo, prismWireMat);
      masterGroup.add(outerCage);

      const orbitGeo = new THREE.TorusGeometry(3.6, 0.025, 16, 100);
      ring1 = new THREE.Mesh(orbitGeo, platinumMat);
      ring1.rotation.x = Math.PI / 3;
      masterGroup.add(ring1);

    } else {
      // 3. MINIMALIST OBSIDIAN SPHERE & EQUATORIAL DISC
      const sphereGeo = new THREE.SphereGeometry(1.8, 64, 64);
      centralMesh = new THREE.Mesh(sphereGeo, obsidianMat);
      masterGroup.add(centralMesh);

      const discGeo = new THREE.TorusGeometry(3.0, 0.05, 16, 120);
      ring1 = new THREE.Mesh(discGeo, platinumMat);
      ring1.rotation.x = Math.PI / 2.5;
      masterGroup.add(ring1);

      const haloGeo = new THREE.TorusGeometry(3.6, 0.02, 16, 120);
      ring2 = new THREE.Mesh(haloGeo, wireMat);
      ring2.rotation.x = -Math.PI / 4;
      masterGroup.add(ring2);
    }

    // Atmospheric subtle dust particles
    const dustCount = 60;
    const dustPositions = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      dustPositions[i * 3] = (Math.random() - 0.5) * 14;
      dustPositions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      dustPositions[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPositions, 3));
    const dustMat = new THREE.PointsMaterial({
      color: 0x71717a,
      size: 0.035,
      transparent: true,
      opacity: 0.3,
    });
    const dustPoints = new THREE.Points(dustGeo, dustMat);
    scene.add(dustPoints);

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.55);
    scene.add(ambientLight);

    const warmLight = new THREE.DirectionalLight(0xfff6ec, 2.4);
    warmLight.position.set(6, 7, 6);
    scene.add(warmLight);

    const coolRimLight = new THREE.DirectionalLight(0xdde8fc, 1.6);
    coolRimLight.position.set(-6, -4, -4);
    scene.add(coolRimLight);

    // Mouse Interaction
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const nx = (event.clientX / innerWidth) * 2 - 1;
      const ny = -(event.clientY / innerHeight) * 2 + 1;
      targetX = nx * 0.4;
      targetY = ny * 0.3;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      // Independent multi-axis rotations
      if (centralMesh) {
        centralMesh.rotation.y += delta * 0.15;
        centralMesh.rotation.x += delta * 0.08;
      }

      if (outerCage) {
        outerCage.rotation.y -= delta * 0.1;
        outerCage.rotation.z += delta * 0.07;
      }

      if (ring1) ring1.rotation.z += delta * 0.18;
      if (ring2) ring2.rotation.x -= delta * 0.14;
      if (ring3) ring3.rotation.y += delta * 0.12;

      // Mouse Lerp Damping
      masterGroup.rotation.y += (targetX - masterGroup.rotation.y) * 0.035;
      masterGroup.rotation.x += (-targetY - masterGroup.rotation.x) * 0.035;

      // Subtle breathing float
      masterGroup.position.y = Math.sin(clock.getElapsedTime() * 0.6) * 0.12;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      obsidianMat.dispose();
      platinumMat.dispose();
      wireMat.dispose();
      dustGeo.dispose();
      dustMat.dispose();
    };
  }, [objectType]);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full pointer-events-none select-none z-0"
      style={{ opacity: 0.9 }}
    />
  );
}
