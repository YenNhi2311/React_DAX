import React, { useEffect, useState } from 'react';
import { Box, useTheme, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox, Button, InputBase, CircularProgress, Typography } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../component/Header";
import request from '../../config/ApiConfig/index'; // Import hàm request
import { useSearchParams, useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AttributeOptions = ({ onSelectAttributeOption }) => {
  const [searchParams] = useSearchParams();
  const params = useParams();
  const theme = useTheme();
  const navigate = useNavigate();
  const colors = tokens(theme.palette.mode);
  const [attributeOptions, setAttributeOptions] = useState([]);
  const [attributes, setAttributes] = useState({});
  const [selectedIds, setSelectedIds] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   

    const fetchData = async () => {
      try {
        const [attributeOptionsResponse, attributesResponse] = await Promise.all([
          request({ method: 'GET', path: '/api/attribute-options' }),
          request({ method: 'GET', path: '/api/attributes' })
        ]);
       
        if (attributeOptionsResponse && attributesResponse) {
          const attributesMap = attributesResponse.reduce((map, attribute) => {
            map[attribute.id] = attribute.name;
            return map;
          }, {});

          const dataWithId = attributeOptionsResponse.map(option => ({
            id: option.id,
            attributeId: option.attributeId, // ID của thuộc tính
            attributeName: attributesMap[option.attributeId], // Tên của thuộc tính
            value: option.value,
            img: option.img
          }));

          dataWithId.sort((a, b) => b.id - a.id);

          const id = params.id || searchParams.get("id") || null;
          if (id) {
            const initialSelection = dataWithId.find(option => option.id === id);
            if (initialSelection) {
              setSelectedIds([initialSelection.id]);
              if (onSelectAttributeOption) {
                onSelectAttributeOption(initialSelection);
              }
            }
          }

          setAttributeOptions(dataWithId);
          setAttributes(attributesMap);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error loading data:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [searchParams, params.id, onSelectAttributeOption]);

  const handleRowClick = (id) => {
    setSelectedIds(prevSelected =>
      prevSelected.includes(id)
        ? prevSelected.filter(selectedId => selectedId !== id)
        : [...prevSelected, id]
    );

    const selectedOption = attributeOptions.find(option => option.id === id);
    if (onSelectAttributeOption && selectedOption) {
      onSelectAttributeOption(selectedOption);
    }
  };

  const handleEditOrAddAttributeOption = () => {
    if (selectedIds.length === 1) {
      navigate(`/admin/formAttributeOption/${selectedIds[0]}`, { state: { mode: "edit" } });
    } else {
      navigate(`/admin/formAttributeOption`, { state: { mode: "add" } });
    }
  };

  const handleDeleteAttributeOption = () => {
    if (selectedIds.length > 0) {
      if (window.confirm(`Are you sure you want to delete ${selectedIds.length} attribute options?`)) {
        Promise.all(
          selectedIds.map(id => request({
            method: 'DELETE',
            path: `/api/attribute-options/${id}`,
          }))
        )
          .then(() => {
            console.log("Successfully deleted attribute options");
            setAttributeOptions(prevOptions => prevOptions.filter(option => !selectedIds.includes(option.id)));
            setSelectedIds([]);
            toast.success("Successfully deleted attribute options");
          })
          .catch(error => {
            console.error('Error deleting attribute options:', error);
            toast.error("Error occurred while deleting attribute options");
          });
      }
    } else {
      toast.error("No attribute options selected for deletion");
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Lọc dữ liệu dựa trên từ khóa tìm kiếm
  const filteredOptions = attributeOptions.filter(option =>
    option.value.toLowerCase().includes(searchTerm.toLowerCase()) ||
    option.attributeName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isSelected = (id) => selectedIds.includes(id);

  return (
    <Box m="20px">
      <Header title="Attribute Options" subtitle="List of attribute options" />

      {error ? (
        <div>Error: {error}</div>
      ) : (
        <>
          <Box
            display="flex"
            backgroundColor={colors.primary[400]}
            borderRadius="3px"
            mb="20px"
            width="250px"
            height="35px"
          >
            <InputBase
              sx={{ ml: 1, flex: 1, py: 1 }}
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </Box>
          <Box display="flex" justifyContent="flex-end" mb="20px">
            {selectedIds.length <= 1 && (
              <Button
                type="button"
                color="secondary"
                variant="contained"
                onClick={handleEditOrAddAttributeOption}
                sx={{ marginRight: '10px' }}
              >
                {selectedIds.length === 1 ? "Edit" : "Add New"}
              </Button>
            )}
            {selectedIds.length > 0 && (
              <Button
                type="button"
                color="secondary"
                variant="contained"
                onClick={handleDeleteAttributeOption}
                sx={{ marginRight: '10px' }}
              >
                {selectedIds.length > 1 ? "Delete Selected" : "Delete"}
              </Button>
            )}
          </Box>
          {loading ? (
            <CircularProgress />
          ) : attributeOptions.length === 0 ? (
            <div>No attribute options found.</div>
          ) : (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead sx={{ backgroundColor: colors.blueAccent[700] }}>
                  <TableRow>
                    <TableCell />
                    <TableCell sx={{ color: 'white' }}>ID</TableCell>
                    <TableCell sx={{ color: 'white' }}>Attribute Name</TableCell>
                    <TableCell sx={{ color: 'white' }}>Value</TableCell>
                    <TableCell sx={{ color: 'white' }}>Image</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredOptions.map((row) => (
                    <TableRow
                      key={row.id}
                      onClick={() => handleRowClick(row.id)}
                      sx={{
                        cursor: 'pointer',
                        '&:last-child td, &:last-child th': { border: 0 },
                        backgroundColor: isSelected(row.id) ? colors.primary[300] : 'inherit',
                        '&:hover': {
                          backgroundColor: colors.primary[200],
                        },
                      }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isSelected(row.id)}
                          onChange={() => handleRowClick(row.id)}
                          color="primary"
                        />
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.id}
                      </TableCell>
                      <TableCell>{row.attributeName}</TableCell>
                      <TableCell>{row.value}</TableCell>
                      <TableCell>
                        
                        {row.img ? (
                          <img
                            src={`/assets/img/${row.img}`} // Đảm bảo `row.img` chứa tên tệp hình ảnh
                            alt="Hình ảnh loại"
                            style={{ width: '100px', height: '100px', objectFit: 'cover' }} // Hoặc thay đổi kích thước theo ý muốn
                          />
                        ) : (
                          <Typography variant="body2" color="textSecondary">Không có hình ảnh</Typography> // Hiển thị văn bản thay thế nếu không có hình ảnh
                        )}
                      </TableCell>

                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </>
      )}
      <ToastContainer />
    </Box>
  );
};

export default AttributeOptions;
