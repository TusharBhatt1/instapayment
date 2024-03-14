interface HeadingProps {
  title: string;
  subtitle?: string;
}

export default function Heading({ title, subtitle }: HeadingProps) {
  return (
    <div className="mt-2">
   <p className='text-lg border-black border-b-2 inline-block sm:text-xl p-2 sm:mt-2'>
    {title}
    {/* <hr className="border-2 border-black"/> */}
    </p>
    </div>
  )
}
