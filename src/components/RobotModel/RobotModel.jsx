import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'
import styles from './RobotModel.module.css'

const STL_PATH = '/Robot_Maker_Faire_65pc.stl'

export default function RobotModel() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    // Wait one frame to ensure the element has been laid out with real dimensions
    const init = () => {
      const width = mount.clientWidth || 400
      const height = mount.clientHeight || 400

      const scene = new THREE.Scene()

      const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)
      camera.position.set(0, 0, 4)

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      renderer.setSize(width, height)
      renderer.setPixelRatio(window.devicePixelRatio)
      renderer.setClearColor(0x000000, 0)
      mount.appendChild(renderer.domElement)

      const material = new THREE.LineBasicMaterial({
        color: 0xe8c53a,
        transparent: true,
        opacity: 0.85,
      })

      let model = null

      const loader = new STLLoader()
      loader.load(
        STL_PATH,
        (geometry) => {
          geometry.center()
          geometry.computeBoundingSphere()
          const radius = geometry.boundingSphere.radius
          const scale = 2.2 / radius
          geometry.scale(scale, scale, scale)

          const edges = new THREE.EdgesGeometry(geometry, 15)
          model = new THREE.LineSegments(edges, material)
          scene.add(model)

          // Fit camera to the scaled bounding sphere
          const scaledRadius = 2.2
          const fovRad = (camera.fov * Math.PI) / 180
          const dist = (scaledRadius / Math.tan(fovRad / 2)) * 1.25
          camera.position.set(0, 0, dist)
          camera.near = dist * 0.01
          camera.far = dist * 10
          camera.updateProjectionMatrix()
        },
        undefined,
        (err) => console.error('STL load error:', err)
      )

      let scrollOffset = 0
      const onScroll = () => {
        const maxScroll = document.body.scrollHeight - window.innerHeight
        const fraction = maxScroll > 0 ? window.scrollY / maxScroll : 0
        scrollOffset = fraction * Math.PI * 4
      }
      window.addEventListener('scroll', onScroll)

      let animId
      const startTime = performance.now()
      const animate = () => {
        animId = requestAnimationFrame(animate)
        if (model) {
          const t = (performance.now() - startTime) / 1000
          model.rotation.y = t * 0.4 + scrollOffset
          model.position.y = Math.sin(t * 0.8) * 0.08
        }
        renderer.render(scene, camera)
      }
      animate()

      const onResize = () => {
        const w = mount.clientWidth
        const h = mount.clientHeight
        if (!w || !h) return
        camera.aspect = w / h
        camera.updateProjectionMatrix()
        renderer.setSize(w, h)
      }
      window.addEventListener('resize', onResize)

      return () => {
        cancelAnimationFrame(animId)
        window.removeEventListener('scroll', onScroll)
        window.removeEventListener('resize', onResize)
        renderer.dispose()
        if (mount.contains(renderer.domElement)) {
          mount.removeChild(renderer.domElement)
        }
      }
    }

    // Use requestAnimationFrame to defer until layout is complete
    let cleanup
    const rafId = requestAnimationFrame(() => {
      cleanup = init()
    })

    return () => {
      cancelAnimationFrame(rafId)
      cleanup?.()
    }
  }, [])

  return <div ref={mountRef} className={styles.canvas} />
}
