
type objmsg = {
    status:boolean,
    attribute?:string,
    message?:string
}


class Validation {



    private EmailVld(UEml:string):objmsg {
        if(UEml == '') {
            return {
                status:false,
                attribute:"UEmail",
                message:"Email cant be empty"
            }
        }
        const Eml:RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(Eml.test(UEml) == false) {
            return {
                status:false,
                attribute:"UEmail",
                message:"Email is not valid"
            }
        }
        else {
            return {
                status:true,
                attribute:"UEmail",
                message:""
            }
        }
    }

    // {
    //     status:false,
    //     message:"Password should be more then 8 caracter"
    // }

    public PassVld(Upass:string):objmsg{

        if(Upass == '') {
            return {
                status:false,
                attribute:"Upass",
                message:"Password cant be empty"
            }
        }
        if(Upass.length <= 8 ) {
            return {
                status:false,
                attribute:"Upass",
                message:"Password should be more then 8 caracter"
            }
        }
        const pattern:RegExp = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-])\S{8,}$/;
        if(pattern.test(Upass) == false) {
            return {
                status:false,
                attribute:"Upass",
                message:"Password is not Strong use first later uppercase or some number and spacial caracters"
            }
            
        } 
        else {
            return {
                status:true,
                attribute:"Upass",
                message:""
            }
        }
    }

    public UnameVld(Uname:string): objmsg {
        
        if (Uname == "") {
            let onj:objmsg =  {
                status:false,
                attribute:"Uname",
                message:"Username cant be Empty"
            }
           return onj
        }
        if(Uname.length <= 6 ) {
            let onj:objmsg =  {
                status:false,
                attribute:"Uname",
                message:"Username should be more then 6 caracter"
            }
           return onj
        }
        else {
            let onj:objmsg =  {
                status:true,
                attribute:"Uname",
                message:""
            }
            return onj
        }

    }



    public validate({Uname,Uemail,Upass}:
        {
            Uname:string,
            Uemail:string,
            Upass:string 
        }): objmsg
        {
            if(this.EmailVld(Uemail).status == false) {
                return {
                        status:false,
                        attribute:"UEmail",
                        message:this.EmailVld(Uemail).message
                    }
            } 
            if(this.UnameVld(Uname).status == false) {
                return {
                        status:false,
                        attribute:"Uname",
                        message:this.UnameVld(Uname).message
                    }
            }  
            if(this.PassVld(Upass).status == false) {
                return {
                        status:false,
                        attribute:"Upass",
                        message:this.PassVld(Upass).message
                    }
            } 
            else {
                return {
                    status:true,

                }
            }
        }
}
let val = new Validation()

export {val,type objmsg}