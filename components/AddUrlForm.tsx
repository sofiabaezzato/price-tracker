'use client'

import { Input } from './ui/input';
import { Button } from './ui/button';
import { useEffect, useRef } from 'react';
import { addUrl } from '@/actions/formAction';
import { useFormState, useFormStatus } from 'react-dom';


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
        <Button
          type="submit"
        >
          Start Tracking
        </Button>
      </form>
      <p className="">{formState?.message === "success" && "Submitted"}</p>
      <p className="">{formState?.errors === "noAmazon" && "Not an amazon link"}</p>
    </>
  );
}


export default AddUrlForm