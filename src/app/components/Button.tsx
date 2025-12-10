import "../styles/Button.css";

function Button(props: { label: string }) {
  return <button className="btn">{props.label}</button>;
}

export default Button;