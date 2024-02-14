import axios from "axios"

export type userStoreType = {
    Uid:string,
    UEmail:string,
    Uname:string,
    UcreatedTime:number,
    login?:boolean
}




export class Backend {

    private Url:string = "http://localhost:4000"

    async GET_AllUser() { 
        try {
            let res = await axios.get(this.Url+"/users",{
                withCredentials: false,
                headers:{
                    'Content-Type': 'text/plain'
                }
            })   
            return res.data
        } catch (error) {
            alert("no internet connnection")
        }    
        
    }

    async GET_UserbyId(id:string) { 
        try {
            let res = await axios.get(`${this.Url}/users/${id}`,{
                withCredentials: false,
                headers:{
                    'Content-Type': 'text/plain'
                }
            })   
            return res.data
        } catch (error) {
            
            return error
        }    
        
    }

    async GET_UserbyKeyValue({key,val}:{key:string,val:string}) {     

        try {
            let res = await axios.get(`${this.Url}/users/key/${key}/${val}`,{
                withCredentials: false,
                headers:{
                    'Content-Type': 'text/plain'
                }
            })   
            return res.data
        } catch (error) {
            alert("no internet connnection")
        }  
        
    }

    POST_User({
        Unme,
        Ueml,
        Upss
    }:{
        Unme:string,
        Ueml:string,
        Upss:string
    }) {   
        return new Promise((resolve,rejects) => {
            axios.post(`${this.Url}/users/`,{
                Uname:Unme,
                UEmail:Ueml,
                Upass:Upss
            },{
                withCredentials: false,
                headers:{
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                resolve(res.data)
            }).catch(err => {
                rejects(err)
            })
        })
    }



    async getUserIdfromLocalstore():Promise<userStoreType | undefined> {
        try {
            if (typeof localStorage !== 'undefined') {
    
                let usrid = localStorage.getItem("USER_AUTH")
                if (usrid != null) {
                    let ans = await this.GET_UserbyId(usrid)
                    if (ans != null) {
                        return {
                            Uid:ans["_id"],
                            UEmail:ans["UEmail"],
                            Uname:ans["Uname"],
                            UcreatedTime:ans["UcreatedDate"],
                        }
                    }
                }
                
              }
        } catch (error) {
            console.log(error)
        }
        
    }

}

export default new Backend()