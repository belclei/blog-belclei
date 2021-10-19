import { Flex, Box, Text, HStack } from '@chakra-ui/react'
import { CalendarIcon, TimeIcon } from '@chakra-ui/icons'

interface PostProps {
  slug: string
  title: string
  subtitle: string
  createdAt: string
  updatedAt: string
  readTime: number
}
export function Post({ title, createdAt, readTime, subtitle, updatedAt }: PostProps): JSX.Element {
  return (
    <Box px="4" mb="4" pb="4">
      <Text as="h1" fontFamily="heading" fontSize="2xl" fontWeight="bold" color="heading.500">
        {title}
      </Text>
      <HStack my="3" spacing="4" color="body.100">
        <HStack>
          <CalendarIcon />
          <Text>{createdAt}</Text>
        </HStack>
        <HStack>
          <TimeIcon />
          <Text>{readTime} min de leitura</Text>
        </HStack>
        {updatedAt && (
          <HStack color="highlight.100">
            <Text fontStyle="italic">*Atualizado em {updatedAt}</Text>
          </HStack>
        )}
      </HStack>
      <Text>{subtitle}</Text>
    </Box>
  )
}
