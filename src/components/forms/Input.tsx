import { FieldValues, Path, UseFormRegister } from "react-hook-form"

type TInputProps<TFieldValue extends FieldValues> = {
  label: string,
  type?: string,
  name: Path<TFieldValue>,
  register: UseFormRegister<TFieldValue>,
  error: string
}

function Input<TFieldValue extends FieldValues>({ label, type = 'text', name, register, error }: TInputProps<TFieldValue>) {
  return (
    <div className="mb-2">
      <label htmlFor={name} className="block mb-1 text-green-500 font-medium">{label}</label>
      <input type={type} id={name} {...register(name)} className="w-full p-2 outline-none border border-green-500 rounded-md" />
      <p className="text-red-500 mt-1">{error}</p>
    </div>
  )
}

export default Input
