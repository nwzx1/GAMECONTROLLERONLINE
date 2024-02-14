import React from 'react'
import styles from '@/styles/components.module.scss'

function ConditionPopup({ Text, Show, CancleClick, OKClick }: {
    Text: any,
    Show: boolean,
    CancleClick: () => void,
    OKClick?: () => void,
}) {
    return (
        <div
            className={styles.pag}
            style={{
                display: !Show ? "none" : 'flex',
            }}
        >
            <div className={styles.box11}>
                <div className={styles.one}>
                    {Text}
                </div>
                <div className={styles.two}>
                    <div
                        className={styles.btn}
                        onClick={CancleClick}
                    >Cancle</div>

                    <div
                        className={styles.btn}
                        onClick={OKClick}
                    >Ok</div>
                </div>
            </div>
        </div>
    )
}

export default ConditionPopup