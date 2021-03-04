import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Navbar from '../comps/Navbar'
import Footer from '../comps/Footer'
import Link from 'next/link'
import {useEffect} from 'react'
import {useRouter} from 'next/router'

export default function Home() {

  const router = useRouter()

  useEffect(() => {
      router.push('/posts/')
  }, [])

  return (
    <>
      <div>Loading ...</div>
    </>
  )
}
