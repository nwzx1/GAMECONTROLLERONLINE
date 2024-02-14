import Colors from "@/colors/Color";
import styles from "@/styles/register.module.css";
import TextfieldofRegister from "@/components/textfield";
import React, { useEffect, useState } from "react";
import SubmitButton from "@/components/submitButton";
import backend from "@/backend/backend";
import { objmsg, val } from "@/logic/validation";
import { Icon } from "@iconify/react";
import { useDispatch } from "react-redux";
import { Structs } from "../../Redux_config/Authentication/UserAuth";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import Link from "next/link";
import Progress from "@/components/progress";


type Usr = {
  Uname: String | any | null,
  Uemail: String | any | null,
  Upass: String | any | null,
}

export default function Register(): JSX.Element {


  const dispatch = useDispatch();
  let route = useRouter()

  const [eye, setEye] = useState<boolean>(false)
  const [vl, setvl] = useState<objmsg>({ status: false })
  const [load, setload] = useState<boolean>(true);

  const [usr, setUsr] = useState<Usr>({
    Uemail: "",
    Uname: "",
    Upass: "",
  });




  // ================== use Effects ==========================

  useEffect(() => {

  }, [])

  useEffect(() => {
    let ans = val.validate({
      Uemail: usr.Uemail,
      Upass: usr.Upass,
      Uname: usr.Uname
    })
    setvl({
      status: ans.status,
      message: ans.message,
      attribute: ans.attribute
    })

  }, [usr])


  // ============== func =============================




  function onCng(e: React.ChangeEvent<HTMLInputElement>) {
    setUsr({
      ...usr,
      [e.target.name]: e.target.value,
    });
  }

  function clikus(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    if (vl.status == true) {
      backend.POST_User({
        Unme: usr.Uname,
        Ueml: usr.Uemail,
        Upss: usr.Upass
      }).then((ans:any) => {
        if (ans != null) {
          let struct = new Structs(dispatch)
          struct.handleRegistration({
            UEmail: ans["UEmail"],
            Uname: ans["Uname"],
            Uid: ans["_id"],
            UcreatedTime: ans["UcreatedDate"]
          })
          route.push("/auth/login")
        } else {
          toast.error("No internet connection")
        }
      }).catch(err => {
        toast.error(err)
      })


    }
  }

  return (
    <>
      {load ? <div style={{ display: 'flex', justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
        <Progress
          duration={0.5}
          forTop={true}
          getspeed={(speed) => {
            setload(speed)
          }}
        />
      </div> :
        <>
          <ToastContainer
            theme='dark'
            autoClose={3000}
          />
          <div className={styles.outbox}>
            <div className={styles.inbox}>
              <div className={styles.inbox1}>

              </div>
              <div className={styles.inbox2}>
                {/* ssstart */}
                <div className={styles.welcm}>
                  <div className={styles.wlm}>
                    welcome
                  </div>
                </div>
                <div className={styles.login}>
                  Register new account
                </div>

                <TextfieldofRegister
                  title={"Email"}
                  type={"Email"}
                  placetext={"Example@gmail.com"}
                  onchng={(e: React.ChangeEvent<HTMLInputElement>) => onCng(e)}
                  val={usr?.Uemail}
                  nme="Uemail"
                  icon="iconoir:mail"
                // onClk={(e:any)=> {}}
                />
                <TextfieldofRegister
                  title={"Username"}
                  type={"text"}
                  placetext={"name123"}
                  onchng={(e: any) => onCng(e)}
                  val={usr?.Uname}
                  nme="Uname"
                  icon="iconoir:user"
                // onClk={(e:any)=> {}}
                />
                <TextfieldofRegister
                  title={"Password"}
                  type={eye == false ? "password" : "text"}
                  placetext={"*********"}
                  onchng={(e: any) => onCng(e)}
                  val={usr?.Upass}
                  nme="Upass"
                  icon={`iconoir:${eye == false ? 'eye-empty' : 'eye-off'}`}
                  onClk={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                    eye ? setEye(false) : setEye(true)
                  }}
                />
                {/* validate */}
                {vl.status == false ? <div style={{
                  paddingTop: "5px",
                  width: "80%",
                  height: "1rem",
                  display: "flex",
                  // justifyContent:"center",
                  alignItems: "center",
                  fontSize: "0.7rem",
                  color: "red"

                }}>
                  <Icon
                    icon={"gg:close-o"}
                    color={"red"}
                    width={15}
                    style={{
                      marginRight: "10px"
                    }}
                  />
                  {vl.message}
                </div> : ""}
                <SubmitButton
                  disable={!vl.status}
                  onClk={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => clikus(e)}
                />

                {/* ssstart */}
                <div>
                  Already have an accound?{" "}
                  <Link href={"/auth/login"}>Sign in</Link>
                </div>
              </div>
            </div>
          </div></>}
    </>
  );
}
