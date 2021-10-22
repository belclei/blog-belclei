import { GetStaticPaths, GetStaticProps } from 'next'
import { getPrismicClient } from '../../services/prismic'
import Prismic from '@prismicio/client'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Flex, Box } from '@chakra-ui/react'
import { Header } from '../../components/Header'
import { RichText } from 'prismic-dom'
import { Post as PostComponent } from '../../components/Post'
import { Text, Spinner } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import Comments from '../../components/Comments'

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
  const router = useRouter()

  return (
    <Flex w="100vw" h="100vh" as="article">
      <Box maxW="800px" w="50rem" mx="auto">
        <Header />
        {router.isFallback ? (
          <Spinner />
        ) : (
          <>
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
                <Box key={data.heading} px="4">
                  <Box
                    my="4"
                    fontSize="lg"
                    color="heading.500"
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
            <Text as="h1" px="4" fontFamily="heading" fontSize="2xl" fontWeight="bold" my="8" color="heading.500">
              Comentários
            </Text>
            <Comments />
          </>
        )}
      </Box>
    </Flex>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = getPrismicClient()
  const posts = await prismic.query([Prismic.predicates.at('document.type', 'post')], {})
  const paths = posts.results.map(post => {
    return { params: { slug: post.uid } }
  })
  return {
    paths,
    fallback: 'blocking'
  }
}
export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
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

    const post = { data, uid, createdAt, updatedAt, readTime }

    return {
      props: {
        post
      },
      revalidate: 60 * 30 //30 minutos
    }
  } catch {
    return {
      notFound: true
    }
  }
}
