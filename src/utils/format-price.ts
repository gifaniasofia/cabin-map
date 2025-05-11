const currencyToLocale: Record<string, string> = {
  MYR: 'ms-MY',
  USD: 'en-US',
  IDR: 'id-ID',
  EUR: 'de-DE',
};

export const formatPrice = (
  amount: number,
  options?: {
    locale?: string;
    currency?: string;
  }
) => {
  const currencyOpt = options?.currency ?? 'USD';
  const locale = options?.locale ?? currencyToLocale[currencyOpt] ?? 'en-US';

  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyOpt,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  return formatter.format(isNaN(amount) ? 0 : amount);
};
