import useFetch from "./useFetch";

export default async function getRandomcart() {
   return useFetch("https://groww-intern-assignment.vercel.app/v1/api/order-details")
}
