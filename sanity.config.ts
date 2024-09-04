// sanity.config.ts
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from "@/sanity/schema"

export default defineConfig({
  name: 'portfolio',
  title: 'Portfolio',
  projectId: "toj47gf1",
  dataset: "production",
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
})