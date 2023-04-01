import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../components/Header";
import axios from "axios";


const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = async (values, { resetForm }) => {
    try {
      const response = await axios.post("https://infinity-backend-api.onrender.com/api/course", values);
      console.log("Course created successfully:", response.data);
      resetForm()
    } catch (error) {
      console.error("Failed to create course:", error);
    }
  };

 


 

  return (
    <div className="Form" m="20px">
      <Header title="Create Course"  subtitle="Create Course " />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form className="update-form" onSubmit={handleSubmit}>
            <Box
            className="box"
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Title"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.title}
                name="title"
                error={!!touched.title && !!errors.title}
                helperText={touched.title && errors.title}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Instructor"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.instructor}
                name="instructor"
                error={!!touched.instructor && !!errors.instructor}
                helperText={touched.instructor && errors.instructor}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Description"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                name="description"
                error={!!touched.description && !!errors.description}
                helperText={touched.description && errors.description}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Enrolled Students"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.enrolledStudents}
                name="enrolledStudents"
                error={!!touched.enrolledStudents && !!errors.enrolledStudents}
                helperText={touched.enrolledStudents && errors.enrolledStudents}
                sx={{ gridColumn: "span 4" }}
              />

            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
              Create New Course
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </div>
  );
};


const checkoutSchema = yup.object().shape({
    title: yup.string().required("required"),
    instructor: yup.string().required("required"),
    description: yup.string().required("required"),
    enrolledStudents: yup.string().required("required"),

});
const initialValues = {
    title: "",
    instructor: "",
    description: "",
    enrolledStudents: "",

};

export default Form;