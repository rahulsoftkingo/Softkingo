// src/components/admin/RecentActivity.jsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function RecentActivity({ activities }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start">
              <div className="relative flex-shrink-0">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10" />
                <div className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-400 ring-2 ring-white dark:ring-gray-800" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {activity.user} <span className="font-normal text-gray-500 dark:text-gray-400">{activity.action}</span> {activity.target}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <button className="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
            View all activity
          </button>
        </div>
      </CardContent>
    </Card>
  );
}