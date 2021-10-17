import { Flex, Text } from '@chakra-ui/react'

export function Header() {
  return (
    <Flex as="header" px="4" py="20">
      <Text fontFamily="logo" fontSize="5xl" color="highlight.500">
        Belclei
      </Text>
    </Flex>
  )
}
