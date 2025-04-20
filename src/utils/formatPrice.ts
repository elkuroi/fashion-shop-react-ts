export const formatPrice = (
    amount: number,
    currency: string = 'NOK',
    locale: string = 'en-NO'
  ) => {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
    }).format(amount)
  }
  