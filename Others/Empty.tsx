import Image from 'next/image'
import empty from "@/public/empty.svg"

export default function Empty() {
  return (
    <div>
    <Image src={empty} height={150} width={150} alt='empty'/>
    </div>
  )
}
