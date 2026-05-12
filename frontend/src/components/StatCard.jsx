function StatCard({ title, value }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
      <h3 className="text-slate-400 text-lg mb-2">{title}</h3>

      <p className="text-4xl font-bold text-cyan-400">{value}</p>
    </div>
  );
}

export default StatCard;
