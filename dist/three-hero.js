/* A quiet WebGL layer for the hero: an arch, soft rings and a few particles.
   There is no self-rotating flower anymore; the scene only responds to page
   scroll so the supplied decor photography remains the focus. */
const canvas = document.querySelector('#hero-webgl');
const hero = document.querySelector('#home');

if (canvas && hero && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const boot = async () => {
    let THREE;
    try {
      THREE = await import('https://cdn.jsdelivr.net/npm/three@0.169.0/build/three.module.js');
    } catch {
      canvas.hidden = true;
      return;
    }

    const gl = canvas.getContext('webgl2', { alpha: true, antialias: true })
      || canvas.getContext('webgl', { alpha: true, antialias: true });
    if (!gl) {
      canvas.hidden = true;
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 100);
    camera.position.set(0, 0, 6.3);
    const renderer = new THREE.WebGLRenderer({ canvas, context: gl, alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;

    scene.add(new THREE.HemisphereLight(0xfff5df, 0x4b0a1f, 1.6));
    const key = new THREE.DirectionalLight(0xffe3ad, 2.5);
    key.position.set(-3, 4, 5);
    scene.add(key);

    const group = new THREE.Group();
    const mobile = window.matchMedia('(max-width: 760px)').matches;
    group.position.set(mobile ? -0.78 : -1.06, 0.03, 0.15);
    group.scale.setScalar(mobile ? 0.66 : 0.8);
    scene.add(group);

    const gold = new THREE.MeshPhysicalMaterial({ color: 0xe7b76b, metalness: 0.78, roughness: 0.24, clearcoat: 0.7, transparent: true, opacity: 0.72 });
    const rose = new THREE.MeshBasicMaterial({ color: 0xa9475c, transparent: true, opacity: 0.14, depthWrite: false });

    const arch = new THREE.Mesh(new THREE.TorusGeometry(1.28, 0.045, 12, 96, Math.PI), gold);
    arch.rotation.z = Math.PI;
    arch.position.y = 0.28;
    group.add(arch);
    const leg = new THREE.CylinderGeometry(0.045, 0.045, 1.16, 16);
    const leftLeg = new THREE.Mesh(leg, gold);
    const rightLeg = new THREE.Mesh(leg, gold);
    leftLeg.position.set(-1.28, -0.31, 0);
    rightLeg.position.set(1.28, -0.31, 0);
    group.add(leftLeg, rightLeg);

    const halo = new THREE.Mesh(new THREE.RingGeometry(1.38, 1.42, 96), rose);
    halo.rotation.x = Math.PI / 2.25;
    halo.position.z = -0.18;
    group.add(halo);

    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(54 * 3);
    for (let i = 0; i < positions.length; i += 3) {
      const radius = 1.25 + Math.random() * 1.35;
      const angle = Math.random() * Math.PI * 2;
      positions[i] = Math.cos(angle) * radius;
      positions[i + 1] = (Math.random() - 0.5) * 2.6;
      positions[i + 2] = Math.sin(angle) * radius * 0.42;
    }
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particles = new THREE.Points(particleGeometry, new THREE.PointsMaterial({ color: 0xf3ca80, size: 0.028, transparent: true, opacity: 0.46, sizeAttenuation: true }));
    scene.add(particles);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const width = Math.max(rect.width, 1);
      const height = Math.max(rect.height, 1);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.render(scene, camera);
    };
    const renderAtScroll = () => {
      const progress = Math.max(0, Math.min(1, window.scrollY / Math.max(hero.offsetHeight, 1)));
      group.position.y = 0.03 - progress * 0.38;
      group.position.x = (mobile ? -0.78 : -1.06) + progress * 0.16;
      group.rotation.z = progress * 0.045;
      particles.position.y = progress * 0.18;
      renderer.render(scene, camera);
    };

    addEventListener('resize', resize, { passive: true });
    addEventListener('scroll', renderAtScroll, { passive: true });
    resize();
    renderAtScroll();
  };
  boot();
}
