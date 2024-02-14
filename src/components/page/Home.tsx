import React, { useEffect, useState } from 'react'
import styles from '@/styles/home.module.scss'
import { userStoreType } from '@/backend/backend'
import { useRouter } from 'next/router'
import {Datafatch} from '@/components/datafatch'
import Navbar from '../navbar'

export default function Home({user}:{user:any}) {

  const route = useRouter()
  const [userin,setUserin] = useState<userStoreType>(user)

  useEffect(()=> {

  },[user])


  return (
    <>
    <Datafatch 
        user={user} 
        getUser={(data) => {

        }}
    />
    <div className={styles.mainBg}>
      <Navbar/>
    </div>
    </>
    
  )
}
