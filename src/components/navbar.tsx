import React, { useEffect, useState } from 'react'
import styes from '@/styles/navbar.module.scss'
import Image from 'next/image'
import neologo from '@/assets/svgs/logo1.svg'
import Colors from '@/colors/Color'
import { Icon } from '@iconify/react/dist/iconify.js'
import { useSelector } from 'react-redux'
import { DataFatchTypeOfUser } from './datafatch'
import ConditionPopup from './conditionPopup'
import { Auth } from '@/Redux_config/Authentication/UserAuth'
import { useDispatch } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import { useRouter } from 'next/router'

export default function Navbar({ Gclick, GCclick }: { Gclick: () => void, GCclick: () => void }) {

    const [userClick, setUserClick] = useState<boolean>(false)

    const data = useSelector((state: any) => {
        return state.user;
    })





    return (
        <div className={styes.navarea}>
            <div className={styes.nav}>
                <div className={styes.nev1}>
                    <Image
                        src={neologo}
                        className={styes.neologo}
                        alt=''
                    />
                    <h3 style={{
                        marginLeft: '10px',
                        color: Colors.lightColors.blue04
                    }}>
                        Neotron
                    </h3>
                </div>
                <div className={styes.nev1sp}>
                    <div
                        className={styes.userI}
                        onClick={(e) => Gclick()}
                    >
                        <Icon
                            className={styes.usr}
                            icon={"icon-park-solid:game"}
                            width={27}
                        />
                        Games
                    </div>

                    <div
                        className={styes.userI}
                        onClick={(e) => GCclick()}>
                        <Icon
                            className={styes.usr}
                            icon={"basil:gamepad-solid"}
                            width={30}
                        />
                        Controller
                    </div>
                </div>
                <div className={styes.nev2}>
                    <UserSettings
                        click={userClick}
                        userdata={data}
                    />

                    <div className={styes.userI}>
                        <Icon
                            className={styes.usr}
                            icon={"basil:settings-solid"}
                            width={30}
                        
                        />
                    </div>

                    <div
                        className={styes.userI}
                        onClick={(e) => {
                            e.preventDefault();
                            setUserClick(!userClick)
                        }}
                    >
                        <Icon
                            className={styes.usr}
                            icon={"basil:user-solid"}
                            width={30}
                        />
                    </div>

                </div>
            </div>
        </div>
    )
}



function UserSettings({ click, userdata }: { click: boolean, userdata: DataFatchTypeOfUser }): React.JSX.Element {


    const [ShowPopup, setShowPopup] = useState<boolean>(false)

    let dispatch = useDispatch();
    let route = useRouter();

    useEffect(() => {

    }, [userdata])


    return (
        <div
            className={styes.usrSett}
            style={{
                display: !click ? "none" : "block"
            }}>
            <ToastContainer
                style={{
                    position: 'fixed',
                    right:0,
                    top:0,
                }}
            />
            <ConditionPopup
                Show={ShowPopup}
                Text={<p>Are u sure,<br />You want to logout?</p>}
                CancleClick={() => setShowPopup(false)}
                OKClick={() => {
                    let auth = new Auth(dispatch)
                    auth.logout()
                        .then(yey => {
                            toast.success("Successfully Logout", {
                                theme: 'dark',
                                autoClose: 1000,

                            })
                            setShowPopup(false)
                            setTimeout(() => {
                                window.location.reload()
                            }, 2000);
                        })
                        .catch(ans => {
                            toast.warn("You already logout!", {
                                theme: 'dark',
                                autoClose: 1000,
                            })
                            setShowPopup(false)
                            setTimeout(() => {
                                window.location.reload()
                            }, 2000);
                        })
                }}
            />
            <ul className={styes.choch}></ul>
            <div className={styes.Aslibox}>
                <div className={styes.profile}>
                    <div className={styes.bxs}>
                        {userdata?.userDetails?.UEmail}
                        <div className={styes.gool}>
                            <Icon
                                icon={"basil:user-solid"}
                                width={40}
                                id={styes.usr}
                            />
                        </div>
                    </div>
                </div>
                Hii! {userdata?.userDetails?.Uname}
                <div className={styes.sttng}>


                    <div
                        className={styes.stt}
                        onClick={() => { route.push("/auth/login") }}
                    >
                        <b>
                            <Icon
                                icon={'basil:user-plus-solid'}
                                width={30}
                            />
                        </b>
                        <a>
                            Add another account
                        </a>
                    </div>

                    <div
                        className={styes.stt}
                        onClick={() => setShowPopup(true)}
                    >
                        <b>
                            <Icon
                                icon={'basil:logout-solid'}
                                width={30}
                            />
                        </b>
                        <a>
                            Sign out from account
                        </a>
                    </div>

                </div>
            </div>
        </div>
    )
}
