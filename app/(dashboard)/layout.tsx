import SideBar from '@/components/SideBar'
import React from 'react'
import '../../styles/global.css'

const RootLayout = ({ children }: any) => {
  return (
    <html lang="en">
      <head>
        <body className="h-screen w-screen flex relative">
          {/* <SideBar /> */}
          {children}
        </body>
      </head>
    </html>
  )
}

export default RootLayout
