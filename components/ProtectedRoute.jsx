import React, { useContext, useEffect, useRef, useState } from "react";
import { storeContext } from "../global/store";
import { useRouter } from "next/router";

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const didMount = useRef(false);
  const [forceRender, setForceRender] = useState(false);
  const { store, loading } = useContext(storeContext);
  //useRef to not run code on first render
  useEffect(() => {
    if (didMount.current) {
      store.isLogged === false &&
        !loading &&
        router.push(
          {
            pathname: "/auth",
            query: {
              from: router.asPath,
            },
          },
          "/auth"
        );
    } else {
      didMount.current = true;
      //State To Force rerender (Problems with using Ref in deps array)
      setForceRender(true);
    }
  }, [store, forceRender]);

  if (store.isLogged) return <div>{children}</div>;
  return <></>;
};

export default ProtectedRoute;
