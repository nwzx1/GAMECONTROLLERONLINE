import React, { useEffect, useState } from "react";
import Register from "./auth/register";
import {userStoreType} from "@/backend/backend"
import Home from "../components/page/Home";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { Structs } from "@/Redux_config/Authentication/UserAuth";
import Datafatch from "@/components/datafatch";
import Progress from "@/components/progress";

export default function main(user:any): JSX.Element {

  const [load,setLoad] = useState<boolean>(true)

  return <>
          {load ?
          <Progress
             forTop={true}
             duration={0.5}
             getspeed={(speed) => {
              setLoad(speed)
             }}
           /> :
           <Home user={user}/>}
         </>
  }