export interface IShowtime{
    _id:string,
    filmId:string,
    date:string,
    time:string,
    available:boolean,
    money:string
}

export interface INowShowing{
    _id:string,
    name:string,
    image:string
}

export interface ShowtimeState{
    loading:boolean,
    dataShowtime:{
        allShowtime:IShowtime[],
        rowNowShowing:INowShowing[]
        detailShowtime:IShowtime
    }
}