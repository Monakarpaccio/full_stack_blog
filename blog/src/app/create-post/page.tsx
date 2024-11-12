'use client'
import React, { useState,useRef} from 'react'
import styles from"@/app/styles/styles.module.css";
import { useRouter } from 'next/navigation';

const postBlog= async(title:string|undefined, content:string|undefined)=>{
  const res = await fetch('http://localhost:3001/api/v1/posts',{
      method:"POST", 
      headers:{
          "Content-Type":"application/json",
      },
      body:JSON.stringify({title,content}),
  })
    return res.json()
}

const CreatePost = () => {
  const router =useRouter()
    const titleRef= useRef<HTMLInputElement|null>(null)
    const contentRef= useRef<HTMLTextAreaElement|null>(null)

  const handleSubmit= async(e: React.FormEvent)=>{
    e.preventDefault()
    //console.log(titleRef.current?.value)
    //console.log(descriptionRef.current?.value)
    
    await postBlog(titleRef.current?.value,contentRef.current?.value)

    router.push("/")
    router.refresh()
}

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>ブログ新規登録</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>タイトル</label>
        <input 
        ref={titleRef}
        placeholder='タイトルを入力してください'
        type="text"
        className={styles.input}
        />
        <label className={styles.label}>本文</label>
        <textarea 
         ref={contentRef}
        placeholder='内容を入力してください'
        className={styles.textarea}
        />
        <button type ="submit" className={styles.button}>投稿</button>
      </form>
    </div>
  )
}

export default CreatePost