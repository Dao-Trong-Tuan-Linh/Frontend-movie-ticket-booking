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
    email?:string
}

interface DataUser {
    user:IUser
}
export interface IAuth {
    user?:IUser,
    token?:string
}

export interface AuthState {
    loading:boolean,
    error:string,
    data:IAuth
}

export interface IRegister {
   user:{
    name:string,
    email:string
   }
}

export interface ILogin {
    token:string
}