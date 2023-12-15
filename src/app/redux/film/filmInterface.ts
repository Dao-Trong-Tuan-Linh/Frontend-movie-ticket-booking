export interface IFilm{
    _id:string,
    name:string,
    director:string,
    actors:string,
    time:number,
    category:string,
    date:string,
    image:string,
    content:string,
    language:string,
    rated:string,
    trailer:string
}

export interface FilmState{
    loading:boolean,
    dataFilm:{
        allFilms:IFilm[]
        detailFilm:IFilm
    }
}