import useFetch from "./useFetch";

export default function getAllProduct(){
return useFetch("https://fakestoreapi.com/products")
}