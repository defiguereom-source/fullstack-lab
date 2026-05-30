type ButtonProps = {
  text: string;
};

const Button = ({ text }: ButtonProps) => {
  return <button type="submit">{text}</button>;
};

export default Button;