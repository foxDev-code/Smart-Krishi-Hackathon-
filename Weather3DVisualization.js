import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const Weather3DVisualization = ({ weatherData }) => {
  const mountRef = useRef(null);
  const [particleSystems, setParticleSystems] = useState([]);

  useEffect(() => {
    // Create scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f8ff);
    scene.fog = new THREE.Fog(0xf0f8ff, 10, 20);

    // Create camera
    const camera = new THREE.PerspectiveCamera(75, 400 / 300, 0.1, 1000);
    camera.position.z = 8;

    // Create renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(400, 300);
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Clear previous canvas if exists
    if (mountRef.current) {
      mountRef.current.innerHTML = '';
      mountRef.current.appendChild(renderer.domElement);
    }

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    scene.add(directionalLight);

    // Add hemisphere light for more natural lighting
    const hemisphereLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 0.3);
    scene.add(hemisphereLight);

    // Create ground
    const groundGeometry = new THREE.PlaneGeometry(20, 20);
    const groundMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x8bc34a,
      roughness: 0.8,
      metalness: 0.2
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -3;
    ground.receiveShadow = true;
    scene.add(ground);

    // Create weather visualization based on data
    let weatherObject = null;
    let newParticleSystems = [];

    if (weatherData && weatherData.current) {
      const temp = weatherData.current.temp || 25;
      const humidity = weatherData.current.humidity || 50;
      const windSpeed = weatherData.current.wind_speed || 5;
      
      // Create temperature sphere with pulsing effect
      const size = Math.max(0.8, Math.min(2.5, temp / 25)); // Normalize size
      const geometry = new THREE.SphereGeometry(size, 32, 32);
      
      // Color based on temperature with gradient
      let color;
      if (temp < 10) color = 0x1e88e5; // Cold - Blue
      else if (temp < 20) color = 0x43a047; // Mild - Green
      else if (temp < 30) color = 0xffb300; // Warm - Yellow
      else color = 0xe53935; // Hot - Red
      
      const material = new THREE.MeshStandardMaterial({ 
        color: color,
        emissive: color,
        emissiveIntensity: 0.2,
        roughness: 0.3,
        metalness: 0.7,
        transparent: true,
        opacity: 0.9
      });
      
      const sphere = new THREE.Mesh(geometry, material);
      sphere.position.y = 1;
      sphere.castShadow = true;
      scene.add(sphere);
      weatherObject = sphere;

      // Add atmospheric glow
      const glowGeometry = new THREE.SphereGeometry(size * 1.2, 32, 32);
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.3
      });
      const glowSphere = new THREE.Mesh(glowGeometry, glowMaterial);
      glowSphere.position.y = 1;
      scene.add(glowSphere);

      // Add precipitation particles if needed
      if (weatherData.current.rain) {
        const particleCount = Math.min(500, (weatherData.current.rain['1h'] || 0) * 50);
        const rainGeometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const velocities = new Float32Array(particleCount * 3);
        
        for (let i = 0; i < particleCount * 3; i += 3) {
          positions[i] = (Math.random() - 0.5) * 20; // x
          positions[i + 1] = Math.random() * 15 + 5; // y
          positions[i + 2] = (Math.random() - 0.5) * 20; // z
          
          velocities[i] = (Math.random() - 0.5) * windSpeed * 0.1; // x velocity
          velocities[i + 1] = -Math.random() * 2 - 1; // y velocity (falling)
          velocities[i + 2] = (Math.random() - 0.5) * windSpeed * 0.1; // z velocity
        }
        
        rainGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const rainMaterial = new THREE.PointsMaterial({
          color: 0x1e88e5,
          size: 0.1,
          transparent: true,
          opacity: 0.7
        });
        
        const rainSystem = new THREE.Points(rainGeometry, rainMaterial);
        rainSystem.userData = { velocities: velocities, positions: positions };
        scene.add(rainSystem);
        newParticleSystems.push(rainSystem);
      }
      
      // Add snow particles for cold weather
      if (temp < 5) {
        const snowCount = Math.min(300, humidity * 5);
        const snowGeometry = new THREE.BufferGeometry();
        const positions = new Float32Array(snowCount * 3);
        const velocities = new Float32Array(snowCount * 3);
        
        for (let i = 0; i < snowCount * 3; i += 3) {
          positions[i] = (Math.random() - 0.5) * 20; // x
          positions[i + 1] = Math.random() * 15 + 5; // y
          positions[i + 2] = (Math.random() - 0.5) * 20; // z
          
          velocities[i] = (Math.random() - 0.5) * 0.2; // x velocity
          velocities[i + 1] = -Math.random() * 0.5 - 0.1; // y velocity (falling slowly)
          velocities[i + 2] = (Math.random() - 0.5) * 0.2; // z velocity
        }
        
        snowGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const snowMaterial = new THREE.PointsMaterial({
          color: 0xffffff,
          size: 0.2,
          transparent: true,
          opacity: 0.8
        });
        
        const snowSystem = new THREE.Points(snowGeometry, snowMaterial);
        snowSystem.userData = { velocities: velocities, positions: positions };
        scene.add(snowSystem);
        newParticleSystems.push(snowSystem);
      }
      
      // Add fog for high humidity
      if (humidity > 70) {
        const fogCount = Math.min(100, (humidity - 70) * 5);
        const fogGeometry = new THREE.BufferGeometry();
        const positions = new Float32Array(fogCount * 3);
        
        for (let i = 0; i < fogCount * 3; i += 3) {
          positions[i] = (Math.random() - 0.5) * 20; // x
          positions[i + 1] = Math.random() * 5; // y
          positions[i + 2] = (Math.random() - 0.5) * 20; // z
        }
        
        fogGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const fogMaterial = new THREE.PointsMaterial({
          color: 0xdddddd,
          size: 0.5,
          transparent: true,
          opacity: 0.4
        });
        
        const fogSystem = new THREE.Points(fogGeometry, fogMaterial);
        scene.add(fogSystem);
        newParticleSystems.push(fogSystem);
      }
      
      // Add wind effect particles
      if (windSpeed > 10) {
        const windCount = Math.min(200, windSpeed * 5);
        const windGeometry = new THREE.BufferGeometry();
        const positions = new Float32Array(windCount * 3);
        
        for (let i = 0; i < windCount * 3; i += 3) {
          positions[i] = (Math.random() - 0.5) * 20; // x
          positions[i + 1] = Math.random() * 10; // y
          positions[i + 2] = (Math.random() - 0.5) * 20; // z
        }
        
        windGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const windMaterial = new THREE.PointsMaterial({
          color: 0xaaaaaa,
          size: 0.1,
          transparent: true,
          opacity: 0.3
        });
        
        const windSystem = new THREE.Points(windGeometry, windMaterial);
        scene.add(windSystem);
        newParticleSystems.push(windSystem);
      }
    } else {
      // Default visualization
      const geometry = new THREE.SphereGeometry(1.5, 32, 32);
      const material = new THREE.MeshStandardMaterial({ 
        color: 0x43a047,
        emissive: 0x43a047,
        emissiveIntensity: 0.2,
        roughness: 0.3,
        metalness: 0.7,
        transparent: true,
        opacity: 0.9
      });
      const sphere = new THREE.Mesh(geometry, material);
      sphere.position.y = 1;
      sphere.castShadow = true;
      scene.add(sphere);
      weatherObject = sphere;
      
      // Add atmospheric glow
      const glowGeometry = new THREE.SphereGeometry(1.8, 32, 32);
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0x43a047,
        transparent: true,
        opacity: 0.3
      });
      const glowSphere = new THREE.Mesh(glowGeometry, glowMaterial);
      glowSphere.position.y = 1;
      scene.add(glowSphere);
    }
    
    setParticleSystems(newParticleSystems);

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Rotate weather object
      if (weatherObject) {
        weatherObject.rotation.x += 0.005;
        weatherObject.rotation.y += 0.008;
        
        // Pulsing effect
        const scale = 1 + Math.sin(Date.now() * 0.002) * 0.05;
        weatherObject.scale.set(scale, scale, scale);
      }
      
      // Update particle systems
      particleSystems.forEach(system => {
        if (system.userData.velocities && system.geometry.attributes.position) {
          const positions = system.geometry.attributes.position.array;
          const velocities = system.userData.velocities;
          
          for (let i = 0; i < positions.length; i += 3) {
            positions[i] += velocities[i];
            positions[i + 1] += velocities[i + 1];
            positions[i + 2] += velocities[i + 2];
            
            // Reset particles that fall below ground
            if (positions[i + 1] < -3) {
              positions[i] = (Math.random() - 0.5) * 20;
              positions[i + 1] = Math.random() * 15 + 5;
              positions[i + 2] = (Math.random() - 0.5) * 20;
            }
          }
          
          system.geometry.attributes.position.needsUpdate = true;
        }
      });
      
      // Rotate camera slowly around the scene
      const time = Date.now() * 0.0005;
      camera.position.x = Math.sin(time) * 8;
      camera.position.z = Math.cos(time) * 8;
      camera.lookAt(0, 0, 0);
      
      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = 400 / 300;
      camera.updateProjectionMatrix();
      renderer.setSize(400, 300);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [weatherData, particleSystems]);

  return (
    <div>
      <h3>3D Weather Visualization</h3>
      <div 
        ref={mountRef} 
        style={{ 
          width: 400, 
          height: 300, 
          margin: '0 auto',
          border: '1px solid #ddd',
          borderRadius: 8,
          overflow: 'hidden',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
        }}
      />
      {weatherData && weatherData.current && (
        <div style={{ textAlign: 'center', marginTop: 15, padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
            <div>
              <strong>🌡️ Temperature:</strong> {weatherData.current.temp}°C
            </div>
            <div>
              <strong>💧 Humidity:</strong> {weatherData.current.humidity}%
            </div>
            <div>
              <strong>💨 Wind:</strong> {weatherData.current.wind_speed} km/h
            </div>
            {weatherData.current.rain && (
              <div>
                <strong>🌧️ Rain:</strong> {weatherData.current.rain['1h']}mm
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather3DVisualization;