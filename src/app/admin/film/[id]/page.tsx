import AdminFilm from '@/app/pages/AdminFilm'
import React from 'react'

export default function page({ params }: { params: { id: string }}) {
  return (
    <AdminFilm id={params.id}/>
  )
}
