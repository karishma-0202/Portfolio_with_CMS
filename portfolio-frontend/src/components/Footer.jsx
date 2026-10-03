import { Link } from 'react-router-dom'

function Footer() {
return ( <footer className="border-t border-slate-800 bg-slate-950 text-white"> <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 sm:flex-row sm:items-center sm:justify-between lg:px-8"> <div> <Link to="/" className="text-lg font-bold">
Karishma Shaik<span className="text-violet-400">.</span> </Link> <p className="mt-1 text-sm text-slate-400">
Building reliable software, one solution at a time. </p> </div>


    <div className="flex flex-wrap gap-5 text-sm text-slate-300">
      <a
        href="https://github.com/karishma-0202?tab=repositories"
        target="_blank"
        rel="noreferrer"
        className="hover:text-violet-300"
      >
        GitHub ↗
      </a>
      <a
        href="https://www.linkedin.com/in/karishma-shaik-847a4028a/"
        target="_blank"
        rel="noreferrer"
        className="hover:text-violet-300"
      >
        LinkedIn ↗
      </a>
      <a
         href="mailto:karishmashaik0202@gmail.com"
        
        className="hover:text-violet-300"
        >
         Email ↗
         
      </a>
      <Link to="/contact" className="hover:text-violet-300">
        Contact
      </Link>
    </div>

    <p className="text-sm text-slate-400">
      © {new Date().getFullYear()} Karishma Shaik
    </p>
  </div>
</footer>


)
}

export default Footer
