type Variant =
  | 'primary'
  | 'success'
  | 'danger'
  | 'primary-outline'
  | 'success-outline'
  | 'danger-outline';
type Size = 'sm' | 'md' | 'lg';

type ButtonParameters = [Variant, Size, 'block'?];
type ButtonModifier = Variant | Size | 'block';

export const button = {
  DEFAULT: 'border rounded shadow font-bold',
  block: 'block',
  sm: 'text-sm px-2 py-1',
  md: 'px-4 py-2',
  lg: 'text-lg px-6 py-3',
  primary: 'text-white bg-indigo-500 border-indigo-500',
  success: 'text-white bg-green-500 border-green-500',
  danger: 'text-white bg-red-500 border-red-500',
  'primary-outline': 'text-indigo-500 border-indigo-500',
  'success-outline': 'text-green-500 border-green-500',
  'danger-outline': 'text-red-500 border-red-500',
  get(...modifiers: ButtonParameters): string {
    return [...new Set(modifiers)].reduce(
      (a, c) => a + ' ' + this[c as ButtonModifier],
      this.DEFAULT
    );
  },
};

const classes = {
  button,
};

export default classes;
