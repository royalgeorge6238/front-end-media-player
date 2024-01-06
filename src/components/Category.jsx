import React, { useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { addCategory, deleteCategory, getCategory } from '../services/allAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Category() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [categoryName, setCategoryName] = useState()
  const [allCategory, setAllCategory] = useState([])

  const handleAddCategory = async () => {
    if (categoryName) {
      let body = {
        categoryName: categoryName,
        allVideos: []
      }
      const response = await addCategory(body);
      if (response.status == 201) {
        toast.success(`Uploaded Successfully ${categoryName}`);
        setCategoryName("")
        handleClose();
        getAllCategory();  //to delete automatically
      }
      else {
        toast.error("Something went wrong !");
      }
    }
    else {
      toast.warning("Please fill the form completely");
    }
  }

  const getAllCategory = async () => {
    const response = await getCategory();
    const { data } = (response)
    setAllCategory(data)
  }
  useEffect(() => {
    getAllCategory();
  }, [])

  const handleDelete = async(id)=>{
    await deleteCategory(id)
    getAllCategory();  //to delete automatically
  }
  return (
    <>
      <div>
        <button onClick={handleShow} className='btn btn-warning'>Add new category</button>
      </div>
      <div className="m-3">
        {
          allCategory.length>0?
          allCategory.map(item=>(
            <div className='ms-5 m-3 border border-secondary rounded p-3'>
            <div className="d-flex justify-content-between align-items-center">
              <h6>{item.categoryName}</h6>
              <button className='btn btn-danger ms-3' onClick={()=>handleDelete(item.id)}><i class="fa-solid fa-trash"></i></button>
            </div>
          </div>
          )):
          <p>No categories to display</p>
        }
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <i class="fa-solid fa-list text-warning me-3"></i>
            Add Category
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Please fill up the form</p>
          <Form className='border border-secondary p-3 rounded'>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control type="text" placeholder="Enter Category Name "
                onChange={(e) => setCategoryName(e.target.value)} />
            </Form.Group>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="warning" onClick={handleAddCategory}>Add</Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer
        position="top-center"
        autoClose={2000}
        theme='colored'
      />
    </>
  )
}

export default Category