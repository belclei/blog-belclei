import { Flex, Box, Text, HStack } from '@chakra-ui/react'
import { TiCalendarOutline, TiStopwatch } from 'react-icons/ti'
import Link from 'next/link'

interface PostProps {
  slug: string
  title: string
  subtitle: string
  createdAt: string
  updatedAt: string
  readTime: number
}
export function Post({ slug, title, createdAt, readTime, subtitle, updatedAt }: PostProps): JSX.Element {
  return (
    <Box px="4" mb="4" pb="4">
      <Text as="h1" fontFamily="heading" fontSize="2xl" fontWeight="bold" color="heading.500">
        <Link href={`/blog/${slug}`}>
          <a>{title}</a>
        </Link>
      </Text>
      <HStack my="3" spacing="4" color="body.100">
        <HStack>
          <TiCalendarOutline size={20} />
          <Text>{createdAt}</Text>
        </HStack>
        <HStack>
          <TiStopwatch size={20} />
          <Text>{readTime} min de leitura</Text>
        </HStack>
      </HStack>
      {updatedAt && (
        <Text color="highlight.100" fontStyle="italic" mb="3" fontSize="sm">
          * Atualizado em {updatedAt}
        </Text>
      )}
      <Text>{subtitle}</Text>
    </Box>
  )
}
