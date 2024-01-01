'use client';

import { useState, useEffect } from 'react'

import { useSearchParams, useRouter } from 'next/navigation'

import Profile from '@components/profile'



const OtherProfile = () => {
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");
  const userName = searchParams.get("username");
  console.log(userName)

  const [otherPosts, setOtherPosts] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${userId}/posts`)
      const data = await response.json()
      setOtherPosts(data)
    }

    const fetchUser = async () => {

    }

    fetchPosts()
  }, [])


  return (

    <Profile
      name={`${userName}'s`}
      desc={`Welcome to ${userName}'s profile page`}
      data={otherPosts}
    />
  )
}

export default OtherProfile