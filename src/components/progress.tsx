import React, { useEffect, useState } from 'react'
import styles from '@/styles/components.module.scss'

export default function Progress({
    forTop = false,duration = 5,getspeed
}: {

    forTop?: boolean,
    duration?: number,
    getspeed: (speed:boolean) => void
}) {


    const [val,setval] = useState<number>(0)
    let steps:number = 100;
    useEffect(() => {
        const interval = duration / steps;
    
        const progressInterval = setInterval(() => {
          setval((val) => val + 1 / steps);
    
          if (val >= 1) {
            clearInterval(progressInterval);
          }

        }, interval * 1000);
        return () => clearInterval(progressInterval);
      }, []);

    useEffect(() => {
        let dur = (duration + 0.5) * 1000
        setTimeout(() => {
          getspeed(false)
        },dur)
    },[])


    return (
        <progress
            max={1}
            value={val}
            
            className={styles.prog}
            style={forTop == false ? {
                position: 'relative',
                width: "500px",
                height: "0.3rem",
                margin:"15px"
            } : {
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "0.2rem",
                margin:"0px"
            }}
        ></progress>
    )
}

