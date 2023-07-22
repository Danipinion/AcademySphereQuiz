export default function Checkbox({ className, text, ...rest }) {
	return (
		<label className={className}>
			<input type="radio" {...rest} name="answer" /> <span>{text}</span>
		</label>
	);
}
