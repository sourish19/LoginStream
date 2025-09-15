import React from 'react'
import { Card, CardAction, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Spinner } from './ui/spinner'
import { Button } from './ui/button'

const Cotainer = ({ title, description, Component, onClick, logout }) => {
  return (
    <Card className={'w-[300px] transition-all duration-300'}>
      <CardHeader>
        <CardTitle>
          <div className='flex items-center gap-2'>
            {Component}
            <span>{title}</span>
          </div>
        </CardTitle>
        <CardDescription>{description}</CardDescription>
        <CardAction>
          {logout && logout.status === 'pending' ? (
            <div className='flex items-center justify-center'>
              <Spinner size='small' className='text-black'>
                <span className='text-md text-black'>Logging out...</span>
              </Spinner>
            </div>
          ) : (
            <Button onClick={onClick} className={'cursor-pointer'} variant='link'>
              Click Here
            </Button>
          )}
        </CardAction>
      </CardHeader>
    </Card>
  )
}

export default Cotainer
