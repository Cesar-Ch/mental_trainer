export const words: [number, string][] = [
  [0, 'aro'], [1, 'te'], [2, 'ñu'], [3, 'emo'], [4, 'KO'],
  [5, 'ola'], [6, 'oso'], [7, 'feo'], [8, 'ajo'], [9, 'ave'],
  [10, 'toro'], [11, 'dado'], [12, 'tina'], [13, 'dama'], [14, 'taco'],
  [15, 'tela'], [16, 'taza'], [17, 'tuf'], [18, 'techo'], [19, 'tubo'],
  [20, 'enero'], [21, 'nota'], [22, 'niño'], [23, 'nemo'], [24, 'inca'],
  [25, 'nulo'], [26, 'nasa'], [27, 'info'], [28, 'noche'], [29, 'nube'],
  [30, 'mar'], [31, 'moto'], [32, 'mono'], [33, 'momia'], [34, 'moco'],
  [35, 'miel'], [36, 'misa'], [37, 'mafia'], [38, 'macho'], [39, 'mapa'],
  [40, 'cara'], [41, 'cohete'], [42, 'cuna'], [43, 'cama'], [44, 'coco'],
  [45, 'cola'], [46, 'queso'], [47, 'café'], [48, 'caja'], [49, 'cubo'],
  [50, 'loro'], [51, 'lote'], [52, 'leon'], [53, 'lima'], [54, 'loco'],
  [55, 'lulu'], [56, 'lisa'], [57, 'alfa'], [58, 'lago'], [59, 'lobo'],
  [60, 'serie'], [61, 'seta'], [62, 'zona'], [63, 'asma'], [64, 'saco'],
  [65, 'sal'], [66, 'seso'], [67, 'sofá'], [68, 'sega'], [69, 'sapo'],
  [70, 'furia'], [71, 'foto'], [72, 'fino'], [73, 'fama'], [74, 'foca'],
  [75, 'fila'], [76, 'fosa'], [77, 'fofo'], [78, 'faja'], [79, 'fobia'],
  [80, 'hacha'], [81, 'chita'], [82, 'china'], [83, 'chama'], [84, 'chico'],
  [85, 'cholo'], [86, 'choza'], [87, 'jefe'], [88, 'chucho'], [89, 'chivo'],
  [90, 'bar'], [91, 'bota'], [92, 'vino'], [93, 'bum'], [94, 'vaca'],
  [95, 'bola'], [96, 'vaso'], [97, 'bufo'], [98, 'vago'], [99, 'bebe'],
  [100, 'torero'],
]

export function genWordQuestion() {
  const [number, word] = words[Math.floor(Math.random() * words.length)]
  const direction = Math.random() < 0.5 ? 'numToWord' : 'wordToNum'
  return { number, word, direction }
}