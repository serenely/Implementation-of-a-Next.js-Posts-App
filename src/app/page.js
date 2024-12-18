'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.scss';

export default function HomePage() {
  const [posts, setPosts] = useState([]); 
  const router = useRouter(); 

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();
        setPosts(data.slice(0, 10)); 
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const handleLogout = () => {
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    router.push('/login'); 
  };

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Posts</h1>
        <button
          onClick={handleLogout}
          style={{
            padding: '8px 16px',
            backgroundColor: '#e53e3e',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
          }}
        >
          Logout
        </button>
      </div>

      <ul className={styles.postList}>
        {posts.map((post) => (
          <li key={post.id}>
            <a href={`/posts/${post.id}`}>
              <h3>{post.title}</h3>
              <p>{post.body.slice(0, 50)}...</p>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
