import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { inSphere } from 'maath/random';

type PointsRef = {
  geometry: {
    attributes: {
      position: {
        array: Float32Array;
        needsUpdate: boolean;
      };
    };
  };
};

const PARTICLE_COUNT = 4000;
const INTERACTION_RADIUS = 0.5;

const ParticleField = (props: Record<string, unknown>) => {
  const ref = useRef<PointsRef | null>(null);

  const basePositions = useMemo(
    () => inSphere(new Float32Array(PARTICLE_COUNT * 3), { radius: 1.9 }),
    []
  );

  const positions = useMemo(() => new Float32Array(basePositions), [basePositions]);
  const velocities = useRef(new Float32Array(PARTICLE_COUNT * 3));

  useFrame((state, delta) => {
    const points = ref.current;
    if (!points) {
      return;
    }

    const mouseX = state.pointer.x * 2.15;
    const mouseY = state.pointer.y * 2.15;

    for (let i = 0; i < PARTICLE_COUNT; i += 1) {
      const idx = i * 3;
      const baseX = basePositions[idx];
      const baseY = basePositions[idx + 1];
      const baseZ = basePositions[idx + 2];

      let x = positions[idx];
      let y = positions[idx + 1];
      let z = positions[idx + 2];

      const dx = x - mouseX;
      const dy = y - mouseY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < INTERACTION_RADIUS) {
        const force = (INTERACTION_RADIUS - distance) * 0.12;
        const inv = 1 / Math.max(distance, 0.0001);
        velocities.current[idx] += dx * inv * force;
        velocities.current[idx + 1] += dy * inv * force;
      }

      velocities.current[idx] += (baseX - x) * 0.06;
      velocities.current[idx + 1] += (baseY - y) * 0.06;
      velocities.current[idx + 2] += (baseZ - z) * 0.06;

      velocities.current[idx] *= 0.9;
      velocities.current[idx + 1] *= 0.9;
      velocities.current[idx + 2] *= 0.9;

      x += velocities.current[idx] * delta * 60;
      y += velocities.current[idx + 1] * delta * 60;
      z += velocities.current[idx + 2] * delta * 60;

      positions[idx] = x;
      positions[idx + 1] = y;
      positions[idx + 2] = z;
    }

    points.geometry.attributes.position.needsUpdate = true;

    (ref.current as unknown as { rotation: { x: number; y: number } }).rotation.x -= delta / 70;
    (ref.current as unknown as { rotation: { x: number; y: number } }).rotation.y -= delta / 85;
  });

  return (
    <Points ref={ref as never} positions={positions} stride={3} frustumCulled={false} {...props}>
      <PointMaterial
        transparent
        color="#59f3ff"
        size={0.012}
        sizeAttenuation
        depthWrite={false}
      />
    </Points>
  );
};

export default ParticleField;
