import { useForm } from "react-hook-form";
import {InputHTMLAttributes} from 'react';
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type:string;
  name:string;
  formValue:string;
}

const InputField = ({type,name , formValue, ...rest}:InputProps) => {
  const {register} =  useForm();
 return(
<input type={type} {...register(formValue , {required: true,pattern: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
          })} {...rest} required/>
 ) 
}

export default InputField;