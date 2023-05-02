interface IExchangeRate {
  date: string;
  rate: number;
};

interface ICurrency {
  code: string;
  name: string;
};

interface IFromCurrencyToCurrency {
  from: string;
  to: string;
};

interface IExchangeData {
  currentCurrency: IFromCurrencyToCurrency;
  exchangeRate?: IExchangeRate;
  amount: number;
  convertedAmount: number;
};

interface IFormHtmlProps {
  props: {
    setExchangeData: React.Dispatch<React.SetStateAction<IExchangeData>>;
    setResult: React.Dispatch<React.SetStateAction<{
      showResult: boolean;
      loading: boolean;
    }>>;
    handleSubmit: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    exchangeData: IExchangeData;
    currencies: ICurrency[];
    resultStatus: {
      showResult: boolean;
      loading: boolean;
    };
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