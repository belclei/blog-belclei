import { GetStaticPaths, GetStaticProps } from 'next'
import { getPrismicClient } from '../../services/prismic'
import Prismic from '@prismicio/client'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Flex, Box } from '@chakra-ui/react'
import { Header } from '../../components/Header'
import { RichText } from 'prismic-dom'
import { Post as PostComponent } from '../../components/Post'

interface PostProps {
  post: {
    data: {
      title: string
      subtitle: string
      content: {
        heading: string
        body: {
          text: string
        }[]
      }[]
    }
    uid: string
    createdAt: string
    updatedAt: string
    readTime: number
  }
}
export default function Post({ post }: PostProps): JSX.Element {
  return (
    <Flex w="100vw" h="100vh" as="article">
      <Box maxW="800px" w="50rem" mx="auto">
        <Header />
        <PostComponent
          key={post.uid}
          slug={post.uid}
          title={post.data.title}
          createdAt={post.createdAt}
          updatedAt={post.updatedAt}
          readTime={post.readTime}
          subtitle={post.data.subtitle}
        />
        {post.data.content.map(data => {
          return (
            <Box key={data.heading}>
              <Box
                my="4"
                dangerouslySetInnerHTML={{
                  __html: RichText.asHtml(data.heading)
                }}
              />
              <Box
                dangerouslySetInnerHTML={{
                  __html: RichText.asHtml(data.body)
                }}
              />
            </Box>
          )
        })}
      </Box>
    </Flex>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = getPrismicClient()
  const posts = await prismic.query([Prismic.predicates.at('document.type', 'post')], {
    fetch: ['posts.uid']
  })
  const paths = posts.results.map(post => {
    return { params: { slug: post.uid } }
  })
  console.log(paths)
  return {
    paths,
    fallback: true
  }
}
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const prismic = getPrismicClient()
  const strUid = String(params.slug)

  const { first_publication_date, data, uid, last_publication_date } = await prismic.getByUID('post', strUid, {})

  const createdAt = format(new Date(first_publication_date), 'dd MMM yyyy', {
    locale: ptBR
  })
  const updatedAt =
    first_publication_date !== last_publication_date &&
    format(new Date(last_publication_date), "dd MMM yyyy', às ' HH:mm", {
      locale: ptBR
    })
  const contentArray = data.content.reduce((acc, cur) => {
    return [...acc, ...cur.body]
  }, [])
  const allBodyString = RichText.asText(contentArray)
  const readTime = Math.ceil(allBodyString.split(' ').length / 200)

  return {
    props: {
      post: {
        data,
        uid,
        createdAt,
        updatedAt,
        readTime
      }
    }
  }
}
