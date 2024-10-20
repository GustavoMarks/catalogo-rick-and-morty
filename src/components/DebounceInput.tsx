import * as React from 'react';

import { TextField, TextFieldProps } from '@mui/material';

import constants from '@/helpers/constants';

type DebounceProps = {
	handleDebounce?: (value: string) => void;
	debounceTimeout?: number;
};

export default function DebounceInput(props: TextFieldProps & DebounceProps) {
	const { handleDebounce, debounceTimeout = constants.DEBOUNCE_TIME, ...rest } = props;

	const [internalValue, setInternalValue] = React.useState(props.value);
	const timerRef = React.useRef<ReturnType<typeof setTimeout>>();

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		clearTimeout(timerRef.current);
		timerRef.current = setTimeout(() => {
			handleDebounce?.(event.target.value);
		}, debounceTimeout);
		setInternalValue(event.target.value);
	};

	React.useEffect(() => {
		setInternalValue(props.value);
	}, [props.value]);

	return <TextField {...rest} value={internalValue || ''} onChange={handleChange} />;
}
