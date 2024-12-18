import styles from './post.module.scss'

export async function generateMetadata({ params }) {
  const { id } = params

  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
  const post = await response.json()

  return {
    title: `Post ${id}: ${post.title}`, 
    description: post.body.slice(0, 100), 
  }
}

async function getPost(id) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
  return response.json()
}

export default async function PostDetails({ params }) {
  const { id } = params
  const post = await getPost(id)

  return (
    <div className="container">
      <div className={styles.postContainer}>
        <h1>{post.title}</h1>
        <p>{post.body}</p>
        <a href="/">Back to Posts</a>
      </div>
    </div>
  )
}