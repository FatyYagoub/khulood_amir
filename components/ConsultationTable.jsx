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

const ConsultationTable = () => {
  const { t } = useTranslation();
  const { data, error } = useSWR(
    [
      `${domain}/coaching/consultations/reservations/list`,
      getTheTokenFromStorage(),
    ],
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
                  {t("Title")}
                </TableCell>
                <TableCell
                  sx={{
                    borderBottom: 0,
                    fontWeight: "600",
                  }}
                  align="center"
                >
                  {t("Date")}
                </TableCell>
                <TableCell
                  sx={{
                    borderBottom: 0,
                    fontWeight: "600",
                  }}
                  align="center"
                >
                  {t("Time")}
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
                Array.isArray(data) &&
                data?.map((item) => (
                  <TableRow
                    key={item.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" align="center">
                      <div className="flex flex-col gap-1">
                        <span className="font-medium">
                          {item?.consultation?.title}
                        </span>
                        {/* <span className="text-[#5D5D5D]">{row.subtitle}</span> */}
                      </div>
                    </TableCell>
                    <TableCell align="center">
                      {" "}
                      {item?.fixed_date?.substring(0, 10)}
                    </TableCell>
                    <TableCell align="center">
                      {" "}
                      {item?.fixed_date?.substring(11, 16)}
                    </TableCell>
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
          {t("No consultations yet")}.
        </div>
      )}
    </>
  );
};

export default ConsultationTable;
