import PageHeader from '@/components/PageHeader'
import type { NextPage } from 'next'
import React, { type ReactNode } from 'react'

interface LayoutProps {
    children: ReactNode
}

const Layout: NextPage<LayoutProps> = ({children}) => {
  return (
    <div>
      <PageHeader className="mt-8"/>
      <main>{children}</main>
      <footer>Footer</footer>
    </div>
  )
}

export default Layout
