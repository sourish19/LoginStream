import React from 'react'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from './ui/button'

const Cotainer = ({ title, description, Component }) => {
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
          <Button className={'cursor-pointer'} variant='link'>
            Click Here
          </Button>
        </CardAction>
      </CardHeader>
    </Card>
  )
}

export default Cotainer
