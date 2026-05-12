import { Link } from "react-router-dom";

function AppLayout({ children }) {

  return (

    <div className="min-h-screen bg-slate-950 text-white flex">

      <aside className="w-72 bg-slate-900 border-r border-slate-800 p-6">

        <h1 className="text-3xl font-bold text-cyan-400 mb-10">
          Resume Builder
        </h1>

        <nav className="flex flex-col gap-4">

          <Link
            to="/"
            className="bg-slate-800 hover:bg-slate-700 px-4 py-3 rounded-xl transition"
          >
            Dashboard
          </Link>

        </nav>

      </aside>

      <main className="flex-1 p-8">
        {children}
      </main>

    </div>

  );
}

export default AppLayout;