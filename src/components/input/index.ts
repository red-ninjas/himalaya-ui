import { default as CoreInput } from './input';
import Textarea from '../textarea';
import InputPassword from './password';
import InputDate from './date';

export type { InputProps } from './input';
export type { InputInternalProps } from './input-props';
export type { InputPasswordProps } from './password';
export type { TextareaProps } from '../textarea/textarea';

export type InputType = typeof CoreInput & {
  Textarea: typeof Textarea;
  Password: typeof InputPassword;
  Date: typeof InputDate;
};

const Input: InputType = CoreInput as InputType;
Input.Textarea = Textarea;
Input.Date = InputDate;
Input.Password = InputPassword;

export default Input;
