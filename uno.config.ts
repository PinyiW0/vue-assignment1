import transformerVariantGroup from '@unocss/transformer-variant-group'
import { defineConfig, presetWind3 } from 'unocss'

export default defineConfig({
    theme: {
        colors: {
          primary: {
            120: '#7B6651',
            DEFAULT: '#FFD56B',
            80: '#FFDD89',
            60: '#FFE6A6',
            40: '#FFEEC4',
            20: '#FFF7E1',
            10: '#FAF7F5',
          },
          gray: {
            140: '#0A0A0A',
            120: '#171717',
            DEFAULT: '#262626',
            70: '#404040',
            60: '#525252',
            50: '#737373',
            40: '#A3A3A3',
            30: '#D4D4D4',
            20: '#E5E5E5',
            10: '#F5F5F5',
          },
        },
    },
    presets: [
        presetWind3(),
    ],
    transformers: [
        transformerVariantGroup(),
      ],
})