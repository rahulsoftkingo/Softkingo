// src/components/admin/StatCard.jsx
import { cn } from "@/auth/utils";

export default function StatCard({ stat }) {
  return (
    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <stat.icon className="h-6 w-6 text-gray-400 dark:text-gray-500" />
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                {stat.name}
              </dt>
              <dd>
                <div className="text-lg font-medium text-gray-900 dark:text-white">
                  {stat.value}
                </div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
      <div className={cn(
        "px-5 py-3",
        stat.changeType === 'positive' ? 'bg-sky-50 dark:bg-sky-900/30' : 'bg-red-50 dark:bg-red-900/30'
      )}>
        <div className="text-sm">
          <span className={cn(
            "font-medium",
            stat.changeType === 'positive' ? 'text-sky-800 dark:text-sky-200' : 'text-red-800 dark:text-red-200'
          )}>
            {stat.change}
          </span>{' '}
          <span className="text-gray-500 dark:text-gray-400">from last week</span>
        </div>
      </div>
    </div>
  );
}