"use client";
import { userInfo } from "@/api/userInfo";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"
import { toast } from "sonner";

type UserInfo = {
  creation_date: string;
  email: string;
  user_uuid: string;
  username: string;
  verified: boolean;
};

export default function DashboardPage() {

  const [data, setData] = useState<UserInfo | null>(null);
  const [error, setError] = useState(false)
  
  const fetchData = async () => {
    try {
      const response = await userInfo();
      console.log(response.data)
      setData(response.data)
    } catch (error) {
      setError(true);
      toast.error(`${error}`)
    } finally {
      setError(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div className="flex flex-col items-center justify-center relative">
      <h1>here wlc</h1>
      <p>Your profile data goes here.</p>
      <Button variant="destructive"
      >Logout</Button>
      {data && (
        <>
          <p>Username: {data.username}</p>
          <p>Email: {data.email}</p>
          <p>User UUID: {data.user_uuid}</p>
          <p>Verified: {data.verified ? 'Yes' : 'No'}</p>
          <p>Creation Date: {new Date(data.creation_date).toLocaleString()}</p>
        </>
      )}
      </div>
  );
}