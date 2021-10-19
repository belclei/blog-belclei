import { Flex, Box } from '@chakra-ui/react'
import { Header } from '../components/Header'
import { Post } from '../components/Post'
import { getPrismicClient } from '../services/prismic'
import Prismic from '@prismicio/client'
import { RichText } from 'prismic-dom'
import { GetStaticProps } from 'next'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

type Post = {
  slug: string
  title: string
  subtitle: string
  createdAt: string
  updatedAt: string
  readTime: number
}
interface BlogProps {
  posts: Post[]
}
export default function Blog({ posts }: BlogProps) {
  return (
    <Flex w="100vw" h="100vh">
      <Box maxW="800px" w="50rem" mx="auto">
        <Header />
        {posts.map(post => (
          <Post
            key={post.slug}
            slug={post.slug}
            title={post.title}
            createdAt={post.createdAt}
            updatedAt={post.updatedAt}
            readTime={post.readTime}
            subtitle={post.subtitle}
          />
        ))}
      </Box>
    </Flex>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient()

  const response = await prismic.query([Prismic.predicates.at('document.type', 'post')], {
    fetch: ['post.title', 'post.subtitle', 'post.content'],
    pageSize: 100
  })

  const posts = response.results.map(post => {
    const contentArray = post.data.content.reduce((acc, cur) => {
      return [...acc, ...cur.body]
    }, [])
    const allBodyString = RichText.asText(contentArray)
    const time = Math.ceil(allBodyString.split(' ').length / 200)

    return {
      slug: post.uid,
      title: post.data.title,
      subtitle: post.data.subtitle,
      readTime: time,
      createdAt: format(new Date(post.first_publication_date), 'dd MMM yyyy', {
        locale: ptBR
      }),
      updatedAt:
        post.first_publication_date !== post.last_publication_date &&
        format(new Date(post.last_publication_date), "dd MMM yyyy', às ' HH:mm", {
          locale: ptBR
        })
    }
  })
  return {
    props: { posts }
  }
}
