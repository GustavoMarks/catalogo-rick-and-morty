import { FormControl, FormHelperText, InputLabel, MenuItem, Select as MuiSelect } from '@mui/material';

import fontFamily from '@/configs/fontFamily';

export interface SelectOptionProps {
	value: any;
	label: string;
}

interface SelectProps {
	label: string;
	value: any;
	onChange: any;
	options: SelectOptionProps[];
	helperText?: string;
	noneOption?: boolean;
}

export default function Select(props: SelectProps) {
	const { label, value, onChange, options, helperText, noneOption } = props;
	return (
		<FormControl fullWidth>
			<InputLabel color='secondary' id={`${label}-select-label`}>{label}</InputLabel>
			<MuiSelect
				color='secondary'
				label={label}
				labelId={`${label}-select-label`}
				value={value}
				onChange={onChange}
				MenuProps={{
					disableScrollLock: true,
					className: fontFamily.className,
				}}
			>
				{
					noneOption && (
						<MenuItem value=''>
							<em>None</em>
						</MenuItem>
					)
				}
				{
					options.map((option) => (
						<MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
					))
				}
			</MuiSelect>
			{
				!!helperText && (
					<FormHelperText>{helperText}</FormHelperText>
				)
			}
		</FormControl>
	);
}
