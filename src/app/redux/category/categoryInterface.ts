export interface CategoryParams {
    name:string
}

export interface ICategory{
    _id?:string,
    name?:string
}



export interface CategoryState {
    loading:boolean,
    dataCategory:{
        allCategories:ICategory[]
        detailCategory:ICategory
    }
}