interface InputErrorMessageProps {
  errorMessage: string;
}

export function InputErrorMessage(props: InputErrorMessageProps) {
  return (
    <div className="text-red127 flex w-full flex-wrap text-justify text-xs">
      {props.errorMessage}
    </div>
  );
}
