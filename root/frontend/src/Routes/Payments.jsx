import dropin from "braintree-web-drop-in";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Payments() {
  const [clientPaymentToken, setClientPaymentToken] = useState(null);
  const [brainTreeDropInInstance, setBrainTreeDropInInstance] = useState(null);
  const dropInContainer = useRef(null);
  const [payButtonChild, setPayButtonChild] = useState("pay");
  const navigate = useNavigate();
  useEffect(() => {
    //get token from server
    axios
      .get("/api/generate-payment-token")
      .then((response) => {
        setClientPaymentToken(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    if (clientPaymentToken) {
      dropin.create(
        {
          // Step three: get client token from your server, such as via
          //    templates or async http request
          authorization: clientPaymentToken,
          container: dropInContainer.current,
        },
        (error, dropinInstance) => {
          // Use 'dropinInstance' here
          // Methods documented at https://braintree.github.io/braintree-web-drop-in/docs/current/Dropin.html
          setBrainTreeDropInInstance(dropinInstance);
        }
      );
    }
  }, [clientPaymentToken]);
  function checkout() {
    if (brainTreeDropInInstance) {
      setPayButtonChild(
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          className="animate-spin"
        >
          <g fill="#fff" fillRule="evenodd" clipRule="evenodd">
            <path
              d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8z"
              opacity=".2"
            />

            <path d="M7.25.75A.75.75 0 018 0a8 8 0 018 8 .75.75 0 01-1.5 0A6.5 6.5 0 008 1.5a.75.75 0 01-.75-.75z" />
          </g>
        </svg>
      );
      brainTreeDropInInstance.requestPaymentMethod((error, payload) => {
        if (error) {
          console.error(error);
        } else {
          const paymentMethodNonce = payload.nonce;
          const transactionTypeSearchParam = new URLSearchParams(
            window.location.search
          ).get("transaction-type");
          axios
            .post(
              `/api/check-out?transaction-type=${transactionTypeSearchParam}`,
              { nonce: paymentMethodNonce }
            )
            .then((response) => {
              navigate("/dashboard");
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });
    }
  }
  return (
    <div className="h-screen w-screen flex items-center justify-center p-2">
      <div className="flex flex-col gap-3 p-3 rounded-md bg-slate-100 w-full sm:max-w-md md:max-w-lg lg:max-w-xl">
        <div className="w-full" ref={dropInContainer}></div>
        <button
          className={
            "braintreePayButton bg-[#213458] p-2 rounded-md w-full text-slate-50 disabled:bg-slate-500 h-10"
          }
          type="primary "
          disabled={!brainTreeDropInInstance}
          onClick={checkout}
        >
          {payButtonChild}
        </button>
      </div>
    </div>
  );
}

export default Payments;
