import React, { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-nextjs-toast";
//stripe
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
//MUI
import CircularProgress from "@mui/material/CircularProgress";
//services
import { pay, payConsultation, paySession } from "../../services/payWithStripe";
import { createOrder } from "../../services/orders";
import { packEnroll } from "../../services/enrollment";
import { getTheTokenFromStorage } from "../../services/auth";
import { clearCart } from "../../services/cart";
import { bookSession } from "../../services/session";
import { bookConsultation } from "../../services/consultation";
//hooks
import useTranslation from "../../hooks/useTranslation";

const PUBLIC_KEY =
  "pk_test_51Il0cBJhzZrG3DiVHH8iypMZeFY0uw7F44ofXv5qM0sbTp12ENJoSIhhuiRpc6dbWpnSA0nEjVPjeO1N0yoY2UG3003tbzXqmT";

const stripeTestPromise = loadStripe(PUBLIC_KEY);

const StripeButton = ({ cartId, sessionId, consultationId }) => {
  const { t } = useTranslation();
  return (
    <>
      <div className="flex flex-row items-center justify-between py-4">
        <p className="text-black text-right x-sm:text-sm sm:text-base lg:text-lg 2xl:text-2xl font-bold">
          {t("Pay with")}
        </p>
        <div className="flex flex-row space-x-4 items-center justify-center">
          <img src="/images/visa.png" className="x-sm:h-6 sm:h-10" alt="icon" />
          <p>/</p>
          <img
            src="/images/mastercard.png"
            className="x-sm:h-3 sm:h-5"
            alt="icon"
          />
        </div>
      </div>
      <Elements stripe={stripeTestPromise}>
        <PaymentForm
          cartId={cartId}
          
          sessionId={sessionId}
          consultationId={consultationId}
        />
      </Elements>
    </>
  );
};

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#434243",
      color: "#5c5c5c",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": { color: "#fce883" },
      "::placeholder": { color: "#434243" },
    },
    invalid: {
      iconColor: "#fce883",
      color: "#fce883",
    },
  },
};

function PaymentForm({ cartId, sessionId, consultationId }) {
  const { t } = useTranslation();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    if (cartId && cartId !== null) {
      e.preventDefault();
      setLoading(true);
      if (!stripe || !elements) {
        return;
      }

      const res = await pay({
        cart: cartId,
      });

      const result = await stripe.confirmCardPayment(
        res.data.data.client_secret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        }
      );

      if (result.error) {
        toast.notify(result.error.message);
        setLoading(false);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          // create order
          await createOrder(getTheTokenFromStorage(), {
            payment_method: "Card",
          });
          //enroll
          await packEnroll(getTheTokenFromStorage(), {
            courses: res.data.courses,
          });
          await clearCart(getTheTokenFromStorage());
          setLoading(false);
          toast.notify(t("Payment completed") + "🎉");
          router.push("/orders");
        }
      }
    } else if (sessionId && sessionId !== null) {
      e.preventDefault();
      setLoading(true);
      if (!stripe || !elements) {
        return;
      }
      const res = await paySession({
        session: sessionId,
      });

      const result = await stripe.confirmCardPayment(
        res.data.data.client_secret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        }
      );

      if (result.error) {
        toast.notify(result.error.message);
        setLoading(false);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          //enroll
          await bookSession(
            getTheTokenFromStorage(),
            {
              session: sessionId,
            },
            router.locale
          );
          setLoading(false);
          toast.notify(t("Payment completed") + "🎉");
          router.push("/session-owned");
        }
      }
    } else if (consultationId && consultationId !== null) {
      e.preventDefault();
      setLoading(true);
      if (!stripe || !elements) {
        return;
      }
      const res = await payConsultation({
        consultation: consultationId,
      });

      const result = await stripe.confirmCardPayment(
        res.data.data.client_secret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        }
      );

      if (result.error) {
        toast.notify(result.error.message);
        setLoading(false);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          //enroll
          await bookConsultation(
            getTheTokenFromStorage(),
            {
              consultation: consultationId,
              whatsapp_number: router.query?.whatsapp_number
                ? router.query?.whatsapp_number
                : null,
              fixed_date: router.query?.fixed_date
                ? router.query?.fixed_date
                : null,
            },
            router.locale
          );
          setLoading(false);
          toast.notify(t("Payment completed") + "🎉");
          router.push("/consultation-owned");
        }
      }
    }
  };

  return (
    <>
      <div style={{ margin: 0 }}>
        <fieldset className="FormGroup">
          <div className="FormRow">
            <CardElement options={CARD_OPTIONS} />
          </div>
        </fieldset>
        <button className="stripe_button" onClick={handleSubmit}>
          <span>{t("Pay")}</span>
        </button>
      </div>
      {loading && (
        <div className="flex justify-center mt-2">
          <CircularProgress className="text-white" />
        </div>
      )}
    </>
  );
}

export default StripeButton;
