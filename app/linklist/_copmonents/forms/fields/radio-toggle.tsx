import { ReactNode } from "react";

interface IOption {
  value: string;
  icon: ReactNode;
  label: string;
}

interface IRadioToggleProps {
  defaultValue: string;
  name: string;
  onChange: (val: string) => void;
  options: IOption[];
}

export const RadioToggle = ({ name, options, defaultValue, onChange }: IRadioToggleProps) => (
  <div className="radio-togglers shadow">
    {options.map(({ icon, value, label }) => (
      <label key={value}>
        <input
          type="radio"
          name={name}
          onChange={(ev) => onChange(ev.target.value)}
          defaultChecked={defaultValue === value}
          value={value}
        />
        <div>
          {icon ? icon : null}
          <span>{label}</span>
        </div>
      </label>
    ))}
  </div>
);
