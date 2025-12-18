// src/components/admin/QuickActions.jsx
import Link from "next/link";

export default function QuickActions({ action }) {
  return (
    <Link href={action.href}>
      <div className="flex items-start p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer">
        <div className="flex-shrink-0">
          <div className="bg-sky-100 dark:bg-indigo-900/50 rounded-md p-2">
            <action.icon className="h-6 w-6 text-sky-600 dark:text-sky-400" />
          </div>
        </div>
        <div className="ml-4">
          <h3 className="text-base text based form font-medium text-gray-900 dark:text-white">{action.name}</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{action.description}</p>
        </div>
      </div>
    </Link>
  );
}