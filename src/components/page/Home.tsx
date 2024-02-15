import React, { useEffect, useState } from 'react'
import styles from '@/styles/home.module.scss'
import { userStoreType } from '@/backend/backend'
import { useRouter } from 'next/router'
import { Datafatch } from '@/components/datafatch'
import Navbar from '../navbar'
import Games from './games'
import Gcontroller from './Gcontroller'

export default function Home({ user }: { user: any }) {

  const route = useRouter()
  const [userin, setUserin] = useState<userStoreType>(user)
  const [scrool, setScrool] = useState<boolean>(true)

  useEffect(() => {

  }, [user])


  return (
    <>
      <Datafatch
        user={user}
        getUser={(data) => {

        }}
      />
      <div className={styles.mainBg}>
        <Navbar
          Gclick={() => setScrool(true)}
          GCclick={() => setScrool(false)}
        />
        <div className={styles.midboxs}>
          {scrool ? 
          <Games />
          :<Gcontroller />}
        </div>
      </div>
    </>

  )
}
