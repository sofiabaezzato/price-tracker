'use client'

import { Input } from './ui/input';
import { Button } from './ui/button';
import { useEffect, useRef } from 'react';
import { addUrl } from '@/actions/formAction';
import { useFormState, useFormStatus } from 'react-dom';

const Submit = () => {
  const status = useFormStatus()

  return (
    <Button
      type="submit"
      disabled={status.pending}
    >
      {status.pending ? 'Adding Product...' : 'Add Product'}
    </Button>
  )
}

const AddUrlForm = () => {
  const ref = useRef<HTMLFormElement>(null)
  const [formState, formAction] = useFormState(addUrl, {
    message: "",
    errors: undefined,
    inputUrl: ""
  })
  
  useEffect(() => {
    if (formState?.message === "success") {
      ref.current?.reset()
    }
  }, [formState])


  return (    
    <>
      <form
        ref={ref}
        action={formAction}
        className='flex gap-2 w-full'
      >
        
        <Input
          type="url"
          placeholder="Amazon Product URL"
          name='urlInput'
          required
        />
        <Submit />
      </form>
      <p className="">{formState?.message === "success" && "Submitted"}</p>
      <p className="">{formState?.errors === "noAmazon" && "Not an amazon link"}</p>
    </>
  );
}


export default AddUrlForm