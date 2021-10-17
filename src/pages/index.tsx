import { Flex, Box, Text, HStack } from '@chakra-ui/react'
import { Header } from '../components/Header'
import { PostItem } from '../components/PostItem'

type PostItem = {
  slug: string
  title: string
  createdAt: string
  readTime: number
  detail: string
}
interface BlogProps {
  postItems: PostItem[]
}
export default function Blog({ postItems }: BlogProps) {
  return (
    <Flex w="100vw" h="100vh">
      <Box maxW="800px" w="50rem" mx="auto">
        <Header />
        {postItems.map(post => (
          <PostItem
            key={post.slug}
            title={post.title}
            createdAt={post.createdAt}
            readTime={post.readTime}
            detail={post.detail}
          />
        ))}
      </Box>
    </Flex>
  )
}

export async function getStaticProps() {
  const postItems = [
    {
      slug: '1',
      title: 'Como utilizar Hooks',
      createdAt: '20 de junho de 2021',
      readTime: 3,
      detail:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores tempore voluptas pariatur fuga, corporis iure quasi, necessitatibus cupiditate veniam reprehenderit provident repellat alias maxime dolorum velit cumque eum minima modi?'
    },
    {
      slug: '2',
      title: 'Como utilizar Hooks 2',
      createdAt: '20 de junho de 2021',
      readTime: 3,
      detail:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores tempore voluptas pariatur fuga, corporis iure quasi, necessitatibus cupiditate veniam reprehenderit provident repellat alias maxime dolorum velit cumque eum minima modi?'
    },
    {
      slug: '3',
      title: 'Como utilizar Hooks 3',
      createdAt: '20 de junho de 2021',
      readTime: 3,
      detail:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores tempore voluptas pariatur fuga, corporis iure quasi, necessitatibus cupiditate veniam reprehenderit provident repellat alias maxime dolorum velit cumque eum minima modi?'
    },
    {
      slug: '4',
      title: 'Como utilizar Hooks 4',
      createdAt: '20 de junho de 2021',
      readTime: 3,
      detail:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores tempore voluptas pariatur fuga, corporis iure quasi, necessitatibus cupiditate veniam reprehenderit provident repellat alias maxime dolorum velit cumque eum minima modi?'
    }
  ]

  return {
    props: { postItems }
  }
}
