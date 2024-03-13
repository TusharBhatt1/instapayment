import ProductListing from "@/components/ProductListing"
import WishLists from "@/components/wishlistSideBox/WishLists"

export default async function Home() {
    
return(
    <div className="flex justify-between items-start px-7 sm:px-16 gap-12">
      <ProductListing  />
      <div>
        <WishLists/>
      </div>
    </div>
   
)
}