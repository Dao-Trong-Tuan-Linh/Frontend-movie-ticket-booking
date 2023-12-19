import AdminUpdateShowtime from "@/app/pages/AdminUpdateShowtime";

export default function page({ params }: { params: { id: string }}) {
  return (
    <AdminUpdateShowtime id={params.id}/>
  )
}
