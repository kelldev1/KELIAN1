import type { Source, VeilleItem } from '../types/content'

export const veilleSubject = {
  title: "L'IA dans les systèmes embarqués",
  goal: "Comprendre comment faire tourner un modèle d'intelligence artificielle sur un microcontrôleur.",
  method:
    'Documentation officielle des fabricants et des bibliothèques (Google LiteRT, STMicroelectronics), en lien avec mon BTS Systèmes Embarqués.',
}

export const veilleItems: VeilleItem[] = [
  {
    kicker: '01',
    title: "Un modèle d'IA sur microcontrôleur",
    text: "LiteRT for Microcontrollers exécute des modèles de machine learning sur des microcontrôleurs, notamment à base d'Arm Cortex-M, et a été porté sur d'autres architectures dont l'ESP32.",
  },
  {
    kicker: '02',
    title: 'Des contraintes fortes',
    text: "La bibliothèque est écrite en C++17 pour une plateforme 32 bits, avec une mémoire gérée à la main, un sous-ensemble d'opérations TensorFlow et sans entraînement sur l'appareil.",
  },
  {
    kicker: '03',
    title: 'Les outils des fabricants',
    text: "Chez STMicroelectronics, X-CUBE-AI convertit un modèle déjà entraîné en code C optimisé, intégré au projet STM32. Il est remplacé par STM32Cube AI Studio (formats Keras, TFLite, ONNX).",
  },
  {
    kicker: '04',
    title: 'Du code optimisé pour la puce',
    text: "Des noyaux optimisés, comme ceux basés sur CMSIS-NN, se choisissent à la compilation pour accélérer l'inférence sur Cortex-M.",
  },
]

export const sources: Source[] = [
  {
    label: 'developers.google.com/edge/litert/microcontrollers',
    url: 'https://developers.google.com/edge/litert/microcontrollers/overview',
    description: 'LiteRT for Microcontrollers : documentation officielle de Google',
  },
  {
    label: 'github.com/tensorflow/tflite-micro',
    url: 'https://github.com/tensorflow/tflite-micro',
    description: 'Dépôt officiel du code de la bibliothèque',
  },
  {
    label: 'wiki.st.com : X-CUBE-AI',
    url: 'https://wiki.st.com/stm32mcu/wiki/AI:X-CUBE-AI_documentation',
    description: 'Documentation officielle de STMicroelectronics (STM32 et IA)',
  },
]
