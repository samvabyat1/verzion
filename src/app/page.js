"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { supabase } from "./supabase";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [projects, setprojects] = useState([]);
  const [isnew, setisnew] = useState(true);
  const [disabled, setdisabled] = useState(true);

  useEffect(() => {
    fetchprojects();
  }, []);

  useEffect(() => {
    setisnew(isnew);
  }, [inputValue]);

  const router = useRouter();

  async function fetchprojects() {
    const { data } = await supabase.from("verzion").select("projectid");

    var arr = [];
    for (var i in data) {
      arr.push(data[i].projectid);
    }
    // console.log(arr)
    setprojects(arr);
    // console.log(data);
  }

  const handleRedirect = async () => {
    if (inputValue.trim()) {
      if (isnew) {
        await supabase
          .from("verzion")
          .insert([
            {
              projectid: inputValue.trim(),
              apks: "",
              apkcount: 0,
              defaulturl: "",
            },
          ])
          .select();
      }
      router.push(`/${inputValue.trim()}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center ">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-300 font-mono">Start a Project</h1>
      </header>
      <div className="flex flex-col items-center space-y-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setisnew(projects.indexOf(e.target.value) == -1);
            setdisabled(e.target.value == "" || e.target.value.indexOf(' ')!=-1 ? true : false);
          }}
          onSubmit={handleRedirect}
          placeholder="Enter your project name"
          className="px-4 py-2 w-64 border border-black  focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent text-black font-mono"
        />
        <button
          disabled={disabled}
          onClick={handleRedirect}
          className="px-6 py-2 w-full bg-white text-black font-semibold  hover:bg-gray-400 transition duration-300 disabled:bg-gray-900"
        >
          {isnew ? "Create" : "View"}
        </button>
      </div>
    </div>
  );
}
