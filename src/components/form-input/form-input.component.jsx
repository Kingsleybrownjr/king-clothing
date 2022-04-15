import './form-input.styles.scss';

const FormInput = ({ label, ...otherProps }) => {
	const renderLabel = () =>
		// If label exist then render label
		label && (
			<label
				className={`${
					otherProps.value.length ? 'shrink' : ''
				} form-input-label`}
			>
				{label}
			</label>
		);

	return (
		<div className="group">
			<input className="form-input" {...otherProps} />
			{renderLabel()}
		</div>
	);
};

export default FormInput;
