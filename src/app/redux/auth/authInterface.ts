export interface RegisterParams {
    name:string,
    email:string,
    password:string,
    phone:string
}

export interface LoginParams {
    name:string,
    password:string
}

interface IUser {
    name?:string,
    role?:number
}


export interface IAuth {
    user?:IUser,
    token?:string
}

export interface AuthState {
    loading:boolean,
    error:string,
    dataAuth:IAuth
}

export interface IRegister {
   user:{
    name:string,
    role:number
   }
}

export interface ILogin {
    token:string
}