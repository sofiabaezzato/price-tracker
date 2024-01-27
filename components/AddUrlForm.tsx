"use client"

import supabaseClient from '@/lib/supabase-client';
import { useAuth } from '@clerk/nextjs';
import React, { useState } from 'react'
import { Input } from './ui/input';
import { Button } from './ui/button';
import { urls } from '@/app/dashboard/page';

type urlFormProps = {
  urls: urls[],
  setUrls: React.Dispatch<React.SetStateAction<urls[]>>
}

const AddUrlForm = ({ urls, setUrls } : urlFormProps) => {
  const { getToken, userId } = useAuth();
  const [newUrl, setNewUrl] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()

    if (newUrl === "") {
      return;
    }

    const supabaseAccessToken = await getToken({ template: "supabase" });
    const supabase = await supabaseClient(supabaseAccessToken);

    if (userId) {
      const { data } = await supabase
      .from("urls_tracked")
      .insert({ url: newUrl, user_id: userId })
      .select()

      if (data) {
        setUrls([...urls, data[0]]);
        
      }
    }
    
    setNewUrl("");
  };

  return (    
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input
        type="url"
        placeholder="Amazon Product URL"
        value={newUrl}
        onChange={e => setNewUrl(e.currentTarget.value)}
      />
      <Button
        type="button"
        onClick={e => handleSubmit(e)}
      >
        Start tracking
      </Button>
    </div>
  );
}


export default AddUrlForm