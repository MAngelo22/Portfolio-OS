import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { inSphere } from 'maath/random';

const ParticleField = (props: any) => {
  const ref = useRef<any>();
  const count = 7500; // Increased number of particles for density

  const particles = useMemo(() => {
    const positions = inSphere(new Float32Array(count * 3), { radius: 2 }); // Slightly larger radius
    return positions;
  }, [count]);

  useFrame((state, delta) => {
    if (ref.current) {
      // Adjust rotation speed if needed
      ref.current.rotation.x -= delta / 50;
      ref.current.rotation.y -= delta / 55;
    }
  });

  return (
    <Points ref={ref} positions={particles} stride={3} frustumCulled={false} {...props}>
      <PointMaterial
        transparent
        color="#0af" // More vibrant JARVIS-like blue/cyan
        size={0.015} // Slightly increased size
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  );
};

export default ParticleField; 