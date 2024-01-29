
import { toast } from './ui/use-toast'

const Toast = () => {
  toast({
    variant: "destructive",
    title: "Whoops! Wrong coordinates, my friend.",
    description: "Make sure you're pointing to an Amazon star, not a black hole."
  })
  return (
    <></>
  )
}

export default Toast