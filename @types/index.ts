export interface ProductType{
    id:number,
    title:string,
    image:string,
    price:number,
    quantity:number,
    description:string,
}
export interface WishList {
    listName: string;
    listItems: ProductType[];
  }
export interface Response{
    success:boolean,
    data:{
        products:ProductType[]
    }
}
