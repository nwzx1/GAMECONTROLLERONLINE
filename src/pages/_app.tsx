import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { Figtree } from "next/font/google"
import { useEffect, useLayoutEffect, useState } from "react";
import { Provider } from "react-redux";
import store from "@/Redux_config/store";
import backend, { userStoreType } from "@/backend/backend";
import {redirect, useRouter} from "next/navigation";
import { Structs } from "@/Redux_config/Authentication/UserAuth";
import { useDispatch } from "react-redux";



const figree = Figtree({
  subsets:["latin"]
})

export default function App({ Component, pageProps }: AppProps): JSX.Element {

  const [userin,setUserin] = useState<userStoreType>()
  const route = useRouter()


  useLayoutEffect(() => {
    backend.getUserIdfromLocalstore()
    .then(ans => {
      if(ans?.Uid != null || undefined) {
        setUserin(ans)
      }else {
        route.replace("/auth/login")
      }
    })
    .catch(err => console.log(err))
  },[])


  return (
    <Provider store={store}>
      <main className={figree.className}>
        <Component {...pageProps} user={userin} />
      </main>
    </Provider>
  );
}
