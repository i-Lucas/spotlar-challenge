interface IExchangeRate {
  date: string;
  rate: number;
};

interface ICurrency {
  code: string;
  name: string;
};

interface IFormData {
  currentCurrency: {
    from: string;
    to: string;
  };
  exchangeRate?: IExchangeRate;
  amount?: number;
};

interface IFormHtmlProps {
  props: {
    setFormData: React.Dispatch<React.SetStateAction<IFormData>>
    handleSubmit: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    formData: IFormData;
    currencies: ICurrency[];
  };
};

interface IInputProps {
  label: string;
  type?: string;
  value: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

interface ISelectProps {
  label: string;
  value: string;
  options: { label: string; value: string }[];
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

interface IAwaitResults {
  showResult: boolean;
  loading: boolean;
};

interface IAppCurrencyContext {
  currencies: {
    from: string | undefined;
    to: string | undefined;
  };
  status: {
    loading: boolean;
    error?: string | null
  },
  result?: {
    showResult: boolean;
    amount: number;
    value: string;
  }
};

interface RenderFormProps {
  formData: IFormData,
  currencies: ICurrency[],
  setFromTo: (option: "from" | "to", value: string) => void
  setAmount: (amount: string) => void
};

type HandleSubmitType = React.MouseEvent<HTMLButtonElement, MouseEvent>