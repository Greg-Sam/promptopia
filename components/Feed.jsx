'use client'

import { useState, useEffect } from 'react'
import PromptCard from './PromptCard'

let allPosts = []

const PromptCardList = ({ data, handleTagClick }) => {

  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState("")
  const [posts, setPosts] = useState([])
 
  const handleSearchChange = (e) => {
    console.log(posts)
    // const filteredPosts = array.filter(item => item.toLowerCase().includes(searchTerm.toLowerCase()));
    if (e.target.value.length === 0) { setPosts(allPosts) } 
    else 
    {const filteredPosts = posts.filter(post => 
      post.prompt.toLowerCase().includes(e.target.value.toLowerCase()) ||
      post.tag.toLowerCase().includes(e.target.value.toLowerCase()) ||
      post.creator.userName.toLowerCase().includes(e.target.value.toLowerCase()) ||
      post.creator.email.toLowerCase().includes(e.target.value.toLowerCase()) 
      )  ;
    setPosts(filteredPosts)
    console.log(e.target.value.length)}
    
  }



  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt')
      const data = await response.json()
      allPosts = data
      setPosts(data)
    }

    fetchPosts()
  }, [])

  return (

    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="search for a tag or a username"
          // value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer" 
          />
      </form>

      <PromptCardList
        data={posts}
        handleTagClick={() => { }}
      />
    </section>
  )
}

export default Feed