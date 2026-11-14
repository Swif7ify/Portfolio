import type { ThemeDef } from "../types/kinetic";

export const themes: ThemeDef[] = [
{
  id: "cyber",
  name: "Cyber-Dark",
  description: "Obsidian, signal lime, phosphor cyan",
  shaderA: [0.78, 1.0, 0.24],
  shaderB: [0.25, 0.88, 1.0],
  shaderBg: [0.027, 0.031, 0.04]
},
{
  id: "swiss",
  name: "Swiss Brutalist Grid",
  description: "Bone paper, ink, exposed grid, ember red",
  shaderA: [0.9, 0.19, 0.05],
  shaderB: [0.92, 0.91, 0.88],
  shaderBg: [0.937, 0.929, 0.906]
},
{
  id: "liquid",
  name: "Liquid Glass",
  description: "Deep navy, frosted panels, iris highlights",
  shaderA: [0.59, 0.8, 1.0],
  shaderB: [1.0, 0.59, 0.88],
  shaderBg: [0.024, 0.04, 0.1]
}];