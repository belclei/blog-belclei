import { Flex, Text } from '@chakra-ui/react'
import Link from 'next/link'

export function Header() {
  return (
    <Flex as="header" px="4" py="20">
      <Text fontFamily="logo" fontSize="5xl" color="highlight.500">
        <Link href="/">
          <a>Belclei</a>
        </Link>
      </Text>
    </Flex>
  )
}
