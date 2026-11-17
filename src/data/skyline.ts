// Largeur d'un écran dans le repère du dessin (viewBox) et hauteur du sol.
export const SCREEN_WIDTH = 1600
export const GROUND_Y = 400

// Arche : montant vertical, demi-cercle (approché par des segments), montant vertical.
// x ne fait qu'avancer, donc le trait reste dessinable de gauche à droite.
function arch(
  x: number,
  groundY: number,
  halfWidth: number,
  topY: number,
): Array<[number, number]> {
  const points: Array<[number, number]> = [
    [x, groundY],
    [x, topY + halfWidth],
  ]
  const steps = 10
  for (let i = 1; i < steps; i++) {
    const angle = Math.PI - (i / steps) * Math.PI
    points.push([
      Math.round(x + halfWidth + Math.cos(angle) * halfWidth),
      Math.round(topY + halfWidth - Math.sin(angle) * halfWidth),
    ])
  }
  points.push([x + halfWidth * 2, topY + halfWidth], [x + halfWidth * 2, groundY])
  return points
}

// Onde dont l'amplitude diminue à chaque oscillation (decay < 1).
function wave(
  x: number,
  baseY: number,
  amplitude: number,
  cycles: number,
  cycleWidth: number,
  decay: number,
): Array<[number, number]> {
  const points: Array<[number, number]> = []
  let amp = amplitude
  for (let c = 0; c < cycles; c++) {
    for (let i = 1; i <= 8; i++) {
      const t = i / 8
      points.push([
        Math.round(x + c * cycleWidth + t * cycleWidth),
        Math.round(baseY - Math.sin(t * Math.PI * 2) * amp),
      ])
    }
    amp *= decay
  }
  return points
}

// Un motif par écran (bâtiment, battement, chemin, circuit...). Chaque liste est un tracé de points [x, y]
// où x ne fait qu'avancer vers la droite : le trait se dessine donc toujours de gauche à droite.
// Le sol est à y = 400, plus y est petit, plus le bâtiment est haut.
export const screenShapes: ReadonlyArray<ReadonlyArray<readonly [number, number]>> = [
  // 00 — tour en escalier
  [
    [200, 400],
    [200, 340],
    [260, 340],
    [260, 300],
    [320, 300],
    [320, 250],
    [380, 250],
    [380, 400],
    [560, 400],
    [560, 270],
    [700, 270],
    [700, 400],
  ],
  // 01 — À propos : un battement de cœur (la personne derrière le code)
  [
    [150, 400],
    [420, 400],
    [470, 350],
    [520, 400],
    [600, 400],
    [640, 420],
    [700, 240],
    [760, 480],
    [820, 400],
    [900, 400],
    [960, 330],
    [1040, 400],
    [1300, 400],
  ],
  // 02 — Parcours : un chemin qui monte, étape après étape, jusqu'à un drapeau
  [
    [100, 400],
    [300, 400],
    [300, 360],
    [480, 360],
    [480, 320],
    [660, 320],
    [660, 280],
    [840, 280],
    [840, 240],
    [1020, 240],
    [1020, 150],
    [1100, 165],
    [1020, 180],
    [1020, 240],
    [1250, 240],
    [1250, 400],
  ],
  // 03 — Compétences : un signal d'horloge / un circuit imprimé
  [
    [100, 400],
    [220, 400],
    [220, 300],
    [300, 300],
    [300, 400],
    [380, 400],
    [380, 300],
    [500, 300],
    [500, 400],
    [560, 400],
    [560, 300],
    [600, 300],
    [600, 400],
    [680, 400],
    [680, 300],
    [800, 300],
    [800, 340],
    [860, 340],
    [860, 400],
    [1000, 400],
    [1000, 260],
    [1140, 260],
    [1140, 400],
  ],
  // 04 — Projets : une arcade d'arches, comme une galerie de cadres
  [
    [100, 400],
    ...arch(160, 400, 120, 230),
    ...arch(520, 400, 120, 230),
    ...arch(880, 400, 120, 230),
    ...arch(1240, 400, 120, 230),
  ],
  // 05 — BTS SIO & veille : des sommets, on garde le regard au loin
  [
    [100, 400],
    [320, 260],
    [440, 340],
    [600, 190],
    [760, 340],
    [820, 300],
    [1000, 400],
    [1100, 400],
    [1180, 330],
    [1260, 400],
  ],
  // 06 — Contact : des ondes qui s'éteignent, le signal part vers l'autre côté
  [[150, 400], [300, 400], ...wave(300, 400, 80, 6, 150, 0.7)],
]

// Construit le tracé SVG complet : le sol, puis chaque bâtiment décalé d'un écran.
export function buildSkylinePath(): string {
  const segments = [`M0 ${GROUND_Y}`]
  screenShapes.forEach((shape, screenIndex) => {
    const offset = screenIndex * SCREEN_WIDTH
    for (const [x, y] of shape) segments.push(`L${offset + x} ${y}`)
    segments.push(`L${offset + SCREEN_WIDTH} ${GROUND_Y}`) // retour au sol en bord d'écran
  })
  return segments.join(' ')
}
