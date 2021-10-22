import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  colors: {
    highlight: {
      '500': '#EF3E36',
      '100': '#F0DFAD'
    },
    heading: {
      '500': '#EF3E36',
      '400': '#A13D63'
    },
    body: {
      '900': '#001650',
      '800': '#001623',
      '200': '#fad8d6',
      '100': '#CCBFC9'
    }
  },
  fonts: {
    logo: 'Kaushan Script',
    heading: 'Raleway',
    body: 'Montserrat'
  },
  styles: {
    global: {
      body: {
        bg: 'body.800',
        color: 'body.200'
      },
      a: {
        _hover: { color: 'heading.400' }
      }
    }
  }
})
