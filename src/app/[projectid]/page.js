"use client";

import { useState, useEffect } from "react";
import { supabase } from "../supabase";

export default function Project({ params }) {
  const [apks, setapks] = useState("");
  const [durl, setdurl] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    fetchapks();
    fetchdurl();
  }, []);

  useEffect(() => {
    setIsUploading(isUploading);
    fetchdurl();
    fetchapks();
  }, [isUploading]);

  // const { id } = await params;

  async function fetchapks() {
    const { data } = await supabase
      .from("verzion")
      .select("*")
      .eq("projectid", params.projectid);

    setapks(data[0]["apks"]);
    // console.log(apks);
  }

  async function fetchdurl() {
    const { data } = await supabase
      .from("verzion")
      .select("*")
      .eq("projectid", params.projectid);

    setdurl(data[0]["defaulturl"]);
    // console.log(apks);
  }

  const handleFileUpload = async (event) => {
    const newFile = event.target.files[0];
    const date = Date.now();
    if (newFile) {
      setIsUploading(true);
      const { data, error } = await supabase.storage
        .from("verzion")
        .upload(`${params.projectid}/${date}${newFile.name}`, newFile);

      const url = supabase.storage.from("verzion").getPublicUrl(data.path);

      console.log(url.data.publicUrl);

      const data2 = await supabase
        .from("verzion")
        .update({
          defaulturl: url.data.publicUrl,
          apks: apks.length != 0 ? apks + "," + data.path : data.path,
        })
        .eq("projectid", params.projectid)
        .select();
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen p-8">
      {/* Project Name Header */}
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold font-mono text-gray-300">
          project id: {params.projectid}
        </h1>
      </header>

      {/* List of Files */}
      <div className="max-w-2xl mx-auto bg-white  shadow-md p-6">
        <p className="text-black text-sm font-mono">Max file size is 50 mb</p>
        <label className="cursor-pointer bg-black text-white font-mono px-4 py-2  hover:bg-white hover:text-black border-2 border-black transition duration-300 block text-center mb-4">
          Upload File
          <input type="file" onChange={handleFileUpload} className="hidden" />
        </label>
        <p className="text-black font-mono">{isUploading ? "Uploading...." : ""}</p>
        <a
          href={durl}
          className="cursor-pointer bg-yellow-100 text-gray-700 font-mono whitespace-nowrap overflow-hidden text-ellipsis px-4 py-2  hover:bg-yellow-200 transition duration-300 block text-start mb-4"
        >
          default link: {durl}
        </a>
        <div className="flex">
        <a
          href={`/go/${params.projectid}`}
          className="flex-1 cursor-pointer bg-green-100 text-gray-700 font-mono whitespace-nowrap overflow-hidden text-ellipsis px-4 py-2  hover:bg-green-200 transition duration-300 block text-start mb-4"
        >
          download link: {window.location.host}/go/{params.projectid}
        </a>
        <button
          onClick={() => {
            navigator.clipboard.writeText(window.location.host+'/go/'+params.projectid);
          }}
          className="cursor-pointer bg-green-400 text-gray-700 whitespace-nowrap overflow-hidden text-ellipsis px-4 py-2  hover:bg-green-500 transition duration-300 block text-start font-mono mb-4"
        >
          <img src="/copy.png" />
        </button>

        </div>

        <h2 className="text-xl font-semibold text-gray-500 mb-4">Files</h2>
        <ul className="space-y-2">
          {apks.split(",").map((apk, index) => (
            <li
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50  hover:bg-gray-100 transition duration-200"
            >
              <span className="text-gray-700">{apk}</span>
              <span className="text-sm text-gray-500 font-mono">
                {index == apks.split(",").length - 1 ? "latest" : ""}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
