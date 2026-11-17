// Largeur d'un écran dans le repère du dessin (viewBox) et hauteur du sol.
export const SCREEN_WIDTH = 1600
export const GROUND_Y = 400

// Un point [x, y, 'move'] lève le crayon : le trait reprend à cet endroit sans relier (pour les détails).
export type ShapePoint = readonly [number, number] | readonly [number, number, 'move']

// Cercle (roue, casque) parcouru depuis l'angle `from` sur `sweep` degrés (0° = à droite, 90° = en bas).
function circle(cx: number, cy: number, r: number, from: number, sweep: number): Array<[number, number]> {
  const points: Array<[number, number]> = []
  const steps = Math.max(8, Math.round(Math.abs(sweep) / 15))
  for (let i = 0; i <= steps; i++) {
    const a = ((from + (sweep * i) / steps) * Math.PI) / 180
    points.push([Math.round(cx + Math.cos(a) * r), Math.round(cy + Math.sin(a) * r)])
  }
  return points
}

// ---------- Le kart : un seul dessin, réutilisé à chaque étape de la course ----------
// Tracé de référence : roue arrière posée au sol en (250, 400), nez vers la droite.
const KART: ReadonlyArray<ShapePoint> = [
  // roue arrière : un tour complet, on ressort en haut à droite
  [250, 400],
  ...circle(250, 362, 38, 90, -480),
  // châssis arrière et baquet
  [306, 348],
  [356, 348],
  [350, 300],
  // dos du pilote, nuque, casque
  [376, 284],
  [386, 274],
  ...circle(398, 256, 20, 125, 300),
  // buste, bras jusqu'au volant
  [410, 284],
  [446, 300],
  [452, 288],
  [446, 314],
  // jambes sous le capot, nez
  [486, 324],
  [600, 330],
  [690, 342],
  [698, 358],
  [670, 358],
  // roue avant
  ...circle(640, 368, 32, -20, 470),
  // détails : visière, ponton, pare-chocs arrière, moyeux, numéro
  [392, 252, 'move'],
  [414, 252],
  [472, 348, 'move'],
  [596, 348],
  [608, 338],
  [204, 332, 'move'],
  [204, 384],
  [250, 352, 'move'],
  ...circle(250, 362, 10, -90, 360),
  [640, 360, 'move'],
  ...circle(640, 368, 8, -90, 360),
  [541, 318, 'move'],
  ...circle(530, 318, 11, 0, 360),
  // fin : la roue avant posée au sol
  [640, 400, 'move'],
]

// Place le kart : roue arrière au sol en (x, y), à l'échelle s, incliné de `angle` degrés (négatif = nez levé).
function kart(x: number, y = GROUND_Y, s = 1, angle = 0): ShapePoint[] {
  const a = (angle * Math.PI) / 180
  const cos = Math.cos(a)
  const sin = Math.sin(a)
  return KART.map((point): ShapePoint => {
    const dx = (point[0] - 250) * s
    const dy = (point[1] - 400) * s
    const px = Math.round(x + dx * cos - dy * sin)
    const py = Math.round(y + dx * sin + dy * cos)
    return point[2] ? [px, py, 'move'] : [px, py]
  })
}

// Traits de vitesse derrière le kart (le crayon se lève entre chaque trait).
function speedLines(x: number, ys: number[], length: number): ShapePoint[] {
  return ys.flatMap((y, i): ShapePoint[] => [
    [x + i * 18, y, 'move'],
    [x + i * 18 + length, y],
  ])
}

// Damier : contour, lignes intérieures, une case sur deux barrée.
function grid(x: number, y: number, w: number, h: number, cols: number, rows: number): ShapePoint[] {
  const pts: ShapePoint[] = [[x, y, 'move'], [x + w, y], [x + w, y + h], [x, y + h], [x, y]]
  for (let c = 1; c < cols; c++) pts.push([x + (w * c) / cols, y, 'move'], [x + (w * c) / cols, y + h])
  for (let r = 1; r < rows; r++) pts.push([x, y + (h * r) / rows, 'move'], [x + w, y + (h * r) / rows])
  for (let c = 0; c < cols; c++)
    for (let r = 0; r < rows; r++)
      if ((c + r) % 2 === 0) {
        const cx = x + (w * c) / cols
        const cy = y + (h * r) / rows
        pts.push([cx, cy, 'move'], [cx + w / cols, cy + h / rows], [cx + w / cols, cy, 'move'], [cx, cy + h / rows])
      }
  return pts
}

// Drapeau à damier sur son mât, du pied (x, foot) jusqu'en haut (top).
function flag(x: number, foot: number, top: number): ShapePoint[] {
  return [[x, foot, 'move'], [x, top], ...grid(x, top, 64, 40, 4, 2)]
}

// Pile de pneus vue de côté.
function tires(x: number, count: number): ShapePoint[] {
  const top = GROUND_Y - count * 22
  const pts: ShapePoint[] = [[x, GROUND_Y, 'move'], [x, top], [x + 56, top], [x + 56, GROUND_Y]]
  for (let i = 1; i < count; i++) pts.push([x, GROUND_Y - i * 22, 'move'], [x + 56, GROUND_Y - i * 22])
  for (let i = 0; i < count; i++) {
    const cy = GROUND_Y - i * 22 - 11
    pts.push([x + 33, cy, 'move'], ...circle(x + 28, cy, 5, 0, 360))
  }
  return pts
}

// Vibreur : dents en bord de piste.
function curb(x: number, teeth: number): ShapePoint[] {
  const pts: ShapePoint[] = [[x, GROUND_Y, 'move']]
  for (let i = 0; i < teeth; i++) pts.push([x + i * 30 + 15, GROUND_Y - 12], [x + i * 30 + 30, GROUND_Y])
  return pts
}

// Ordinateur portable avec </> à l'écran (la télémétrie... et le code).
function laptop(x: number, s = 1): ShapePoint[] {
  const P = (px: number, py: number, move = false): ShapePoint => {
    const X = Math.round(x + px * s)
    const Y = Math.round(GROUND_Y + py * s)
    return move ? [X, Y, 'move'] : [X, Y]
  }
  return [
    P(0, 0, true), P(12, -16), P(40, -16), P(40, -138), P(208, -138), P(208, -16), P(228, -16), P(240, 0),
    P(106, -104, true), P(80, -77), P(106, -50),
    P(136, -110, true), P(112, -44),
    P(142, -104, true), P(168, -77), P(142, -50),
  ]
}

// Une course, un écran par étape : départ, ligne droite, montée, stand, virage, dépassement, arrivée.
// Le sol est à y = 400 ; plus y est petit, plus c'est haut. Un point [x, y, 'move'] lève le crayon.
export const screenShapes: ReadonlyArray<ReadonlyArray<ShapePoint>> = [
  // 00 — Départ : le portique et ses feux, le kart sur la ligne
  [
    [110, 400],
    [110, 250],
    [340, 250],
    [175, 250, 'move'], [175, 262], ...circle(175, 278, 16, -90, 360),
    [225, 250, 'move'], [225, 262], ...circle(225, 278, 16, -90, 360),
    [275, 250, 'move'], [275, 262], ...circle(275, 278, 16, -90, 360),
    [340, 250, 'move'],
    [340, 400],
    ...grid(372, 388, 64, 12, 4, 1),
    [340, 400, 'move'],
    [480, 400],
    ...kart(480),
    [1020, 400],
  ],
  // 01 — À propos : la ligne droite, à pleine vitesse
  [
    [150, 400],
    ...speedLines(150, [300, 326, 352], 110),
    [150, 400, 'move'],
    [380, 400],
    ...kart(380, GROUND_Y, 0.85),
    [780, 400],
    ...curb(780, 4),
    // panneau de distance
    [940, 400], [940, 320], [920, 320], [920, 290], [990, 290], [990, 320], [940, 320],
    [930, 300, 'move'], [980, 300], [930, 310, 'move'], [980, 310],
    [940, 400, 'move'],
    [1020, 400],
  ],
  // 02 — Parcours : la montée, étape après étape, jusqu'au drapeau
  [
    [150, 400],
    [262, 375],
    ...kart(262, 375, 0.7, -12.5),
    [600, 300],
    [760, 300],
    ...flag(660, 300, 236),
    [760, 300, 'move'],
    [1000, 400],
  ],
  // 03 — Compétences : au stand, les outils et l'ordi de télémétrie
  [
    [100, 400],
    [100, 290],
    [120, 270],
    [520, 270],
    [540, 290],
    [540, 400],
    // le kart sur son chevalet
    [160, 400, 'move'], [175, 380], [480, 380], [495, 400],
    [190, 380, 'move'],
    ...kart(190, 380, 0.65),
    [540, 400, 'move'],
    [600, 400],
    ...laptop(600, 0.85),
    [804, 400, 'move'],
    // clé plate posée debout
    [860, 400], [860, 320], [850, 312], [850, 290], [862, 300], [878, 300], [890, 290], [890, 312], [880, 320], [880, 400],
    // caisse à outils
    [920, 400], [920, 350], [1010, 350], [1010, 400], [920, 400],
    [945, 350, 'move'], [945, 336], [985, 336], [985, 350],
    [920, 372, 'move'], [1010, 372],
    [1010, 400, 'move'],
    [1020, 400],
  ],
  // 04 — Projets : le virage, les pneus, la tribune
  [
    [110, 400],
    ...tires(110, 3),
    ...tires(170, 2),
    [226, 400, 'move'],
    [240, 400],
    ...curb(240, 6),
    [430, 400],
    ...kart(430, GROUND_Y, 0.9),
    // la tribune et son public
    [800, 400], [800, 360], [860, 360], [860, 320], [920, 320], [920, 280], [1000, 280], [1000, 400],
    [837, 345, 'move'], ...circle(830, 345, 7, 0, 360),
    [897, 305, 'move'], ...circle(890, 305, 7, 0, 360),
    [957, 265, 'move'], ...circle(950, 265, 7, 0, 360),
    [985, 265, 'move'], ...circle(978, 265, 7, 0, 360),
    [1000, 400, 'move'],
    [1020, 400],
  ],
  // 05 — BTS SIO : le dépassement devant la tour de chrono
  [
    [120, 400],
    [120, 300],
    [210, 300],
    [210, 400],
    [134, 318, 'move'], [196, 318], [134, 338, 'move'], [196, 338], [134, 358, 'move'], [176, 358],
    [210, 400, 'move'],
    [300, 400],
    ...kart(300, GROUND_Y, 0.6),
    ...speedLines(560, [340, 362], 60),
    [534, 400, 'move'],
    [660, 400],
    ...kart(660, GROUND_Y, 0.6),
    [1020, 400],
  ],
  // 06 — Contact : l'arrivée, le drapeau à damier, le podium
  [
    [110, 400],
    ...speedLines(110, [320, 346], 90),
    [110, 400, 'move'],
    [200, 400],
    ...kart(200, GROUND_Y, 0.85),
    // portique d'arrivée
    [640, 400], [640, 262], [840, 262], [840, 400],
    ...grid(660, 268, 160, 26, 8, 2),
    [840, 400, 'move'],
    // podium : 2, 1, 3, et le drapeau sur la plus haute marche
    [870, 400], [870, 360], [910, 360], [910, 340], [950, 340], [950, 372], [990, 372], [990, 400],
    ...flag(930, 340, 276),
    [990, 400, 'move'],
    [1020, 400],
  ],
]

// Le tracé complet, point par point : le sol, puis le dessin de chaque écran décalé d'un écran.
// `stops[i]` : index du dernier point du dessin de l'écran i (le crayon doit y être quand on s'arrête sur cet écran).
export type TracePoint = { x: number; y: number; move: boolean }

export function buildSkylineTrace(): { points: TracePoint[]; stops: number[] } {
  const points: TracePoint[] = [{ x: 0, y: GROUND_Y, move: true }]
  const stops: number[] = []
  screenShapes.forEach((shape, screenIndex) => {
    const offset = screenIndex * SCREEN_WIDTH
    for (const [x, y, move] of shape) points.push({ x: offset + x, y, move: Boolean(move) })
    stops.push(points.length - 1)
    points.push({ x: offset + SCREEN_WIDTH, y: GROUND_Y, move: false }) // retour au sol en bord d'écran
  })
  return { points, stops }
}
