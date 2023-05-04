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
  amount: number | null;
};

interface IFormHtmlProps {
  props: {
    setFormData: React.Dispatch<React.SetStateAction<IFormData>>
    handleSubmit: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    formData: IFormData;
    currencies: ICurrency[];
  };
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
  },
  step?: number,
};

interface RenderFormProps {
  formData: IFormData,
  currencies: ICurrency[],
  setFromTo: (option: "from" | "to", value: string) => void
  setAmount: (event: React.ChangeEvent<HTMLInputElement>) => void
};

type HandleSubmitType = React.MouseEvent<HTMLButtonElement, MouseEvent>