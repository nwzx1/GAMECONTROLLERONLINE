import { Structs } from '@/Redux_config/Authentication/UserAuth'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { User } from 'react-feather'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'


export type DataFatchTypeOfUser = {
  userId:string,
  userDetails:{
    Uname:string,
    UEmail:string,
    UcreateTime:string,
    login:boolean
  }

}

export function Datafatch({ user, getUser }: { user: any, getUser: (user: any) => any }) {

    const route = useRouter()
    const dispatch = useDispatch()

    let data = useSelector((state: any) => {
        return state.user;
    })
    useEffect(() => {

        if (user.user != undefined) {
            let users = user.user;
            new Structs(dispatch).handleRegistrationOverload({
                UEmail: users["UEmail"],
                Uid: users['Uid'],
                Uname: users["Uname"],
                UcreatedTime: users["UcreatedTime"]
            })

        }
    }, [user])

    useEffect(() => {
        if (data.userId != undefined) {
            getUser(data)
        }
    }, [data])

    return (
        <div style={{ position: 'absolute' }}></div>
    )
}
