export default function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 text-sm text-slate-600 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} HostelStay. All rights reserved.</p>
        <p>
          Built in Greater Noida Clean rooms, honest pricing, student-friendly.
        </p>
      </div>

     <div className="grid md:grid-cols-2 gap-10 ml-4 ">
        {/* Left Side */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold leading-snug">
            Join now <br />
          </h2>
          <p className="text-gray-900 mt-4 max-w-md ">
            Stop thinking of something when you can have it! Contact us now and
            make a rocket out of your website.
          </p>
          <p className="mt-6 mb-4 text-sm text-gray-700 hover:underline">
            <a href="#">
            Privacy Policy 
            </a>
            </p>
            <p className="mt-2 mb-2 text-sm font-bold hover:underline">
            <a href="https://rixhavportfolio.vercel.app/" target="_blank" className="hover:underline ">Developer </a>
            </p>
        </div>

        {/* Right Side */}
        <div className="flex flex-col space-y-6">
          <div>
            <h3 className="text-gray-400 uppercase text-sm">your feedback</h3>
            <a
              href="mailto:hello@unikorns.work"
              className="text-lg font-semibold hover:underline"
            >a1hostel@official.in
            </a>
          </div>

          <div>
            <h3 className="text-gray-400 uppercase text-sm">social media</h3>
            <ul className="space-y-2">
              <li><a href="#" target='_blank' className="hover:underline">Instagram</a></li>
              {/* <li><a href="#" className="hover:text-purple-400">Facebook</a></li> */}
              <li><a href="#" target='_blank' className="hover:underline">Facebook</a></li>
             
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
