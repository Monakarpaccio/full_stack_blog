'use client'
import Image from "next/image";
import { Post } from "./type/types";
import Link from "next/link";
import styles from"./styles/styles.module.css";
import { useRouter } from "next/navigation";

 async function getISR() {
  const res = await fetch('http://localhost:3001/api/v1/posts',{
    cache:"no-store", //SSR
  })
  const data = await res.json()
  return data
}

async function deleteBlog(id:string) {
  const res = await fetch(`http://localhost:3001/api/v1/posts/${id}`,{
      method:"DELETE", 
      headers:{
          "Content-Type":"application/json",
      },
  })
  if (!res.ok) {
    throw new Error(`Failed to delete post with id: ${id}`);
  }

  // レスポンスが空の場合があるので、そのチェックを行う
  const text = await res.text();
  return text ? JSON.parse(text) : {};
}
export default async function Home() {
  const router=useRouter()
  const posts= await getISR()

  const handleDelete= async(id:string)=>{  
    await deleteBlog(id)
    router.refresh()
}

  return (
    <div className={styles.homecontainer}>
      <h2>Blog</h2>
      <Link href={"/create-post"} className={styles.createButton}>
        Create New Post
        </Link> 
    <div>
      {posts.map((post:Post)=>(
        <div key={post.id} className={styles.postCard}>
        <Link href={`posts/${post.id}`} className={styles.postCardBox}>
        <h2>{post.title}</h2>
        </Link>   
        <p>{post.content}</p>
        <Link href={`/edit-post/${post.id}`}>
        <button className={styles.editButton}>Edit</button>
        </Link>

        <button className={styles.deleteButton} onClick={() => handleDelete(post.id)}>Delete</button>
        </div>
      ))}
    </div>
    </div>
  );
}
