import Link from "next/link";

export default function PageNotFound() {
  return (
    <main>
      <div className="max-w-screen-xl px-4 flex items-center justify-start  h-[40vh] md:px-8">
        <div className="max-w-lg mx-auto   text-center">
          <h3 className="text-indigo-600 font-semibold">404 Error</h3>
          <p className="text-gray-800 text-4xl font-semibold sm:text-5xl">
            Page not found
          </p>
          <p className="text-gray-600 my-4">
            Sorry, the page you are looking for could not be found or has been
            removed.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href={"/"}
              className="bg-blue-500 rounded-xl text-white p-2"
            >
              Go Home Page
            </Link>
            <Link
              href={"/cart"}
              className="bg-black rounded-xl text-white p-2"
            >
              View Cart
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
