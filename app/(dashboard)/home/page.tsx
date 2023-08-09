'use client'

import { PlaidModal } from '@/components/PlaidModal'
import React from 'react'

export default async function page() {
  return (
    <div className="w-full">
      <PlaidModal
        title="Connect Bank Account"
        description="Connect a bank account to get setup with Expensify"
        isOpen
        onClose={() => {}}
      >
        Children
      </PlaidModal>
    </div>
  )
}
