export interface IShowtime{
    _id:string,
    filmId:string,
    date:string,
    time:string,
    available:boolean,
    money:string
}

export interface ShowtimeState{
    loading:boolean,
    dataShowtime:{
        allShowtime:IShowtime[]
        detailShowtime:IShowtime
    }
}