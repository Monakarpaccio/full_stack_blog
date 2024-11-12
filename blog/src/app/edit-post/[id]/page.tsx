'use client'
import React, { useState,useRef} from 'react'
import styles from"@/app/styles/styles.module.css";
import { useRouter } from 'next/navigation';

const editBlog= async(title:string|undefined, content:string|undefined,id:number)=>{
  const res = await fetch(`http://localhost:3001/api/v1/posts/${id}`,{
      method:"PUT", 
      headers:{
          "Content-Type":"application/json",
      },
      body:JSON.stringify({title,content,id}),
  })
    return res.json()
}

const EditPost = ({params}:{params: {id:number}}) => {
  const router =useRouter()
    const titleRef= useRef<HTMLInputElement|null>(null)
    const contentRef= useRef<HTMLTextAreaElement|null>(null)

  const handleSubmit= async(e: React.FormEvent)=>{
    e.preventDefault()
    //console.log(titleRef.current?.value)
    //console.log(descriptionRef.current?.value)
    
    await editBlog(titleRef.current?.value,contentRef.current?.value,params.id)

    router.push("/")
    router.refresh()
}

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>ブログ編集</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>タイトル</label>
        <input 
        ref={titleRef}
        placeholder='タイトルを入力してください'
        type="text"
        className={styles.input}
        //value={title}
        />
        <label className={styles.label}>本文</label>
        <textarea 
         ref={contentRef}
        placeholder='内容を入力してください'
        className={styles.textarea}
        />
        <button type ="submit" className={styles.button}>編集</button>
      </form>
    </div>
  )
}

export default EditPost