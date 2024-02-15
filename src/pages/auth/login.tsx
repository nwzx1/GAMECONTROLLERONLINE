import React, { useEffect, useState } from 'react'
import styles from '@/styles/login.module.css'
import Colors from '@/colors/Color'
import Progress from '@/components/progress'
import Image from 'next/image'
import logo from '@/assets/svgs/logo1.svg'
import { Icon } from '@iconify/react/dist/iconify.js'
import { objmsg, val } from '@/logic/validation'
import backend from '@/backend/backend'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router'
import {Structs} from "../../Redux_config/Authentication/UserAuth";
import { useDispatch } from 'react-redux'
import Head from 'next/head'
import Link from 'next/link'




export default function Login(user: any) {

  const [load, setload] = useState<boolean>(true);
  const [pass,setPass] = useState<string>("");
  const [uname,setUname] = useState<string>("");
  const [nxt,setNxt] = useState<boolean>(false);

  const [Uvl,setUvl] = useState<objmsg>();
  const [Pvl,setPvl] = useState<objmsg>();


  const route = useRouter()
  const dispatch = useDispatch()


  useEffect(() => {
    if (uname != "") {
      let ans = val.UnameVld(uname)
      setUvl(ans)
    }
  }, [uname])

  useEffect(() => {
    if (pass != "") {
      let ans = val.PassVld(pass)
      setPvl(ans)
    }
  }, [pass])

  // useEffect(() => {
  //   setTimeout(() => {
  //     setload(false)
  //   }, 1000);
  // }, [])




  return (
    <div className={styles.bgs}>
      <ToastContainer
         position="top-right"
         autoClose={1000}
         hideProgressBar={true}
         theme='dark'
      />
      {load ? <div style={{ display: 'flex', justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
        Loading...
        <Progress 
          duration={0.5} 
          forTop={true}
          getspeed={(speed) => {
            setload(speed)
          }} 
        />
      </div> :
        <div className={styles.mid}>
          <div className={styles.mid1}>
            <Image
              src={logo}
              className={nxt ? styles.logo1 : styles.logo2}
              alt=''
              property=''
            />Neotron login
          </div>
          
          <div className={styles.mid2}>

          {/* //=============================> Username Start <============================/ */}
          
          {!nxt ? <>
            <div style={{width:'85%',height:"1rem",margin:"auto",marginBottom:"0px"}}>Username</div>
            <input 
                 type="text" 
                 name="Uname" 
                 id="" 
                 value={uname}
                 onChange={(e) => {
                  setUname(e.target.value)
                }}
                 style={Uvl?.status == false ? {border:"2px solid red"} : {border:"0px solid red"}}
                 className={styles.inpN}
              />
              <div style={{width:"20rem",height:"4rem",position:"absolute",marginTop:"12rem"}}>
            <button 
              disabled={Uvl?.status ? false : true}
              className={styles.btn4}
              onClick={async () => {
                if (Uvl!.status == true) {
                  let ans = await backend.GET_UserbyKeyValue({key:"Uname",val:uname})
                  if (ans?.length != 0) {
                    if (ans[0]["Uname"] == uname) {
                       setNxt(!nxt);
                    }else {
                      toast.warning("User not found")
                    }
                  }else {
                    toast.warning("User not found")
                  }
                }
              }}
              >
                <Icon
                  icon={"iconoir:arrow-right-circle"}
                  width={40}
                  color={Colors.lightColors.blue02}
                />
              </button>
          </div>
            </> 

            //=============================> Username end <============================/
            : 
            <>
            {/* //=============================> Password start <============================/ */}

            <div style={{width:'85%',height:"1rem",margin:"auto",marginBottom:"0px"}}>Password</div>
            <input 
                 type="password" 
                 name="Password" 
                 id="" 
                 value={pass}
                 onChange={(e) => {
                  setPass(e.target.value)
                }}
                 style={Pvl?.status == false ? {border:"2px solid red"} : {border:"0px solid red"}}
                 className={styles.inpN}
              />

            <div style={{
              width:"20rem",
              height:"4rem",
              position:"absolute",
              marginTop:"12rem",
              display:"flex",
              }}>
            <button 
              // disabled={Pvl?.status ? false : true}
              className={styles.btn5}
              onClick={async () => { 
                setNxt(!nxt);
              }}
              >
                <Icon
                  icon={"iconoir:arrow-left-circle"}
                  width={40}
                  color={Colors.lightColors.blue02}
                />
              </button>
              <button 
              disabled={Pvl?.status ? false : true}
              className={styles.subbtn}
              onClick={async () => {
                if (Pvl!.status == true) {
                  let ans1 = await backend.GET_UserbyKeyValue({key:"Upassword",val:pass})
                  if (ans1?.length != 0) {
                    if (ans1[0]["Upassword"] == pass && ans1[0]["Uname"] == uname) {
                      let ans = ans1[0];

                      if (ans != null) {
                        let struct = new Structs(dispatch)
                        struct.handleRegistration({
                          UEmail:ans["UEmail"],
                          Uname:ans["Uname"],
                          Uid:ans["_id"],
                          UcreatedTime:ans["UcreatedDate"]
                        })
                        toast.success("Login Successfuly",{
                          position:"top-right",
                          autoClose:1000
                          
                        })
                        setTimeout(() => {
                          route.replace("/")
                        }, 1000);
                      }else {
                        toast.warning("No internet connection")
                      }

                    }else {
                      toast.warning("User not found")
                    }
                  }else {
                    toast.warning("User not found")
                  }
                }
              }}
              > Submit
                {/* <Icon
                  icon={"iconoir:arrow-left-circle"}
                  width={40}
                  color={Colors.lightColors.blue02}
                /> */}
              </button>
          </div>
          
          
          {/* //=============================> Password end <============================/ */}
            </> }   
              
          </div>
          <div style={{
            position:"absolute",
            marginTop: "5rem",
            textAlign:'center',
            width:'20rem'
            }}>
            <Link 
               href={"/auth/register"}
               style={{color:Colors.lightColors.blue04}}
               >Create new account</Link>  
          </div>
        </div>}
    </div>
  )
}
