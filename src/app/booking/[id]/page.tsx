import Booking from '@/app/pages/Booking'
import React from 'react'

export default function page({params}:{params:{id:string}}) {
  return (
    <Booking id={params.id}/>
  )
}
