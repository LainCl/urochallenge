import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {
  ArrowLeft,
  Eye,
  RotateCcw,
  Sparkles,
  BookOpen,
  CheckCircle2,
  XCircle,
  Target,
  Layers,
  Info,
} from 'lucide-react';
import { ANATOMY_3D_PARTS, AnatomyPartInfo, AnatomySexMode } from '../../data/anatomy3dData';

type CameraPreset = 'full' | 'pelvis' | 'kidneys';

export const Anatomy3DPage: React.FC = () => {
  const navigate = useNavigate();
  const mountRef = useRef<HTMLDivElement | null>(null);

  const [sexMode, setSexMode] = useState<AnatomySexMode>('male');
  const [selectedPartId, setSelectedPartId] = useState<string>('prostate-peripheral');
  const [hoveredPartId, setHoveredPartId] = useState<string | null>(null);
  const [xrayMode, setXrayMode] = useState<boolean>(true);
  const [cameraPreset, setCameraPreset] = useState<CameraPreset>('full');

  // Interactive 3D Quiz Mode
  const [quizActive, setQuizActive] = useState<boolean>(false);
  const [quizTargetId, setQuizTargetId] = useState<string | null>(null);
  const [quizFeedback, setQuizFeedback] = useState<{
    correct: boolean;
    clickedName: string;
  } | null>(null);
  const [quizScore, setQuizScore] = useState({ correct: 0, total: 0 });

  const visibleParts = useMemo(
    () => ANATOMY_3D_PARTS.filter((p) => p.sex === 'both' || p.sex === sexMode),
    [sexMode]
  );

  const selectedPart: AnatomyPartInfo = useMemo(
    () =>
      visibleParts.find((p) => p.id === selectedPartId) ||
      visibleParts[0],
    [visibleParts, selectedPartId]
  );

  // Refs so Three.js event handlers always read latest state without re-creating the WebGL context
  const selectedRef = useRef(selectedPartId);
  const hoveredRef = useRef(hoveredPartId);
  const quizActiveRef = useRef(quizActive);
  const quizTargetRef = useRef(quizTargetId);
  const visiblePartsRef = useRef(visibleParts);

  useEffect(() => {
    selectedRef.current = selectedPartId;
  }, [selectedPartId]);

  useEffect(() => {
    hoveredRef.current = hoveredPartId;
  }, [hoveredPartId]);

  useEffect(() => {
    quizActiveRef.current = quizActive;
    quizTargetRef.current = quizTargetId;
  }, [quizActive, quizTargetId]);

  useEffect(() => {
    visiblePartsRef.current = visibleParts;
  }, [visibleParts]);

  // Ensure selectedPartId is valid when switching sex
  useEffect(() => {
    if (!visibleParts.some((p) => p.id === selectedPartId)) {
      setSelectedPartId(sexMode === 'male' ? 'prostate-peripheral' : 'uterus-vagina');
    }
    if (quizActive) {
      const next = visibleParts[Math.floor(Math.random() * visibleParts.length)];
      setQuizTargetId(next?.id || null);
      setQuizFeedback(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sexMode]);

  const controlsRef = useRef<OrbitControls | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const meshesByPartRef = useRef<Map<string, THREE.Mesh[]>>(new Map());
  const xrayMeshesRef = useRef<THREE.Mesh[]>([]);

  const applyCameraPreset = (preset: CameraPreset) => {
    setCameraPreset(preset);
    const cam = cameraRef.current;
    const ctrl = controlsRef.current;
    if (!cam || !ctrl) return;
    if (preset === 'full') {
      cam.position.set(0, 0.5, 11.5);
      ctrl.target.set(0, 0.2, 0);
    } else if (preset === 'kidneys') {
      cam.position.set(0, 3.0, 6.8);
      ctrl.target.set(0, 2.5, 0);
    } else {
      cam.position.set(2.8, -1.8, 5.6);
      ctrl.target.set(0, -2.3, 0);
    }
    ctrl.update();
  };

  // Build Three.js scene when sexMode changes
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 640;
    const height = container.clientHeight || 520;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#0E1324');

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0.5, 11.5);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.minDistance = 3.2;
    controls.maxDistance = 18;
    controls.target.set(0, 0.2, 0);
    controlsRef.current = controls;

    // Lighting setup
    scene.add(new THREE.AmbientLight('#ffffff', 0.85));
    const keyLight = new THREE.DirectionalLight('#ffffff', 1.4);
    keyLight.position.set(6, 10, 8);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight('#83D0E5', 0.8);
    rimLight.position.set(-7, 2, -6);
    scene.add(rimLight);

    const fillLight = new THREE.PointLight('#C3F574', 0.35, 25);
    fillLight.position.set(0, -5, 4);
    scene.add(fillLight);

    // Subtle anatomical grid floor reference
    const grid = new THREE.GridHelper(10, 14, '#2C3559', '#1B223D');
    grid.position.y = -4.9;
    scene.add(grid);

    const partMeshes = new Map<string, THREE.Mesh[]>();
    const xrayList: THREE.Mesh[] = [];
    const clickableMeshes: THREE.Mesh[] = [];

    const registerMesh = (
      partId: string,
      geometry: THREE.BufferGeometry,
      colorHex: string,
      options?: { transparent?: boolean; opacity?: number; isXrayShell?: boolean; shininess?: number }
    ) => {
      const mat = new THREE.MeshPhysicalMaterial({
        color: colorHex,
        roughness: 0.38,
        metalness: 0.05,
        clearcoat: 0.35,
        clearcoatRoughness: 0.3,
        transparent: Boolean(options?.transparent),
        opacity: options?.opacity ?? 1,
        depthWrite: !(options?.transparent && (options?.opacity ?? 1) < 0.7),
      });
      const mesh = new THREE.Mesh(geometry, mat);
      mesh.userData.partId = partId;
      scene.add(mesh);

      const list = partMeshes.get(partId) || [];
      list.push(mesh);
      partMeshes.set(partId, list);
      clickableMeshes.push(mesh);
      if (options?.isXrayShell) {
        xrayList.push(mesh);
      }
      return mesh;
    };

    // Helper for bean-shaped kidney
    const createKidneyMesh = (partId: string, x: number, y: number, color: string, flipX: number) => {
      const geo = new THREE.SphereGeometry(0.78, 32, 24);
      geo.scale(0.68, 1.32, 0.55);
      // Slight medial indentation at hilum
      const pos = geo.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const vx = pos.getX(i);
        const vy = pos.getY(i);
        if (vx * flipX < 0 && Math.abs(vy) < 0.55) {
          pos.setX(i, vx * 0.62);
        }
      }
      geo.computeVertexNormals();
      const mesh = registerMesh(partId, geo, color);
      mesh.position.set(x, y, 0);
      mesh.rotation.z = flipX * 0.14;
      return mesh;
    };

    // 1. Kidneys (Right slightly lower than Left due to liver!)
    createKidneyMesh('kidney-right', -1.55, 2.35, '#B84A52', -1);
    createKidneyMesh('kidney-left', 1.55, 2.75, '#C2525A', 1);

    // 2. Adrenal glands
    const adrRGeo = new THREE.ConeGeometry(0.36, 0.48, 16);
    const adrR = registerMesh('adrenals', adrRGeo, '#E5A93B');
    adrR.position.set(-1.35, 3.55, 0.05);
    adrR.rotation.z = 0.25;

    const adrLGeo = new THREE.SphereGeometry(0.32, 20, 16);
    adrLGeo.scale(1.15, 0.72, 0.7);
    const adrL = registerMesh('adrenals', adrLGeo, '#E5A93B');
    adrL.position.set(1.35, 3.92, 0.05);

    // 3. Great Vessels (Aorta & IVC + Renal vessels + Left gonadal vein)
    const aortaGeo = new THREE.CylinderGeometry(0.24, 0.21, 5.2, 20);
    const aorta = registerMesh('vessels-aorta-ivc', aortaGeo, '#D9383A');
    aorta.position.set(0.28, 1.9, -0.2);

    const ivcGeo = new THREE.CylinderGeometry(0.28, 0.25, 5.2, 20);
    const ivc = registerMesh('vessels-aorta-ivc', ivcGeo, '#3D6EC9');
    ivc.position.set(-0.34, 1.9, -0.15);

    // Renal arteries & veins
    const artRGeo = new THREE.CylinderGeometry(0.08, 0.08, 1.35, 12);
    artRGeo.rotateZ(Math.PI / 2);
    const artR = registerMesh('vessels-aorta-ivc', artRGeo, '#D9383A');
    artR.position.set(-0.6, 2.45, -0.15);

    const artLGeo = new THREE.CylinderGeometry(0.08, 0.08, 1.15, 12);
    artLGeo.rotateZ(Math.PI / 2);
    const artL = registerMesh('vessels-aorta-ivc', artLGeo, '#D9383A');
    artL.position.set(0.85, 2.75, -0.15);

    const veinRGeo = new THREE.CylinderGeometry(0.1, 0.1, 1.0, 12);
    veinRGeo.rotateZ(Math.PI / 2);
    const veinR = registerMesh('vessels-aorta-ivc', veinRGeo, '#3D6EC9');
    veinR.position.set(-0.85, 2.38, 0.08);

    const veinLGeo = new THREE.CylinderGeometry(0.1, 0.1, 1.7, 12);
    veinLGeo.rotateZ(Math.PI / 2);
    const veinL = registerMesh('vessels-aorta-ivc', veinLGeo, '#3D6EC9');
    veinL.position.set(0.55, 2.68, 0.08);

    // 4. Ureters (Curved tubes from renal pelvis to bladder trigone)
    const createUreter = (points: THREE.Vector3[]) => {
      const curve = new THREE.CatmullRomCurve3(points);
      const geo = new THREE.TubeGeometry(curve, 36, 0.075, 12, false);
      registerMesh('ureters', geo, '#E8C49A');
    };

    createUreter([
      new THREE.Vector3(-1.12, 2.25, -0.05),
      new THREE.Vector3(-1.02, 1.1, 0.05),
      new THREE.Vector3(-0.82, -0.35, 0.18),
      new THREE.Vector3(-0.46, -1.7, 0.08),
    ]);
    createUreter([
      new THREE.Vector3(1.12, 2.65, -0.05),
      new THREE.Vector3(1.02, 1.3, 0.05),
      new THREE.Vector3(0.82, -0.35, 0.18),
      new THREE.Vector3(0.46, -1.7, 0.08),
    ]);

    // 5. Urinary Bladder (with X-ray translucency option so Trigone is visible!)
    const bladderGeo = new THREE.SphereGeometry(1.05, 32, 24);
    bladderGeo.scale(1.05, 0.92, 0.95);
    const bladder = registerMesh('bladder', bladderGeo, '#D48166', {
      transparent: true,
      opacity: xrayMode ? 0.38 : 0.95,
      isXrayShell: true,
    });
    bladder.position.set(0, -1.65, 0.22);

    // 6. Bladder Trigone (inside posterior-inferior bladder)
    const trigoneShape = new THREE.Shape();
    trigoneShape.moveTo(-0.42, 0.35);
    trigoneShape.lineTo(0.42, 0.35);
    trigoneShape.lineTo(0, -0.45);
    trigoneShape.closePath();
    const trigoneGeo = new THREE.ExtrudeGeometry(trigoneShape, { depth: 0.08, bevelEnabled: true, bevelThickness: 0.03, bevelSize: 0.03 });
    const trigone = registerMesh('trigone', trigoneGeo, '#F26B6B');
    trigone.position.set(0, -1.85, -0.08);
    trigone.rotation.x = 0.35;

    // 7. Sex-Specific Lower Urinary & Genital Anatomy
    if (sexMode === 'male') {
      // Prostate Peripheral Zone (outer shell)
      const prostPerGeo = new THREE.SphereGeometry(0.62, 28, 22);
      prostPerGeo.scale(1.12, 0.88, 0.95);
      const prostPer = registerMesh('prostate-peripheral', prostPerGeo, '#6E64D8', {
        transparent: true,
        opacity: xrayMode ? 0.42 : 0.95,
        isXrayShell: true,
      });
      prostPer.position.set(0, -2.75, 0.18);

      // Prostate Transitional Zone (2 periurethral lobes inside)
      const transGeoL = new THREE.SphereGeometry(0.24, 20, 16);
      transGeoL.scale(0.85, 1.15, 0.9);
      const transL = registerMesh('prostate-transitional', transGeoL, '#C3F574');
      transL.position.set(-0.18, -2.7, 0.25);

      const transGeoR = new THREE.SphereGeometry(0.24, 20, 16);
      transGeoR.scale(0.85, 1.15, 0.9);
      const transR = registerMesh('prostate-transitional', transGeoR, '#C3F574');
      transR.position.set(0.18, -2.7, 0.25);

      // Seminal Vesicles & Vas Deferens
      const svLGeo = new THREE.CapsuleGeometry(0.16, 0.55, 8, 16);
      const svL = registerMesh('seminal-vesicles', svLGeo, '#5AA6D8');
      svL.position.set(0.55, -2.35, -0.35);
      svL.rotation.z = -0.65;
      svL.rotation.x = 0.25;

      const svRGeo = new THREE.CapsuleGeometry(0.16, 0.55, 8, 16);
      const svR = registerMesh('seminal-vesicles', svRGeo, '#5AA6D8');
      svR.position.set(-0.55, -2.35, -0.35);
      svR.rotation.z = 0.65;
      svR.rotation.x = 0.25;

      // Vas deferens tubes
      const vasCurveL = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0.42, -2.5, -0.25),
        new THREE.Vector3(0.78, -2.1, 0.1),
        new THREE.Vector3(0.62, -3.5, 0.62),
        new THREE.Vector3(0.45, -4.35, 0.35),
      ]);
      registerMesh('seminal-vesicles', new THREE.TubeGeometry(vasCurveL, 28, 0.04, 8, false), '#5AA6D8');

      const vasCurveR = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-0.42, -2.5, -0.25),
        new THREE.Vector3(-0.78, -2.1, 0.1),
        new THREE.Vector3(-0.62, -3.5, 0.62),
        new THREE.Vector3(-0.45, -4.35, 0.35),
      ]);
      registerMesh('seminal-vesicles', new THREE.TubeGeometry(vasCurveR, 28, 0.04, 8, false), '#5AA6D8');

      // Male Urethra & Corpora Cavernosa
      const urethraCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, -2.4, 0.22),
        new THREE.Vector3(0, -3.15, 0.22),
        new THREE.Vector3(0, -3.55, 0.52),
        new THREE.Vector3(0, -3.95, 1.35),
      ]);
      registerMesh('male-urethra-penis', new THREE.TubeGeometry(urethraCurve, 28, 0.09, 12, false), '#9C7AE0');

      const corpGeo = new THREE.CapsuleGeometry(0.18, 1.15, 8, 16);
      corpGeo.rotateX(Math.PI / 2.7);
      const corpL = registerMesh('male-urethra-penis', corpGeo, '#8E6CD0');
      corpL.position.set(0.14, -3.65, 0.9);
      const corpR = registerMesh('male-urethra-penis', corpGeo.clone(), '#8E6CD0');
      corpR.position.set(-0.14, -3.65, 0.9);

      // Testes & Epididymides
      const testisGeo = new THREE.SphereGeometry(0.32, 24, 20);
      testisGeo.scale(0.85, 1.25, 0.9);
      const testisL = registerMesh('testes', testisGeo, '#E6A08C');
      testisL.position.set(0.45, -4.45, 0.35);

      const testisR = registerMesh('testes', testisGeo.clone(), '#E6A08C');
      testisR.position.set(-0.45, -4.55, 0.35);
    } else {
      // Female Short Urethra (3-4 cm)
      const fUrethraGeo = new THREE.CylinderGeometry(0.085, 0.085, 0.85, 16);
      const fUrethra = registerMesh('female-urethra', fUrethraGeo, '#9C7AE0');
      fUrethra.position.set(0, -2.85, 0.42);
      fUrethra.rotation.x = 0.32;

      // Uterus, Cervix & Vagina (posterior to bladder, demonstrating ureter proximity)
      const uterusBodyGeo = new THREE.SphereGeometry(0.68, 28, 22);
      uterusBodyGeo.scale(1.05, 1.28, 0.72);
      const uterus = registerMesh('uterus-vagina', uterusBodyGeo, '#D86C9B');
      uterus.position.set(0, -1.65, -0.82);
      uterus.rotation.x = 0.52;

      const vaginaGeo = new THREE.CylinderGeometry(0.28, 0.25, 1.55, 20);
      const vagina = registerMesh('uterus-vagina', vaginaGeo, '#C95A8B');
      vagina.position.set(0, -2.75, -0.35);
      vagina.rotation.x = 0.38;

      // Pelvic Floor (Levator Ani hammock)
      const floorGeo = new THREE.TorusGeometry(1.35, 0.16, 12, 32, Math.PI * 1.1);
      floorGeo.rotateX(Math.PI / 2.2);
      const floor = registerMesh('pelvic-floor', floorGeo, '#6BB89A');
      floor.position.set(0, -3.25, -0.1);
    }

    meshesByPartRef.current = partMeshes;
    xrayMeshesRef.current = xrayList;

    // Raycasting for Click & Hover
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    let downX = 0;
    let downY = 0;

    const getHitPartId = (clientX: number, clientY: number): string | null => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(clickableMeshes, false);
      if (hits.length === 0) return null;
      return (hits[0].object.userData.partId as string) || null;
    };

    const onPointerDown = (e: PointerEvent) => {
      downX = e.clientX;
      downY = e.clientY;
    };

    const onPointerUp = (e: PointerEvent) => {
      const dist = Math.hypot(e.clientX - downX, e.clientY - downY);
      if (dist > 6) return; // Dragging camera, not a click
      const hitId = getHitPartId(e.clientX, e.clientY);
      if (!hitId) return;

      setSelectedPartId(hitId);
      if (quizActiveRef.current && quizTargetRef.current) {
        const partObj = visiblePartsRef.current.find((p) => p.id === hitId);
        const isCorrect = hitId === quizTargetRef.current;
        setQuizFeedback({
          correct: isCorrect,
          clickedName: partObj?.name || hitId,
        });
        setQuizScore((prev) => ({
          correct: prev.correct + (isCorrect ? 1 : 0),
          total: prev.total + 1,
        }));
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      const hitId = getHitPartId(e.clientX, e.clientY);
      setHoveredPartId(hitId);
      renderer.domElement.style.cursor = hitId ? 'pointer' : 'grab';
    };

    renderer.domElement.addEventListener('pointerdown', onPointerDown);
    renderer.domElement.addEventListener('pointerup', onPointerUp);
    renderer.domElement.addEventListener('pointermove', onPointerMove);

    // ResizeObserver
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 640;
      const h = container.clientHeight || 520;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Animation loop
    let frameId = 0;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      controls.update();

      // Update highlight emissive state
      const activeId = selectedRef.current;
      const hoverId = hoveredRef.current;
      meshesByPartRef.current.forEach((meshes, partId) => {
        const isSel = partId === activeId;
        const isHov = partId === hoverId;
        for (const m of meshes) {
          const mat = m.material as THREE.MeshPhysicalMaterial;
          if (isSel) {
            mat.emissive.set('#C3F574');
            mat.emissiveIntensity = 0.42;
          } else if (isHov) {
            mat.emissive.set('#83D0E5');
            mat.emissiveIntensity = 0.25;
          } else {
            mat.emissive.set('#000000');
            mat.emissiveIntensity = 0;
          }
        }
      });

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('pointerdown', onPointerDown);
      renderer.domElement.removeEventListener('pointerup', onPointerUp);
      renderer.domElement.removeEventListener('pointermove', onPointerMove);
      controls.dispose();
      renderer.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sexMode]);

  // Update X-ray transparency live without rebuilding the scene
  useEffect(() => {
    for (const mesh of xrayMeshesRef.current) {
      const mat = mesh.material as THREE.MeshPhysicalMaterial;
      mat.opacity = xrayMode ? 0.38 : 0.95;
      mat.depthWrite = !xrayMode;
      mat.needsUpdate = true;
    }
  }, [xrayMode]);

  const startQuiz3D = () => {
    setQuizActive(true);
    setQuizScore({ correct: 0, total: 0 });
    setQuizFeedback(null);
    const next = visibleParts[Math.floor(Math.random() * visibleParts.length)];
    setQuizTargetId(next?.id || null);
  };

  const nextQuizTarget = () => {
    const others = visibleParts.filter((p) => p.id !== quizTargetId);
    const next =
      others[Math.floor(Math.random() * others.length)] || visibleParts[0];
    setQuizTargetId(next?.id || null);
    setQuizFeedback(null);
  };

  const quizTargetPart = visibleParts.find((p) => p.id === quizTargetId) || null;
  const hoveredPart = visibleParts.find((p) => p.id === hoveredPartId) || null;

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate('/app')}
            className="w-10 h-10 rounded-full bg-white card-soft-shadow flex items-center justify-center text-[#202744] hover:text-[#5149B8] transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <span className="text-meta font-extrabold uppercase tracking-wider text-[#5149B8] block">
              Atlas Interactivo WebGL
            </span>
            <h1 className="text-lg sm:text-2xl font-extrabold text-[#202744]">
              Anatomía Urológica 3D
            </h1>
          </div>
        </div>

        {/* Sex Switcher + X-Ray + Quiz Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="bg-white p-1 rounded-full card-soft-shadow flex items-center">
            <button
              type="button"
              onClick={() => setSexMode('male')}
              className={`px-4 py-1.5 rounded-full text-xs font-extrabold transition cursor-pointer ${
                sexMode === 'male'
                  ? 'bg-[#5149B8] text-white'
                  : 'text-[#858BA1] hover:text-[#202744]'
              }`}
            >
              Masculina
            </button>
            <button
              type="button"
              onClick={() => setSexMode('female')}
              className={`px-4 py-1.5 rounded-full text-xs font-extrabold transition cursor-pointer ${
                sexMode === 'female'
                  ? 'bg-[#5149B8] text-white'
                  : 'text-[#858BA1] hover:text-[#202744]'
              }`}
            >
              Femenina
            </button>
          </div>

          <button
            type="button"
            onClick={() => setXrayMode((v) => !v)}
            className={`px-3.5 py-2 rounded-full text-xs font-extrabold flex items-center gap-1.5 transition cursor-pointer ${
              xrayMode
                ? 'bg-[#C3F574] text-[#202744] shadow-sm'
                : 'bg-white text-[#202744] card-soft-shadow'
            }`}
            title="Vuelve translúcidas la vejiga y la cápsula prostática para ver el trígono y la zona transicional"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{xrayMode ? 'Vista Translúcida ON' : 'Vista Sólida'}</span>
          </button>

          <button
            type="button"
            onClick={() => (quizActive ? setQuizActive(false) : startQuiz3D())}
            className={`px-3.5 py-2 rounded-full text-xs font-extrabold flex items-center gap-1.5 transition cursor-pointer ${
              quizActive
                ? 'bg-[#202744] text-[#C3F574]'
                : 'bg-[#5149B8] text-white shadow-sm hover:bg-[#41399e]'
            }`}
          >
            <Target className="w-3.5 h-3.5" />
            <span>{quizActive ? 'Salir de Modo Quiz 3D' : 'Quiz: Identifica en 3D'}</span>
          </button>
        </div>
      </div>

      {/* Quiz Banner */}
      {quizActive && quizTargetPart && (
        <div className="bg-gradient-to-r from-[#202744] to-[#5149B8] text-white rounded-[28px] p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg">
          <div className="space-y-1">
            <span className="text-meta font-extrabold uppercase tracking-wider text-[#C3F574] block">
              Desafío Anatómico 3D • Puntaje: {quizScore.correct}/{quizScore.total}
            </span>
            <h2 className="text-base sm:text-lg font-extrabold">
              Haz clic en el modelo 3D sobre: <span className="text-[#C3F574]">{quizTargetPart.name}</span>
            </h2>
            {quizFeedback && (
              <p className="text-xs flex items-center gap-1.5 font-bold">
                {quizFeedback.correct ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-[#C3F574]" />
                    <span>¡Correcto! Identificaste {quizFeedback.clickedName}.</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 text-rose-300" />
                    <span>Seleccionaste "{quizFeedback.clickedName}". Intenta ubicar {quizTargetPart.name}.</span>
                  </>
                )}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={nextQuizTarget}
            className="px-4 py-2.5 rounded-full bg-[#C3F574] text-[#202744] text-xs font-extrabold shrink-0 cursor-pointer"
          >
            Siguiente estructura →
          </button>
        </div>
      )}

      {/* Main 3D Viewport + Inspector Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: 3D Canvas */}
        <div className="lg:col-span-7 bg-[#0E1324] rounded-[32px] overflow-hidden border border-white/10 shadow-xl relative flex flex-col">
          {/* Camera presets */}
          <div className="px-4 py-3 bg-[#161D35] border-b border-white/10 flex flex-wrap items-center justify-between gap-2 text-white">
            <div className="flex items-center gap-1.5">
              {(
                [
                  ['full', 'Cuerpo Completo'],
                  ['kidneys', 'Riñones / Retroperitoneo'],
                  ['pelvis', sexMode === 'male' ? 'Pelvis / Próstata' : 'Pelvis Femenina'],
                ] as const
              ).map(([preset, lbl]) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => applyCameraPreset(preset)}
                  className={`px-3 py-1 rounded-full text-meta font-extrabold transition cursor-pointer ${
                    cameraPreset === preset
                      ? 'bg-[#C3F574] text-[#202744]'
                      : 'bg-white/10 text-white/80 hover:bg-white/20'
                  }`}
                >
                  {lbl}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => applyCameraPreset('full')}
              className="inline-flex items-center gap-1 text-meta font-bold text-white/75 hover:text-white cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reiniciar vista
            </button>
          </div>

          <div ref={mountRef} className="w-full h-[430px] sm:h-[520px] relative select-none" />

          {/* Floating hover tooltip + instructions */}
          <div className="px-4 py-2.5 bg-[#161D35] border-t border-white/10 flex items-center justify-between gap-2 text-meta text-white/80">
            <span>
              {hoveredPart ? (
                <strong className="text-[#C3F574]">Apuntando a: {hoveredPart.name}</strong>
              ) : (
                'Arrastra para rotar 360° • Rueda/pellizco para zoom • Clic para inspeccionar'
              )}
            </span>
            <span className="text-[#83D0E5] font-bold shrink-0">
              {sexMode === 'male' ? '♂ Masculino' : '♀ Femenino'}
            </span>
          </div>
        </div>

        {/* Right: Anatomical Part Inspector + Parts Selector */}
        <div className="lg:col-span-5 space-y-4">
          {/* Selected Part Detail Card */}
          <div className="bg-white rounded-[32px] p-5 sm:p-6 card-soft-shadow border border-white space-y-3.5">
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#5149B8]/10 text-[#5149B8] text-meta font-extrabold uppercase tracking-wider">
                  <Layers className="w-3 h-3" />
                  {selectedPart.zone}
                </span>
                <h2 className="text-lg font-extrabold text-[#202744] mt-1.5">
                  {selectedPart.name}
                </h2>
              </div>
              <span
                className="w-6 h-6 rounded-full border-2 border-white shadow-sm shrink-0 mt-1"
                style={{ backgroundColor: selectedPart.color }}
              />
            </div>

            <p className="text-xs sm:text-sm text-[#202744] leading-relaxed">
              {selectedPart.summary}
            </p>

            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-2xl bg-[#F5F7FC]">
                <strong className="text-[#5149B8] block mb-0.5">Irrigación y Drenaje:</strong>
                <span className="text-[#202744]">{selectedPart.vascular}</span>
              </div>
              <div className="p-3 rounded-2xl bg-[#F5F7FC]">
                <strong className="text-[#5149B8] block mb-0.5">Inervación:</strong>
                <span className="text-[#202744]">{selectedPart.innervation}</span>
              </div>
              <div className="p-3 rounded-2xl bg-[#C3F574]/30 border border-[#C3F574]/60">
                <strong className="text-[#202744] flex items-center gap-1 mb-0.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#5149B8]" /> Perla Clínica / Quirúrgica:
                </strong>
                <span className="text-[#202744]">{selectedPart.clinical_pearls}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                navigate(`/app/dictionary?q=${encodeURIComponent(selectedPart.dictionary_query)}`)
              }
              className="w-full py-2.5 px-4 rounded-full bg-[#5149B8]/10 hover:bg-[#5149B8] text-[#5149B8] hover:text-white text-xs font-extrabold flex items-center justify-center gap-1.5 transition cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Ver términos relacionados en el Diccionario</span>
            </button>
          </div>

          {/* Interactive Parts List */}
          <div className="bg-white rounded-[32px] p-5 card-soft-shadow border border-white space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#858BA1]">
                Estructuras y Zonas ({visibleParts.length})
              </h3>
              <Info className="w-3.5 h-3.5 text-[#858BA1]" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-1.5 max-h-[230px] overflow-y-auto pr-1">
              {visibleParts.map((part) => {
                const isSel = part.id === selectedPart.id;
                return (
                  <button
                    key={part.id}
                    type="button"
                    onClick={() => setSelectedPartId(part.id)}
                    className={`w-full text-left px-3.5 py-2.5 rounded-2xl text-xs font-bold flex items-center justify-between gap-2 transition cursor-pointer ${
                      isSel
                        ? 'bg-[#5149B8] text-white shadow-sm'
                        : 'bg-[#F5F7FC] text-[#202744] hover:bg-[#5149B8]/10'
                    }`}
                  >
                    <span className="flex items-center gap-2 min-w-0">
                      <span
                        className="w-3 h-3 rounded-full shrink-0"
                        style={{ backgroundColor: part.color }}
                      />
                      <span className="truncate">{part.name}</span>
                    </span>
                    <span
                      className={`text-meta shrink-0 ${
                        isSel ? 'text-[#C3F574]' : 'text-[#858BA1]'
                      }`}
                    >
                      {part.zone.split(' ')[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
