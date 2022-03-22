interface TokenPickerProps {
	token: string;
	tokens: string[];
	onClick: (token: string) => void;
}

const TokenPicker = ({ onClick, token, tokens }: TokenPickerProps) => {
	return (
		<div className="token-picker">
			<div className="token-picker__line"></div>
			{tokens.map((tkn, i) =>
				i < tokens.length - 1 ? (
					<button
						key={tkn}
						className={`token-picker__button ${tkn === token ? "active" : ""}`}
						onClick={() => onClick(tkn)}>
						STAKE {tkn}
					</button>
				) : (
					<div className="token-picker__limited">
						<span>LIMITED: 7 days left</span>
						<button className={`token-picker__button ${tkn === token ? "active" : ""}`} onClick={() => onClick(tkn)}>
							STAKE {tkn}
						</button>
					</div>
				)
			)}
		</div>
	);
};

export default TokenPicker;
