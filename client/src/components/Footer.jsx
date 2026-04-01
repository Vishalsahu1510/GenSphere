import { assets } from "../assets/assets"



const Footer = () => {
  return (
    <footer className="px-6 md:px-16 lg:px-24 xl:px-32 pt-10 w-full text-slate-300">
      <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-white/10 pb-8">
        <div className="md:max-w-96">
            <img className="h-9" src={assets.logo} alt="Logo"/>
            <p className="mt-6 text-sm">
                Experience the power of AI with GenSphere. <br/> Transform your content creation with our suite of premium AI tools. Write articles, generate images, and enhance your workflow.
            </p>
        </div>
        <div className="flex-1 flex items-start md:justify-end gap-20">
            <div>
                <h2 className="font-heading font-semibold mb-5 text-slate-100">Company</h2>
                <ul className="text-sm space-y-2 text-slate-300">
                    <li><a href="#">Home</a></li>
                    <li><a href="#">About us</a></li>
                    <li><a href="#">Contact us</a></li>
                    <li><a href="#">Privacy policy</a></li>
                </ul>
            </div>
            <div>
                <h2 className="font-heading font-semibold text-slate-100 mb-5">Subscribe to our newsletter</h2>
                <div className="text-sm space-y-2">
                    <p>The latest news, articles, and resources, sent to your inbox weekly.</p>
                    <div className="flex items-center gap-2 pt-4">
                        <input className="border border-white/10 bg-white/5 placeholder:text-slate-500 focus:ring-2 ring-indigo-500 outline-none w-full max-w-64 h-9 rounded-md px-3 text-slate-100" type="email" placeholder="Enter your email"/>
                        <button className="bg-primary w-24 h-9 text-white rounded-md cursor-pointer hover:opacity-95">Subscribe</button>
                    </div>
                </div>
            </div>
        </div>
      </div>
      <p className="pt-4 text-center text-xs md:text-sm pb-5">
          Copyright 2025 © Vishal Sahu. All Right Reserved.
      </p>
    </footer>
  )
}

export default Footer