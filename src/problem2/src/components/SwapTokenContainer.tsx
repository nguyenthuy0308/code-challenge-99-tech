import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useTokenPrices } from '../hooks/useTokenPrices';
import StatusState from './StatusState';
import SwapTokenForm from './SwapTokenForm';
import type { FormValues } from './types';
import loadingGif from '../../public/assets/loading-gif.gif'


const validationSchema = Yup.object().shape({
  fromAmount: Yup.number()
    .required('Amount is required')
    .positive('Amount must be positive'),
});



const SwapTokenContainer: React.FC = () => {
  const { data: tokenPrices, isLoading, error } = useTokenPrices();
  const [toastShowing, setToastShowing] = useState(false)
  const [showLoadingGif, setShowLoadingGif] = useState(false)

  const handleSwap = (values: FormValues) => {
    console.log('Swap values:', values);
    setShowLoadingGif(true)
  };

  useEffect(() => {
    if (!showLoadingGif) return
    const timeOutLoadingGifAndShowToast = setTimeout(() => {
      setShowLoadingGif(false)
      setToastShowing(true)
    }, 1000)
    return () => clearTimeout(timeOutLoadingGifAndShowToast)
  }, [showLoadingGif])

  useEffect(() => {
    if (!toastShowing) return
    const toastTimeout = setTimeout(() => {
      setToastShowing(false);
    }, 2000);

    return () => clearTimeout(toastTimeout);
  }, [toastShowing]);



  if (!tokenPrices || isLoading || error) return <StatusState message={isLoading ? "Loading token prices..." : error?.message || "Error loading token prices"} />;

  return (
    <div className="min-h-screen bg-yellow-200 py-12 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="w-md h-[600px] mx-auto bg-white rounded-xl shadow-lg relative">
        <div className="p-8 ">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-yellow-600 mb-8">Token Swap</h2>
          </div>

          <Formik
            initialValues={{ fromAmount: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSwap}
          >
            <SwapTokenForm tokenPrices={tokenPrices} />
          </Formik>
          {showLoadingGif && 
          <img className='w-30 h-29 object-cover m-auto mt-[10px]' src={loadingGif} />}
          <div className={`absolute ${toastShowing ? 'bottom-[10%] opacity-100' : 'bottom-[-50%] opacity-0'} right-0 translate-x-[-50%] w-1/2 font-medium transition-all duration-800 rounded-xl p-4 bg-green-400 text-white transition`}>
            <p className='text-center'>Swap Successfully!!!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwapTokenContainer;