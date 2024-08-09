import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { toast } from "react-toastify";
import { RootState } from "../redux/store";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ProfileFormData } from "../utils/interface/types";
import { validationSchemaForProfile } from "../utils/validationSchema/validationSchema";

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
 const userDetails = useSelector((state: RootState) => state.user.userDetails);


  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ProfileFormData>({
    defaultValues: {
      name: userDetails?.name || "",
      email: userDetails?.email || "",
    },
    
  });

  const onSubmit = async (data: ProfileFormData) => {
      navigate("/chat");
      toast.success("You back to chat Page")
     
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} style={{ padding: "14px" ,marginTop:"26px"}}>
        <Typography variant="h4" gutterBottom align="center">
          Profile
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                fullWidth
                margin="dense"
                label="name"
                {...field}
                variant="outlined"
                disabled
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                fullWidth
                margin="dense"
                label="Email"
                {...field}
                variant="outlined"
                disabled
              />
            )}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            style={{ marginTop: "16px" }}
           
          >
            Back to Chat
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Profile;
