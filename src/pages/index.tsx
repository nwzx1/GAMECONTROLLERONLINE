import React, {useState } from "react";
import Home from "../components/page/Home";
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