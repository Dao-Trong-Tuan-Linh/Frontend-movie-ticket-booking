
export interface ISeats {
    name:string
}
export interface IUserShowtime{
    _id:string,
    filmName:string,
    startDate:string,
    startTime:string,
    seats:ISeats[]
}

export interface OrderState {
    loading:boolean,
    dataOrder:{
        userShowtime:IUserShowtime[]
    }
}