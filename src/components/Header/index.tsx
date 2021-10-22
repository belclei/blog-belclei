import { Flex, Text, HStack } from '@chakra-ui/react'
import Link from 'next/link'
import { SiLinkedin, SiTwitter, SiGithub, SiGmail } from 'react-icons/si'

export function Header() {
  return (
    <Flex as="header" px="4" py="14" justifyContent="space-between" alignItems="center" color="highlight.500">
      <Link href="/">
        <a>
          <Text fontFamily="logo" fontSize="5xl" letterSpacing="wide">
            Belclei
          </Text>
        </a>
      </Link>
      <HStack spacing="4">
        <a href="https://www.linkedin.com/in/belclei/" target="_blank" rel="noreferrer">
          <SiLinkedin size={20} />
        </a>
        <a href="https://www.twitter.com/belclei/" target="_blank" rel="noreferrer">
          <SiTwitter size={20} />
        </a>
        <a href="mailto:belclei@gmail.com">
          <SiGmail size={20} />
        </a>
        <a href="https://github.com/belclei" target="_blank" rel="noreferrer">
          <SiGithub size={20} />
        </a>
      </HStack>
    </Flex>
  )
}
