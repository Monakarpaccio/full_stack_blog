import { Post } from '@/app/type/types';
import React from 'react'
import styles from '@/app/styles/Post.module.css'

type Props={
    posts: Post[];
  }

export async function getDetail(id:number) {
    const res = await fetch(`http://localhost:3001/api/v1/posts/${id}`,{
      cache:"no-store",
    })
      const post=await res.json()
    
      return post
     }

const post = async ({params}:{params:{id:number}}) => {
  const post= await getDetail(params.id)
  return (
    <div className={styles.container}>
      <div className={styles.title}>{post.title}</div>
      <div className={styles.content}>{post.content}</div>
      <p className={styles.date}>{post.created_at}</p>
    </div>
  )
}

export default post