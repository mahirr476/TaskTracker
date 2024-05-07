import {Popover, Transition } from '@headlessui/react'
import moment from "moment";
import { Fragment, useState } from "react"
import { BiSolidMessageRounded } from "react-icons/bi"
import { HiBellAlert } from "react-icons/hi2"
import { IoIosNotificationsOutline } from "react-icons/io"
import { Link } from "react-router-dom"

const ICONS = {
    alert: (
        <HiBellAlert className="h-5 w-5 text-gray-600 group-hover:text-indigo-600" />
    ),
    message: (
        <BiSolidMessageRounded className='h-5 w-5 text-gray-600 group-hover:text-indigo-600'/>
    )
}

const NotificationPanel = () => {
    const [open, setOpen] = useState(false)
    const [selected, setSelected] = useState(null)

    // const [data, refetch] = useGetNotificationsQuery()
    // const [markAsRead] = useMarkNotiAsReadMutation()

    const callsToAction = [
        { name: "Cancel", href: "#", icon: ""},
        {
         name:"Mark All Read",
         href:"#",
         icon:"",
         onClick: () => readHandler("all", ""), 
        },
    ]
    
  return (
    <div>NotificationPanel</div>
  )
}

export default NotificationPanel