'use client'

import { Input } from './ui/input';
import { Button } from './ui/button';
import { useEffect, useRef } from 'react';
import { addUrl } from '@/actions/formAction';
import { useFormState, useFormStatus } from 'react-dom';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

const Submit = () => {
  const status = useFormStatus()

  return (
    <Button
      type="submit"
      disabled={status.pending}
    >
      {status.pending ? 'Add...' : 'Add'}
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
        className='flex gap-2 w-full sm:max-w-xl'
      >
        <Input
          type="url"
          placeholder="Amazon product page URL"
          name='urlInput'
          required
        />
        <Submit />
      </form>
      {formState?.errors ? (
        <Alert variant="destructive">
          <ExclamationTriangleIcon className="h-4 w-4" />
          <AlertTitle>{formState.errors}</AlertTitle>
          <AlertDescription>
            {formState.message}
          </AlertDescription>
        </Alert>
        ) : null
      }
    </>
  );
}


export default AddUrlForm