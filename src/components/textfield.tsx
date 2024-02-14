import React from 'react'
import styles from "../styles/components.module.scss"
import {Icon} from "@iconify/react"
import Colors from '@/colors/Color'


export default function Textfield({
  title,type,placetext,onchng,val,nme,icon,onClk = () => {},
} : {
  nme:string,
  title: string,
  type: string,
  placetext: string
  onchng: Function,
  val: number | string | boolean | any,
  icon : string,
  onClk?: Function,

}):JSX.Element {

  return (
    <div className={styles.inpbox}>
        <div className={styles.txt}>{title}</div>
          <div className={styles.mixBox}>
            <input 
                type={type} 
                name={nme}
                placeholder={placetext}
                onChange={(e) => onchng(e)}
                value={val}
                className={styles.inp}
            />
            <div 
                className={styles.logo}
                onClick={e => onClk(e)}
                
            >  
                <Icon 
                    icon={icon}
                    color={Colors.lightColors.iconblue01}
                    width={25} 
                  />
            </div>
          </div>
    </div>
  )
}
