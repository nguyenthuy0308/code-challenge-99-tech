import { Form, useFormikContext } from 'formik';
import React, { useCallback, useMemo, useState } from 'react';
import type { TokenPrice } from '../hooks/useTokenPrices';
import type { FormValues } from './types';
import TokenInput from './TokenInput';
import SwapButton from './SwapButton';
import useDebounceEffect from '../hooks/useDebounceEffect';
import SubmitButton from './SubmitButton';

interface SwapTokenFormProps {
    tokenPrices: TokenPrice[];
}

const SwapTokenForm: React.FC<SwapTokenFormProps> = ({ tokenPrices }) => {
    const { values, errors, touched, setFieldValue } = useFormikContext<FormValues>();
    const [fromToken, setFromToken] = useState<string>('ETH');
    const [toToken, setToToken] = useState<string>('USD');
    const [activeButtonAnimation, setActiveButtonAnimation] = useState(false);


    useDebounceEffect(() => {
        setActiveButtonAnimation(Boolean(values.fromAmount));
    }, [values.fromAmount], 300);

    const uniqueTokens = useMemo(() => 
        tokenPrices ? Array.from(new Set(tokenPrices.map(t => t.currency))).sort() : [],
    [tokenPrices]);

    const getTokenPrice = useCallback((symbol: string) => {
        if (!tokenPrices) return 0;
        return tokenPrices
            .filter(t => t.currency === symbol)
            .reduce((latest, current) => 
                !latest || new Date(current.date) > new Date(latest.date) ? current : latest
            )?.price || 0;
    }, [tokenPrices]);

    const calculateToAmount = useCallback((fromAmount: string) => {
        if (!fromAmount || isNaN(Number(fromAmount))) return '0.0';

        const fromPrice = getTokenPrice(fromToken);
        const toPrice = getTokenPrice(toToken);

        return ((Number(fromAmount) * fromPrice) / toPrice).toFixed(6);
    }, [fromToken, toToken, getTokenPrice]);



    const handleTokenSwap = useCallback(() => {
        const tempFromToken = fromToken;
        setFromToken(toToken);
        setToToken(tempFromToken);
    }, [fromToken, toToken]);
    return (
        <Form className="space-y-6">
            <div className="space-y-4">
                <TokenInput
                    name="fromAmount"
                    label="From"
                    token={fromToken}
                    onTokenChange={setFromToken}
                    tokens={uniqueTokens}
                    price={getTokenPrice(fromToken)}
                    error={errors.fromAmount}
                    touched={touched.fromAmount}
                />

                <SwapButton isActiveAnimation={activeButtonAnimation} onClick={() => {
                    handleTokenSwap();
                    const currentToAmount = calculateToAmount(values.fromAmount);
                    setFieldValue('fromAmount', currentToAmount);
                }} />

                <TokenInput
                    name="toAmount"
                    label="To"
                    token={toToken}
                    onTokenChange={setToToken}
                    tokens={uniqueTokens}
                    price={getTokenPrice(toToken)}
                    readOnly
                    value={calculateToAmount(values.fromAmount)}
                />
                <SubmitButton />
            </div>
        </Form>
    );
};

export default SwapTokenForm;

