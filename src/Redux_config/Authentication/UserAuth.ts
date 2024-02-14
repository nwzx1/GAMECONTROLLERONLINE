import { useDispatch } from "react-redux";
import { registerUser } from "../slices/userSlice";
import { Dispatch, UnknownAction } from "redux";
import backend from "@/backend/backend";



class StructsofUserAuth {

  private dispatch?: Dispatch;

  constructor(dispatch: Dispatch<UnknownAction>) {
    this.dispatch = dispatch;
  }

  handleRegistration = ({ Uid, UEmail, Uname, UcreatedTime, login = false }: {
    Uid: string,
    UEmail: string,
    Uname: string,
    UcreatedTime?: string,
    login?: boolean,


  }) => {
    const userId = Uid;
    const userDetails = {
      UEmail: UEmail,
      Uname: Uname,
      UcreatedTime: UcreatedTime,
      login: login
    };
    localStorage.setItem("USER_AUTH", userId)

    this.dispatch!(registerUser({ userId, userDetails }));
  };

  handleRegistrationOverload = ({ Uid, UEmail, Uname, UcreatedTime, login = false }: {
    Uid: string,
    UEmail: string,
    Uname: string,
    UcreatedTime?: string,
    login?: boolean,


  }) => {
    const userId = Uid;
    const userDetails = {
      UEmail: UEmail,
      Uname: Uname,
      UcreatedTime: UcreatedTime,
      login: login
    };

    this.dispatch!(registerUser({ userId, userDetails }));
  };



  handleuserdetailispresence() {
    if (typeof localStorage !== 'undefined') {

      let usrid = localStorage.getItem("USER_AUTH")
      if (usrid != null) {
        backend.GET_UserbyId(usrid)
          .then(ans => {
            const userId = ans["_id"];
            const userDetails = {
              UEmail: ans["UEmail"],
              Uname: ans["Uname"],
              UcreatedTime: ans['UcreatedTime'],
              login: true
            };

            this.dispatch!(registerUser({ userId, userDetails }));

          })
        return true
      } else {
        return false
      }

    }
  }

}

class Auth extends StructsofUserAuth {


  logout() {
    return new Promise((resolve, reject) => {
      let ans: string | null = localStorage.getItem("USER_AUTH")
      if (ans != null) {
        localStorage.removeItem("USER_AUTH")
        resolve(true)
      } else {
        reject(false)
      }
    })

  }
}




export { StructsofUserAuth as Structs,Auth }
