import AdminUpdateMenu from '@/app/pages/AdminUpdateMenu'
import React from 'react'

export default function page({ params }: { params: { id: string }}) {
  return (
    <AdminUpdateMenu id={params.id}/>
  )
}
