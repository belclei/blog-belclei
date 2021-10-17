import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  colors: {
    highlight: {
      '500': '#d74e09'
    },
    heading: {
      '500': '#25ced1'
    },
    body: {
      '800': '#14145b',
      '200': '#FCEFF9'
    }
  },
  fonts: {
    logo: 'Kaushan Script',
    heading: 'Montserrat',
    body: 'Noto Sans'
  },
  styles: {
    global: {
      body: {
        bg: 'body.800',
        color: 'body.200'
      }
    }
  }
})
