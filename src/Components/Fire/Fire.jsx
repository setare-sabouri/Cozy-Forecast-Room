import { useRef, useLayoutEffect, useEffect } from 'react'
import { extend, useFrame, useLoader } from '@react-three/fiber'
import * as THREE from 'three'
import glsl from 'babel-plugin-glsl/macro'
import gsap from 'gsap'

// ✅ Shader Material
class VolumetricMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      defines: { ITERATIONS: '10', OCTIVES: '3' },
      uniforms: {
        effectTex: { type: 't', value: null },
        color: { type: 'c', value: null },
        time: { type: 'f', value: 0.0 },
        seed: { type: 'f', value: 0.0 },
        invModelMatrix: { type: 'm4', value: null },
        scale: { type: 'v3', value: null },
        noiseScale: { type: 'v4', value: new THREE.Vector4(1, 2, 1, 0.3) },
        magnitude: { type: 'f', value: 2.5 },
        lacunarity: { type: 'f', value: 3.0 },
        gain: { type: 'f', value: 0.6 },
        speed: { type: 'f', value: 1.0 },
        opacity: { type: 'f', value: 1.0 },
      },
      vertexShader: `
        varying vec3 vWorldPos;
        void main() {
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;
        }`,
      fragmentShader: glsl`
        #pragma glslify: snoise = require(glsl-noise/simplex/3d.glsl)
        uniform vec3 color;
        uniform float time;
        uniform float seed;
        uniform float speed;
        uniform float opacity;
        uniform mat4 invModelMatrix;
        uniform vec3 scale;
        uniform vec4 noiseScale;
        uniform float magnitude;
        uniform float lacunarity;
        uniform float gain;
        uniform sampler2D effectTex;
        varying vec3 vWorldPos;

        float turbulence(vec3 p) {
          float sum = 0.0;
          float freq = 1.0;
          float amp = 1.0;
          for(int i = 0; i < OCTIVES; i++) {
            sum += abs(snoise(p * freq)) * amp;
            freq *= lacunarity;
            amp *= gain;
          }
          return sum;
        }

        vec4 samplerEffect(vec3 p, vec4 scale) {
          vec2 st = vec2(sqrt(dot(p.xz, p.xz)), p.y);
          if(st.x <= 0.0 || st.x >= 1.0 || st.y <= 0.0 || st.y >= 1.0) return vec4(0.0);
          p.y -= (seed + time * speed) * scale.w;
          p *= scale.xyz;
          st.y += sqrt(st.y) * magnitude * turbulence(p);
          if(st.y <= 0.0 || st.y >= 1.0) return vec4(0.0);
          return texture2D(effectTex, st);
        }

        vec3 localize(vec3 p) {
          return (invModelMatrix * vec4(p, 1.0)).xyz;
        }

        void main() {
          vec3 rayPos = vWorldPos;
          vec3 rayDir = normalize(rayPos - cameraPosition);
          float rayLen = 0.0288 * length(scale.xyz);
          vec4 col = vec4(0.0);
          for(int i = 0; i < ITERATIONS; i++) {
            rayPos += rayDir * rayLen;
            vec3 lp = localize(rayPos);
            lp.y += 0.5;
            lp.xz *= 2.0;
            col += samplerEffect(lp, noiseScale);
          }
          col.a = col.r * opacity;
          gl_FragColor = vec4(col.rgb * color, col.a);
        }`
    })
  }
}

extend({ VolumetricMaterial })

// ✅ Reusable Volumetric Fire Component
export default function VolumetricEffect({
  color = new THREE.Color(0xffffff),
  texturePath = '/Textures/fire.png',
  texture, // optional: preloaded THREE.Texture
  magnitude = 2.5,
  lacunarity = 3.0,
  gain = 0.6,
  speed = 1.0,
  opacity = 1.0,
  position = [0, 0, 0],
  scale = [1, 1, 1],
  ...props
}) {
  const ref = useRef()
  const tex = texture || useLoader(THREE.TextureLoader, texturePath)

  useFrame((state) => {
    if (!ref.current) return
    const mat = ref.current.material
    const invModelMatrix = mat.uniforms.invModelMatrix.value
    ref.current.updateMatrixWorld()
    invModelMatrix.copy(ref.current.matrixWorld).invert()
    mat.uniforms.time.value = state.clock.elapsedTime
    mat.uniforms.invModelMatrix.value = invModelMatrix
    mat.uniforms.scale.value = ref.current.scale
  })

  useLayoutEffect(() => {
    tex.magFilter = tex.minFilter = THREE.LinearFilter
    tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping

    const mat = ref.current.material
    mat.uniforms.effectTex.value = tex
    mat.uniforms.color.value = color
    mat.uniforms.invModelMatrix.value = new THREE.Matrix4()
    mat.uniforms.scale.value = new THREE.Vector3(...scale)
    mat.uniforms.magnitude.value = magnitude
    mat.uniforms.lacunarity.value = lacunarity
    mat.uniforms.gain.value = gain
    mat.uniforms.speed.value = speed
    mat.uniforms.opacity.value = opacity
    mat.uniforms.seed.value = Math.random() * 19.19
  }, [tex, color, magnitude, lacunarity, gain, speed, opacity, scale])

  //  CLEANUP ON UNMOUNT
  useEffect(() => {
    return () => {
      if (tex) tex.dispose()
      if (ref.current) {
        if (ref.current.geometry) ref.current.geometry.dispose()
        if (ref.current.material) ref.current.material.dispose()
      }
    }
  }, [tex])

  const handleClick=(e)=>{
     if (!ref.current) return
    const mat = ref.current.material
    gsap.to(mat.uniforms.magnitude, { value: 10, duration: 0.5, yoyo: true, repeat: 1 })
   
  }

  return (
    <mesh ref={ref} position={position} scale={scale} {...props} onClick={handleClick}>
      <boxGeometry />
      <volumetricMaterial transparent depthWrite={false} depthTest={false} />
    </mesh>
  )
}
