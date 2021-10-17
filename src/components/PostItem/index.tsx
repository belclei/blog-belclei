import { Flex, Box, Text, HStack } from '@chakra-ui/react'
import { CalendarIcon, TimeIcon } from '@chakra-ui/icons'

interface PostItemProps {
  title: string
  createdAt: string
  readTime: number
  detail: string
}
export function PostItem({ title, createdAt, readTime, detail }: PostItemProps): JSX.Element {
  return (
    <Box px="4" mb="4" pb="4">
      <Text as="h1" fontFamily="heading" fontSize="2xl" fontWeight="bold" color="heading.500">
        {title}
      </Text>
      <HStack my="3" spacing="4">
        <HStack>
          <CalendarIcon />
          <Text>{createdAt}</Text>
        </HStack>
        <HStack>
          <TimeIcon />
          <Text>{readTime} min de leitura</Text>
        </HStack>
      </HStack>
      <Text>{detail}</Text>
    </Box>
  )
}
