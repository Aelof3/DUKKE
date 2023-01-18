import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const isGithubActions = process.env.GITHUB_ACTIONS || false

let basePath = '/'

if (isGithubActions) {
  // trim off `<owner>/`
  const repo = process.env.GITHUB_REPOSITORY.replace(/.*?\//, '')
  basePath = `/${repo}`
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.gltf','**/*.fbx','**/*.glb','**/*.bin'],
  base: basePath,
})
