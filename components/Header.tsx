interface HeadingProps {
  title: string;
  subtitle?: string;
}

export default function Heading({ title, subtitle }: HeadingProps) {
  return (
    <div className="w-[1/2] mt-2">
   <p className='text-lg inline-block sm:text-xl p-4 sm:mt-2'>
    {title}
    <hr className="border-2 border-black"/>
    </p>
    </div>
  )
}
