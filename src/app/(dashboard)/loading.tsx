export default function DashboardLoading() {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center p-6 space-y-4">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-t-2 border-cyan-500 dark:border-primary animate-spin shadow-[0_0_15px_rgba(0,243,255,0.5)]"></div>
        <div className="absolute inset-2 rounded-full border-r-2 border-blue-500 animate-spin-reverse"></div>
      </div>
      <p className="text-gray-500 dark:text-textMuted font-medium animate-pulse">
        Loading system modules...
      </p>
    </div>
  );
}
