import React from "react";
import PasswordRetrieval from "@/app/pages/PasswordRetrieval";

export default function page({ params }: { params: { id: string } }) {
  console.log(params.id)
  return (
    <PasswordRetrieval id={params.id}/>
  );
}

