import { Box, CircularProgress } from "@mui/material";
import { ColFlex, RowFlex } from "../theme/style_extentions/Flex";
import GlobalModal from "./ui/Modal";
import StyledButton from "./ui/StyledButton";
import StyledInput from "./ui/StyledInput";
import { FormEvent, useContext, useState } from "react";
import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import baseURL from "../api/baseURL";
import SnackbarContext from "../context/SnackbarContext";
import { SnackBarContextTypes } from "../types/SnackbarTypes";
import { UserTypes } from "../types/UserTypes";
import { useLocalStorage } from "../hooks/useLocalStorage";
import UserDataContext from "../context/UserDataContext";
import UserContextTypes from "../types/UserDataContextTypes";

interface EditAccountDetailsModalProps {
  title: string;
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
  accountDetails: UserTypes;
}

function EditAccountDetailsModal({
  title,
  openModal,
  setOpenModal,
  accountDetails,
}: EditAccountDetailsModalProps) {
  const QC = useQueryClient();

  const { setOpenSnack }: SnackBarContextTypes = useContext(SnackbarContext);
  const { setUserData }: UserContextTypes = useContext(UserDataContext);

  const [name, setName] = useState<string>(accountDetails?.name);
  const [email, setEmail] = useState<string>(accountDetails?.email);
  const [phone, setPhone] = useState<number>(accountDetails?.phone);
  const [storeName, setStoreName] = useState<string>(accountDetails?.storeName);
  const [storeAddress, setStoreAddress] = useState<string>(
    accountDetails?.storeAddress
  );

  const { setInLs } = useLocalStorage();

  const { mutate: updateAccountDetails, status: updateAccountDetailsStatus } =
    useMutation({
      mutationKey: ["Updated Account Details" + accountDetails?._id],
      mutationFn: async (data: UserTypes) => {
        return axios.put(
          baseURL + "storeAdmin/editProfile/" + accountDetails?._id,
          data
        );
      },
      onSuccess: (data) => {
        console.log(data);
        setOpenSnack({
          open: true,
          message: "Account Details Updated",
          severity: "success",
        });
        setOpenModal(false);
        //   QC.invalidateQueries(["Products"]);
        QC.invalidateQueries([
          "LoginData",
        ] as unknown as InvalidateQueryFilters);
        setUserData!(data.data);
        setInLs("storeAdmin", data.data);
      },
      onError: (err: any) => {
        setOpenSnack({
          open: true,
          message: err.response.data.message,
          severity: "error",
        });
      },
    });

  function UpdateAccountDetails(e: FormEvent) {
    e.preventDefault();
    const newAccountDetails: UserTypes = {
      name,
      email,
      phone,
      storeName,
      storeAddress,
    };
    updateAccountDetails(newAccountDetails);
    // console.log(accountDetailsData);
  }

  return (
    <GlobalModal
      headerText={title}
      openModal={openModal}
      setOpenModal={setOpenModal}
    >
      <Box
        component={"form"}
        onSubmit={UpdateAccountDetails}
        sx={{
          ...ColFlex,
          overflow: "hidden",
          m: "auto",
          p: 2.5,
          maxWidth: "90%",
          width: { xs: "80%", md: "100%" },
          justifyContent: "space-between",
          gap: "15px",
        }}
      >
        {/* Add Prod Form Rows */}
        <Box sx={{ ...RowFlex, width: "100%", gap: 1 }}>
          <StyledInput
            onChange={(e) => setName(e.target.value)}
            required
            defaultValue={accountDetails?.name}
            fullWidth
            type="text"
            placeholder="Owner Name"
          />
        </Box>
        <Box sx={{ ...RowFlex, width: "100%", gap: 1 }}>
          <StyledInput
            onChange={(e) => setEmail((e.target as any).value)}
            defaultValue={accountDetails?.email}
            required
            fullWidth
            type="email"
            placeholder="Email Address"
          />
          <StyledInput
            onChange={(e) => setPhone((e.target as any).value)}
            defaultValue={accountDetails?.phone}
            required
            fullWidth
            type="number"
            placeholder="Phone Number"
          />
        </Box>

        <Box sx={{ ...RowFlex, width: "100%", gap: 1 }}>
          <StyledInput
            onChange={(e) => setStoreName((e.target as any).value)}
            defaultValue={accountDetails?.storeName}
            required
            fullWidth
            type="text"
            placeholder="Store Name"
          />
          <StyledInput
            onChange={(e) => setStoreAddress(e.target.value)}
            defaultValue={accountDetails?.storeAddress}
            required
            fullWidth
            type="text"
            placeholder="Store Address"
          />
        </Box>
        <StyledButton
          type="submit"
          text={
            updateAccountDetailsStatus === "pending" ? (
              <CircularProgress size={15} sx={{ color: "white" }} />
            ) : (
              "Save Changes"
            )
          }
          additonalStyles={{
            mt: 1,
          }}
        />
      </Box>
    </GlobalModal>
  );
}

export default EditAccountDetailsModal;
