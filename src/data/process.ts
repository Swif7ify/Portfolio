import type { ProcessStep } from '../types/portfolio';

export const processSteps: ProcessStep[] = [
  {
    title: 'Listen',
    description:
      'Understanding user friction, hardware constraints, and core system requirements before touching a single line of code.',
    deliverables: ['Problem brief', 'Architecture plan', 'Tech stack roadmap'],
  },
  {
    title: 'Shape',
    description:
      'Designing user flows, circuit schematics, and rapid prototypes. Solving the toughest bottlenecks while changes are still swift.',
    deliverables: ['System schematics', 'Interactive wireframes', 'API contracts'],
  },
  {
    title: 'Craft',
    description:
      'Writing type-safe, maintainable code, polished UI animations, and robust microcontroller firmware with relentless attention to detail.',
    deliverables: ['Production code', 'Micro-interactions', 'Embedded firmware'],
  },
  {
    title: 'Ship',
    description:
      'Deploying to scalable cloud architectures or flashing hardware, verifying real-world performance, and monitoring latency.',
    deliverables: ['Live release', 'Test benchmarks', 'Technical documentation'],
  },
];
