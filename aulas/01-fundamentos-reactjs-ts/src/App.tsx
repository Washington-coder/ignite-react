import { Header } from "./components/Header.tsx";
import { Sidebar } from "./components/Sidebar.tsx";
import { Post, PostType } from "./components/Post.tsx";
import styles from './App.module.css'

export function App() {
  
  const posts: PostType[] = [
    {
      id: 1,
      author: {
        avatarURL: 'https://github.com/diego3g.png',
        name: 'Diego Fernandes',
        role: 'CTO Rocketseat',
      },
      content: [
        {
          type: 'paragraph',
          content: 'Fala galeraa 👋',
        },
        {
          type: 'paragraph',
          content:
            'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀',
        },
        {
          type: 'link',
          content: 'jane.design/doctorcare',
        },
      ],
      publishedAt: new Date('2025-01-01T10:30:00Z'),
    },
    {
      id: 2,
      author: {
        avatarURL: 'https://avatars.githubusercontent.com/u/82000177?v=4',
        name: 'Washington',
        role: 'Web developer',
      },
      content: [
        {
          type: 'paragraph',
          content: 'Fala galeraa 👋',
        },
        {
          type: 'paragraph',
          content:
            'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀',
        },
        {
          type: 'link',
          content: 'jane.design/doctorcare',
        },
      ],
      publishedAt: new Date('2025-01-01T10:30:00Z'),
    },
  ];

  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {posts.map(post => {
            return (
              <Post
                key={post.id}
                post={post}
              />
            )
          })}
        </main>
      </div>
    </div>
  )
}