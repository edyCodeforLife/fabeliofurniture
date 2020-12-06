export const numberFormat = (value: any, lang: string, fraction?: number) => {
    if (isNaN(parseFloat(value))) value = 0.0;
    return String(
        new Intl.NumberFormat(lang === 'en' ? 'en-EN' : 'id-ID', {
            maximumFractionDigits: fraction || 2,
            minimumFractionDigits: fraction || 0,
        }).format(parseFloat(value))
    );
};

export const moneyFormat = (value: any, lang: string, fraction?: number, _currency?: string) => {
    let currency = _currency === 'USD' ? _currency + ' ' : lang === 'en' ? 'IDR ' : 'Rp. ';
    return currency + numberFormat(value, lang, fraction);
};