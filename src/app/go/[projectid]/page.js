"use client";


import { useState, useEffect } from "react";
import { supabase } from "../../supabase";


export default function GoProject({ params }){
    const [durl, setdurl] = useState("");

    useEffect(() => {
      fetchdurl();
      if(durl!=""){
        window.open(durl, "_self")
      }
    }, [durl]);

    async function fetchdurl() {
      const { data } = await supabase
        .from("verzion")
        .select("*")
        .eq("projectid", params.projectid);
  
      setdurl(data[0]["defaulturl"]);
    }
  
    return (
        <div className="min-h-screen flex flex-col justify-center items-center">
            <p className=" font-mono">downloading project {params.projectid}...</p>
        </div>
    )
}