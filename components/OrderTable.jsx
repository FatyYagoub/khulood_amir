import React from "react";

//mui
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

//components
import Status from "./Status";

//backend
import useSWR from "swr";
import { domain } from "../global/domain";

//services
import { fetcherAuth } from "../services/fetcher";
import { getTheTokenFromStorage } from "../services/auth";
//hooks
import useTranslation from "../hooks/useTranslation";

const createData = (title, subtitle, img, price, date, payement, status) => {
  return { title, subtitle, img, price, date, payement, status };
};

const OrderTable = () => {
  const { t } = useTranslation();
  const { data, mutate } = useSWR(
    [`${domain}/orders/courses/list`, getTheTokenFromStorage()],
    fetcherAuth
  );

  // console.log(data);
  return (
    <>
      {data && data.length > 0 ? (
        <TableContainer
          className="my-10"
          sx={{
            boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.12)",
            borderRadius: "8px",
          }}
        >
          <Table
            sx={{
              minWidth: 650,
            }}
            aria-label="simple table"
          >
            <TableHead
              sx={{
                background: "#F7F7F7",
                fontSize: "14px",
                border: 0,
              }}
            >
              <TableRow>
                <TableCell
                  sx={{
                    borderBottom: 0,
                    fontWeight: "600",
                  }}
                  align="center"
                >
                  {t("items")}
                </TableCell>
                <TableCell
                  sx={{
                    borderBottom: 0,
                    fontWeight: "600",
                  }}
                  align="center"
                >
                  {t("Total")}
                </TableCell>
                <TableCell
                  sx={{
                    borderBottom: 0,
                    fontWeight: "600",
                  }}
                  align="center"
                >
                  {t("purchase date")}
                </TableCell>
                <TableCell
                  sx={{
                    borderBottom: 0,
                    fontWeight: "600",
                  }}
                  align="center"
                >
                  {t("payment method")}
                </TableCell>
                <TableCell
                  sx={{
                    borderBottom: 0,
                    fontWeight: "600",
                  }}
                  align="center"
                >
                  {t("status")}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody
              sx={{
                fontSize: "14px",
              }}
            >
              {data &&
                data.map((item) => (
                  <TableRow
                    key={item.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" align="center">
                      {item.items.length === 0 ? (
                        <span className="">{t("No items in this order")}</span>
                      ) : (
                        <>
                          {item.items.map((product) => (
                            <div className="flex gap-4 items-center justify-center">
                              <img
                                src={product.picture}
                                alt="order"
                                className="w-10 h-10 rounded-lg object-cover"
                              />
                              <div className="flex flex-col gap-1">
                                <span className="font-medium">
                                  {product.title}
                                </span>
                                {/* <span className="text-[#5D5D5D]">
                                  {product.id}
                                </span> */}
                              </div>
                            </div>
                          ))}
                        </>
                      )}
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "#EB5757",
                      }}
                      align="center"
                    >
                      {item.total_cost}$
                    </TableCell>
                    <TableCell align="center">
                      {" "}
                      {item.created_at.slice(0, 10)}
                    </TableCell>
                    <TableCell align="center">{item.payment_method}</TableCell>
                    <TableCell align="center">
                      <Status status={item?.status} />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <div className=" w-full flex justify-center items-center text-2xl text-[#9F9F9F] my-20">
          {t("No orders yet")}.
        </div>
      )}
    </>
  );
};

export default OrderTable;
