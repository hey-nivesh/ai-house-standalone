"use client";
import React, { useRef, useMemo, useState, useCallback, Suspense, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Html, useTexture } from "@react-three/drei";
import {
    Vector3,
    Quaternion,
    Group,
    SphereGeometry,
    MeshBasicMaterial,
    CylinderGeometry,
    SRGBColorSpace,
    MeshStandardMaterial,
    Color,
    ShaderMaterial,
    BackSide
} from "three";
import { cn } from "@/lib/utils";

// ============================================================================
// Types
// ============================================================================

export interface GlobeMarker {
    lat: number;
    lng: number;
    src: string;
    label?: string;
    size?: number;
}

export interface Globe3DConfig {
    /** Globe radius */
    radius?: number;
    /** Globe base color (used as fallback or tint) */
    globeColor?: string;
    /** URL to the Earth texture map */
    textureUrl?: string;
    /** URL to the bump/elevation map for terrain */
    bumpMapUrl?: string;
    /** Whether to show atmosphere glow */
    showAtmosphere?: boolean;
    /** Atmosphere color */
    atmosphereColor?: string;
    /** Atmosphere intensity */
    atmosphereIntensity?: number;
    /** Atmosphere blur/softness (higher = more diffuse, default 3) */
    atmosphereBlur?: number;
    /** Terrain bump scale (0 = flat, higher = more pronounced) */
    bumpScale?: number;
    /** Auto rotate speed (0 = disabled) */
    autoRotateSpeed?: number;
    /** Enable zoom */
    enableZoom?: boolean;
    /** Enable pan */
    enablePan?: boolean;
    /** Min zoom distance */
    minDistance?: number;
    /** Max zoom distance */
    maxDistance?: number;
    /** Initial rotation */
    initialRotation?: { x: number; y: number };
    /** Marker default size */
    markerSize?: number;
    /** Show wireframe overlay */
    showWireframe?: boolean;
    /** Wireframe color */
    wireframeColor?: string;
    /** Ambient light intensity */
    ambientIntensity?: number;
    /** Point light intensity */
    pointLightIntensity?: number;
    /** Background color (null for transparent) */
    backgroundColor?: string | null;
}

interface Globe3DProps {
    /** Array of markers to display on the globe */
    markers?: GlobeMarker[];
    /** Globe configuration */
    config?: Globe3DConfig;
    /** Additional CSS classes */
    className?: string;
    /** Callback when a marker is clicked */
    onMarkerClick?: (marker: GlobeMarker) => void;
    /** Callback when a marker is hovered */
    onMarkerHover?: (marker: GlobeMarker | null) => void;
}

// ============================================================================
// Constants - Earth Texture URLs
// ============================================================================

const DEFAULT_EARTH_TEXTURE =
    "https://unpkg.com/three-globe@2.31.0/example/img/earth-blue-marble.jpg";
const DEFAULT_BUMP_TEXTURE =
    "https://unpkg.com/three-globe@2.31.0/example/img/earth-topology.png";

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Convert latitude/longitude to 3D cartesian coordinates
 */
function latLngToVector3(
    lat: number,
    lng: number,
    radius: number,
): Vector3 {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);

    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const z = radius * Math.sin(phi) * Math.sin(theta);
    const y = radius * Math.cos(phi);

    return new Vector3(x, y, z);
}

// ============================================================================
// Marker Component
// ============================================================================

interface MarkerProps {
    marker: GlobeMarker;
    radius: number;
    defaultSize: number;
    onClick?: (marker: GlobeMarker) => void;
    onHover?: (marker: GlobeMarker | null) => void;
}

function Marker({
    marker,
    radius,
    defaultSize,
    onClick,
    onHover,
}: MarkerProps) {
    const [hovered, setHovered] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const imageGroupRef = useRef<Group>(null);
    const { camera } = useThree();

    // Surface position (where the line starts)
    const surfacePosition = useMemo(() => {
        return latLngToVector3(marker.lat, marker.lng, radius * 1.001);
    }, [marker.lat, marker.lng, radius]);

    // Top of the line (where the image is)
    const topPosition = useMemo(() => {
        return latLngToVector3(marker.lat, marker.lng, radius * 1.18);
    }, [marker.lat, marker.lng, radius]);

    // Check if marker is facing the camera
    useFrame(() => {
        if (!imageGroupRef.current) return;

        const worldPos = new Vector3();
        imageGroupRef.current.getWorldPosition(worldPos);

        const markerDirection = worldPos.clone().normalize();
        const cameraDirection = camera.position.clone().normalize();
        const dot = markerDirection.dot(cameraDirection);

        setIsVisible(dot > 0.1);
    });

    const handlePointerEnter = useCallback(() => {
        setHovered(true);
        onHover?.(marker);
    }, [marker, onHover]);

    const handlePointerLeave = useCallback(() => {
        setHovered(false);
        onHover?.(null);
    }, [onHover]);

    const handleClick = useCallback(() => {
        onClick?.(marker);
    }, [marker, onClick]);

    const { lineCenter, lineQuaternion } = useMemo(() => {
        const center = surfacePosition.clone().lerp(topPosition, 0.5);
        const direction = topPosition.clone().sub(surfacePosition).normalize();
        const quaternion = new Quaternion();
        quaternion.setFromUnitVectors(new Vector3(0, 1, 0), direction);
        return { lineCenter: center, lineQuaternion: quaternion };
    }, [surfacePosition, topPosition]);

    return (
        <group>
            {/* Pin line */}
            <mesh position={lineCenter} quaternion={lineQuaternion}>
                <cylinderGeometry args={[0.005, 0.005, topPosition.distanceTo(surfacePosition), 8]} />
                <meshBasicMaterial color={hovered ? "#724e99" : "#e3d3f2"} transparent opacity={0.6} />
            </mesh>

            {/* Pin point */}
            <mesh position={surfacePosition}>
                <sphereGeometry args={[0.015, 16, 16]} />
                <meshBasicMaterial color="#724e99" />
            </mesh>

            {/* Circular image */}
            <group position={topPosition} ref={imageGroupRef}>
                <Html
                    center
                    distanceFactor={10}
                    className={cn(
                        "pointer-events-auto transition-opacity duration-300",
                        isVisible ? "opacity-100" : "opacity-0 invisible"
                    )}
                >
                    <div
                        className="relative group cursor-pointer"
                        onMouseEnter={handlePointerEnter}
                        onMouseLeave={handlePointerLeave}
                        onClick={handleClick}
                    >
                        <div
                            className={cn(
                                "w-10 h-10 rounded-full border-2 p-0.5 bg-white transition-all duration-300 transform",
                                hovered ? "scale-125 border-[#724e99] shadow-lg" : "scale-100 border-[#eadff5]"
                            )}
                        >
                            <img
                                src={marker.src}
                                alt={marker.label}
                                className="w-full h-full rounded-full object-cover"
                            />
                        </div>
                        {marker.label && (
                            <div
                                className={cn(
                                    "absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 bg-white/90 backdrop-blur-sm rounded text-[10px] font-bold text-[#1a1a1a] whitespace-nowrap border border-[#eadff5] transition-opacity duration-300 shadow-sm",
                                    hovered ? "opacity-100" : "opacity-0"
                                )}
                            >
                                {marker.label}
                            </div>
                        )}
                    </div>
                </Html>
            </group>
        </group>
    );
}

// ============================================================================
// Rotating Globe
// ============================================================================

interface RotatingGlobeProps {
    config: Required<Globe3DConfig>;
    markers: GlobeMarker[];
    onMarkerClick?: (marker: GlobeMarker) => void;
    onMarkerHover?: (marker: GlobeMarker | null) => void;
}

function RotatingGlobe({
    config,
    markers,
    onMarkerClick,
    onMarkerHover,
}: RotatingGlobeProps) {
    const groupRef = useRef<Group>(null);

    const [earthTexture, bumpTexture] = useTexture([
        config.textureUrl || DEFAULT_EARTH_TEXTURE,
        config.bumpMapUrl || DEFAULT_BUMP_TEXTURE,
    ]);

    useEffect(() => {
        if (earthTexture) {
            earthTexture.colorSpace = SRGBColorSpace;
            earthTexture.anisotropy = 16;
        }
    }, [earthTexture]);

    useFrame((state, delta) => {
        if (groupRef.current && config.autoRotateSpeed > 0) {
            groupRef.current.rotation.y += delta * config.autoRotateSpeed;
        }
    });

    return (
        <group ref={groupRef}>
            <mesh castShadow receiveShadow>
                <sphereGeometry args={[config.radius, 64, 64]} />
                <meshStandardMaterial
                    color={config.globeColor}
                    map={earthTexture}
                    bumpMap={bumpTexture}
                    bumpScale={config.bumpScale}
                    roughness={0.4}
                    metalness={0.1}
                    emissive="#724e99"
                    emissiveIntensity={0.15}
                />
            </mesh>

            {config.showWireframe && (
                <mesh scale={[1.002, 1.002, 1.002]}>
                    <sphereGeometry args={[config.radius, 32, 32]} />
                    <meshBasicMaterial color={config.wireframeColor} wireframe transparent opacity={0.1} />
                </mesh>
            )}

            {markers.map((marker, index) => (
                <Marker
                    key={`${marker.lat}-${marker.lng}-${index}`}
                    marker={marker}
                    radius={config.radius}
                    defaultSize={config.markerSize}
                    onClick={onMarkerClick}
                    onHover={onMarkerHover}
                />
            ))}
        </group>
    );
}

// ============================================================================
// Atmosphere
// ============================================================================

function Atmosphere({ radius, color, intensity, blur }: { radius: number; color: string; intensity: number; blur: number }) {
    const fresnelPower = Math.max(0.5, 5 - blur);

    const atmosphereMaterial = useMemo(() => {
        return new ShaderMaterial({
            uniforms: {
                atmosphereColor: { value: new Color(color) },
                intensity: { value: intensity },
                fresnelPower: { value: fresnelPower },
            },
            vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
            fragmentShader: `
        uniform vec3 atmosphereColor;
        uniform float intensity;
        uniform float fresnelPower;
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          float fresnel = pow(1.0 - abs(dot(vNormal, normalize(-vPosition))), fresnelPower);
          gl_FragColor = vec4(atmosphereColor, fresnel * intensity);
        }
      `,
            side: BackSide,
            transparent: true,
            depthWrite: false,
        });
    }, [color, intensity, fresnelPower]);

    return (
        <mesh scale={[1.15, 1.15, 1.15]}>
            <sphereGeometry args={[radius, 64, 64]} />
            <primitive object={atmosphereMaterial} attach="material" />
        </mesh>
    );
}

// ============================================================================
// Scene
// ============================================================================

interface SceneProps {
    markers: GlobeMarker[];
    config: Required<Globe3DConfig>;
    onMarkerClick?: (marker: GlobeMarker) => void;
    onMarkerHover?: (marker: GlobeMarker | null) => void;
}

function Scene({ markers, config, onMarkerClick, onMarkerHover }: SceneProps) {
    const { camera } = useThree();

    useEffect(() => {
        camera.position.set(0, 0, config.radius * 3.5);
        camera.lookAt(0, 0, 0);
    }, [camera, config.radius]);

    return (
        <>
            <ambientLight intensity={config.ambientIntensity} />
            <pointLight position={[5, 5, 10]} intensity={config.pointLightIntensity} color="#ffffff" />
            <pointLight position={[-5, -5, -10]} intensity={0.5} color={config.atmosphereColor} />

            <RotatingGlobe
                config={config}
                markers={markers}
                onMarkerClick={onMarkerClick}
                onMarkerHover={onMarkerHover}
            />

            {config.showAtmosphere && (
                <Atmosphere
                    radius={config.radius}
                    color={config.atmosphereColor}
                    intensity={config.atmosphereIntensity}
                    blur={config.atmosphereBlur}
                />
            )}

            <OrbitControls
                enableZoom={config.enableZoom}
                enablePan={config.enablePan}
                minDistance={config.minDistance}
                maxDistance={config.maxDistance}
                autoRotate={false}
                enableDamping
                dampingFactor={0.1}
            />
        </>
    );
}

// ============================================================================
// Main Component
// ============================================================================

const defaultConfig: Required<Globe3DConfig> = {
    radius: 2.5,
    globeColor: "#ffffff", // Changed to white for max brightness
    textureUrl: DEFAULT_EARTH_TEXTURE,
    bumpMapUrl: DEFAULT_BUMP_TEXTURE,
    showAtmosphere: false, // Disabled as requested
    atmosphereColor: "#724e99",
    atmosphereIntensity: 0,
    atmosphereBlur: 3,
    bumpScale: 1.0,
    autoRotateSpeed: 0.4,
    enableZoom: false,
    enablePan: false,
    minDistance: 5,
    maxDistance: 15,
    initialRotation: { x: 0, y: 0 },
    markerSize: 0.08,
    showWireframe: false, // Disabled as requested
    wireframeColor: "transparent",
    ambientIntensity: 5.0, // Significant boost
    pointLightIntensity: 10.0, // Significant boost
    backgroundColor: null,
};

export function Globe3D({
    markers = [],
    config = {},
    className,
    onMarkerClick,
    onMarkerHover,
}: Globe3DProps) {
    const mergedConfig = useMemo(
        () => ({ ...defaultConfig, ...config }),
        [config]
    );

    return (
        <div className={cn("relative", className)}>
            <Canvas
                shadows
                camera={{ fov: 45 }}
                gl={{ antialias: true, alpha: true }}
                style={{ background: mergedConfig.backgroundColor || "transparent" }}
            >
                <Suspense fallback={null}>
                    <Scene
                        markers={markers}
                        config={mergedConfig}
                        onMarkerClick={onMarkerClick}
                        onMarkerHover={onMarkerHover}
                    />
                </Suspense>
            </Canvas>
        </div>
    );
}

export default Globe3D;
