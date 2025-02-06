//paypal
import {
  PayPalScriptProvider,
  PayPalButtons,
  FUNDING,
} from "@paypal/react-paypal-js";
import { useRouter } from "next/router";

import { getTheTokenFromStorage } from "../../services/auth";
import { clearCart } from "../../services/cart";
import { packEnroll } from "../../services/enrollment";
import { createOrder } from "../../services/orders";
import { toast } from "react-nextjs-toast";
import useTranslation from "../../hooks/useTranslation";
import { bookSession } from "../../services/session";
import { bookConsultation } from "../../services/consultation";

const PayButton = ({
  total,
  courses,
  sessionId,
  consultationId,
  setLoading,
}) => {
  const router = useRouter();
  const { t } = useTranslation();
  // console.log(sessionId, consultationId);

  const createOrderPaypal = (data, actions) => {
    setLoading(true);
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: total,
            },
          },
        ],
        application_context: {
          shipping_preference: "NO_SHIPPING",
        },
        intent: "CAPTURE",
      })
      .then(async (orderID) => {
        return orderID;
      });
  };
  const onApprove = async (data, actions) => {
    return actions.order.capture().then(async (details) => {
      console.log("payment done");

      // ORDER IS COMPLETED, MONEY SENT
      if (courses) {
        const res0 = await createOrder(getTheTokenFromStorage(), {
          payment_method: "Paypal",
        });
        // enroll
        const res = await packEnroll(getTheTokenFromStorage(), {
          courses: courses,
        });
        // console.log(res0);
        // console.log(res);
        if (res && res.status === 201) {
          setLoading(false);
          toast.notify(t("Operation completed successfully") + "🎉");

          await clearCart(getTheTokenFromStorage());
          router.push("/orders");
        } else {
          setLoading(false);
          toast.notify(
            t("The operation was not completed successfully") + "❌"
          );
        }
      } else if (sessionId && sessionId !== null) {
        // console.log("in session");
        let res = await bookSession(
          getTheTokenFromStorage(),
          {
            session: sessionId,
          },
          router.locale
        );

        if (res && res.status === 200) {
          setLoading(false);
          toast.notify(t("Operation completed successfully") + "🎉");

          router.push("/session-owned");
        } else {
          setLoading(false);
          toast.notify(
            t("The operation was not completed successfully") + "❌"
          );
        }
      } else if (consultationId && consultationId !== null) {
        // console.log("in consultation");
        let res = await bookConsultation(getTheTokenFromStorage(), {
          consultation: consultationId,
          whatsapp_number: router.query?.whatsapp_number
            ? router.query?.whatsapp_number
            : null,
          fixed_date: router.query?.fixed_date
            ? router.query?.fixed_date
            : null,
        });

        if (res && res.status === 200) {
          setLoading(false);
          toast.notify(t("Operation completed successfully") + "🎉");

          router.push("/consultation-owned");
        } else {
          setLoading(false);
          toast.notify(
            t("The operation was not completed successfully") + "❌"
          );
        }
      }
    });
  };
  const onCancel = () => {
    console.log("CANCEL");
  };
  const onError = () => {
    toast.notify(t("The operation was not completed successfully") + "❌");
    console.log("ERR");
  };

  return (
    <>
      <div className="flex flex-row items-center justify-between py-4">
        <p className="text-black text-right x-sm:text-sm sm:text-base lg:text-lg 2xl:text-2xl font-bold">
          {t("Pay with")}
        </p>
        <div className="flex flex-row space-x-4 items-center justify-center  ">
          <img src="/images/paypal.png" className="h-4" alt="icon" />
        </div>
      </div>

      <PayPalScriptProvider
        options={{
          "client-id": "sb",
          vault: false,
        }}
      >
        <PayPalButtons
          id="paypal-variant"
          style={{ color: "blue", edges: "rounded" }}
          className="paypal-button"
          fundingSource={FUNDING.PAYPAL}
          createOrder={createOrderPaypal}
          onApprove={onApprove}
          onCancel={onCancel}
          onError={onError}
        />
      </PayPalScriptProvider>
    </>
  );
};

export default PayButton;

// c id Ae06eB3XMR5ZLW6pShc1dH6F9cVDVAd4FaPiQTYkA89WPB1H8Z1vwjL84VpacbfF13o6ThcMOGkdveWg
// secret EB15dNwKOn0wt593HzvBf77tHIOOTsN05m4ddDgskqHBYYpsRj4543kY5DaKb2T9ieRJEi4nICn7RItc

//sandbox
// sb-lg7yq5468518@personal.example.com
// GN.j7)o.
