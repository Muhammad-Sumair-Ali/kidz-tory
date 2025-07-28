"use client"
import { Button } from '@/components/ui/button'
import { useAuthentication } from '@/hooks/useAuth'
import React from 'react'

const LoginPage = () => {
    const {handleSocialLogin} = useAuthentication()
  return (
    <div className='flex justify-center items-center min-h-screen'>
      <Button onClick={() => handleSocialLogin("google")}>Login With Google</Button>
    </div>
  )
}

export default LoginPage
