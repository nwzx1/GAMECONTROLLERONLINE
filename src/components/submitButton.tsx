import React from 'react'
import style from "@/styles/components.module.scss"
import { Icon } from "@iconify/react";

export default function SubmitButton({
    texttitle = "Submit",
    disable = false,
    onClk = () => {}
  } : {
    texttitle?: string,
    disable?: boolean,
    onClk?: Function,
  }): React.JSX.Element {
  return (
    <div className={style.btnbox}>
        
        <button 
            disabled={disable}
            className={style.btn}
            onClick={(e) => onClk(e)}
        >
          <Icon
             icon={"formkit:submit"}
             width={15}
             className={style.icn}
          />
          <div className={style.txtic}>
          {texttitle}
          </div>
        </button>
    </div>
  )
}
