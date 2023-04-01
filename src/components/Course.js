import { Box,useTheme , IconButton } from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../theme";
import Header from "../components/Header";
import React, { useState, useEffect } from 'react';
import { useNavigate,Link } from 'react-router-dom';

import axios from 'axios';
function Course() {
    const [courses, setCourses] = useState([]);
   
  
    useEffect(() => {
        axios.get('https://infinity-backend-api.onrender.com/api/course/allcourses')
          .then(response => {
            const data = response.data.map(course => ({
              ...course,
              id: course._id // set the id property to the course ID
            }));
            setCourses(data);
          })
          .catch(error => console.log(error));
      }, []);

     

      const handleDelete = (id) => {
        if (id) {
          axios.delete(`https://infinity-backend-api.onrender.com/api/course/${id}`)
            .then(response => {
              const updatedCourses = courses.filter(course => course._id !== id);
              setCourses(updatedCourses);
            })
            .catch(error => console.log(error));
        } else {
          console.log('Invalid course ID');
        }
      };
  
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const columns = [
      { field: "_id", headerName: "ID" },
      { field: "title", headerName: "Course", flex: 1 },
      { field: "instructor", headerName: "Instructor", flex: 1 },
      {
        field: "enrolledStudents",
        headerName: "Enrolled Student",
        type: "number",
        flex: 1,
      },
      { field: "description", headerName: "Descriptions", flex: 1 },
      {
        field: "Delete",
        headerName: "Delete",
        sortable: false,
        renderCell: ({ row }) => (
          <IconButton
            aria-label="delete"
            onClick={() => handleDelete(row._id)}
          >
            <DeleteOutlineIcon/>
          </IconButton>
        ),
      },
      {
        field: "edit",
        headerName: "Edit",
        sortable: false,
        renderCell: ({ row }) => (
            <Link to={`/form/${row._id}`}>
            <IconButton aria-label="edit">
              <EditIcon/>
            </IconButton>
          </Link>
        ),
      },
    ];
  
    return (
      <Box m="20px">
        <Header title="COURSES" subtitle="Managing the Courses" />
        <Box
          m="40px 0 0 0"
          height="75vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: colors.blueAccent[700],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: colors.primary[400],
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: colors.blueAccent[700],
            },
            "& .MuiCheckbox-root": {
              color: `${colors.greenAccent[200]} !important`,
            },
          }}
        >
          <DataGrid rows={courses} columns={columns} />
        </Box>
      </Box>
    );
  }
  
  export default Course;
  

