import clsx from 'clsx'
import React from 'react'

const Button = ({icon, className, label, type, onClick=() => {} }) => {
  return (
    <button
     type= {type || "button"}
     className={clsx("px-3 py-2 outline-none", className)}
     label={label || "button"}
     onClick={onClick}
    >
        <span className=''>{label}</span>
        {icon && icon}
    </button>
  )
}

export default Button
