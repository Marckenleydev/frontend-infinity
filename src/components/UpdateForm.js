import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../components/Header";
import axios from "axios";
import { useLocation } from 'react-router';

const UpdateForm= () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");



  const handleUpdate = async (values, { resetForm }) => {
    const updatedFields = {};
  
    // Check which fields have been modified and add them to `updatedFields`
    if (values.title !== initialValues.title) {
      updatedFields.title = values.title;
    }
    if (values.instructor !== initialValues.instructor) {
      updatedFields.instructor = values.instructor;
    }
    if (values.description !== initialValues.description) {
      updatedFields.description = values.description;
    }
    if (values.enrolledStudents !== initialValues.enrolledStudents) {
      updatedFields.enrolledStudents = values.enrolledStudents;
    }
  
    if (Object.keys(updatedFields).length === 0) {
      console.log("No fields to update");
      return;
    }
  
    try {
      const response = await axios.put(
        `https://infinity-backend-api.onrender.com/api/course/${id}`,
        updatedFields
       
      );
      console.log("Course update successfully:", response.data);
      resetForm();
    } catch (error) {
      console.error("Failed to create course:", error);
    }
  };
  
  const location = useLocation()
  console.log(location)
  const id = location.pathname.split("/")[2];

  console.log(id)

  return (
    <div className="Form" m="20px">
      <Header title="Update Course" subtitle="Create  or Update Course" />

      <Formik
        onSubmit={handleUpdate}
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
              {id ? "Update Course":"Create New Course"}  
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </div>
  );
};


const checkoutSchema = yup.object().shape({
    title: yup.string(),
    instructor: yup.string(),
    description: yup.string(),
    enrolledStudents: yup.string(),

});
const initialValues = {
    title: "",
    instructor: "",
    description: "",
    enrolledStudents: "",

};

export default UpdateForm;