"use client";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { userInfo } from "@/api/userInfo";

type UserInfo = {
  creation_date: string;
  email: string;
  user_uuid: string;
  username: string;
  verified: boolean;
};

export default function DashboardPage() {
  const [data, setData] = useState<UserInfo | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await userInfo();
        setData(response.data);
      } catch (error) {
        setError(true);
        toast.error(`Failed to fetch user info: ${error}`);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="grid auto-rows-min gap-4 md:grid-cols-3">
      <div className="aspect-video rounded-xl bg-muted/50" />
      <div className="aspect-video rounded-xl bg-muted/50" />
      <div className="aspect-video rounded-xl bg-muted/50" />
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
        {data ? (
          <div className="p-4">
            <h1 className="text-xl font-semibold">Welcome, {data.username}</h1>
            <p>Email: {data.email}</p>
            <p>Verified: {data.verified ? "Yes" : "No"}</p>
            <p>Account Created: {new Date(data.creation_date).toLocaleString()}</p>
          </div>
        ) : error ? (
          <p className="text-red-500">Failed to load user data.</p>
        ) : (
          <p>Loading user data...</p>
        )}
      </div>
    </div>
  );
}
