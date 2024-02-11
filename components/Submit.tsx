import { useFormStatus } from "react-dom"
import { Button } from "./ui/button"


export const Submit = () => {
  const status = useFormStatus()

  return (
    <Button
      type="submit"
      data-cy='submitBtn'
      disabled={status.pending}
    >
      {status.pending ? 'Add...' : 'Add'}
    </Button>
  )
}