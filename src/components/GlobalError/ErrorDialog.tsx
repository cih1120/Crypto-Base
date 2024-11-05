import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

function ErrorDialog({ error }: { error: string }) {
  const errorMessages = {
    '429': {
      title: 'Too Many Requests',
      description:
        'You have made too many requests in a short period. Please try again later.',
    },
    '451': {
      title: 'Unavailable For Legal Reasons',
      description:
        'The content you are trying to access is unavailable for legal reasons.',
    },
  };

  const errorCode = Object.keys(errorMessages).find((code) =>
    error.includes(code)
  ) as keyof typeof errorMessages;
  const { title, description } = errorCode
    ? errorMessages[errorCode]
    : { title: 'Error', description: 'An unexpected error occurred.' };

  return (
    <AlertDialog open={true}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default ErrorDialog;
