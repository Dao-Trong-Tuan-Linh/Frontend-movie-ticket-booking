export interface IMenu {
    _id:string,
    name:string,
    isActive:boolean,
    level:number,
    order:number,
    parentID:string,
    link:string
}



export interface MenuState {
    loading:boolean,
    error:string,
    dataMenu:{
        allMenu:IMenu[],
        detailMenu:IMenu
    }
}