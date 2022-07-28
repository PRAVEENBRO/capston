import React, { useEffect, useRef, useState } from 'react'
import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import axiosInstance from './config/axiosconfig'
import Navigationbar from './Navigationbar'





const EnterSample = () => {


  const history = useHistory();


  const [samples, setsamples] = useState([])

  const [sampleId, setsampleId] = useState()

  const [samplestatus, setsamplestatus] = useState({})

  const [sendData, setsendData] = useState({})




  useEffect(() => {
    getdata();
  }, [])


  const getdata = async () => {
    try {
      const data = await axiosInstance.get('/samples');
      console.log(data.data);
      setsamples(data.data)
    } catch (err) {
      console.log(err);
    }
  }

  const userid = (e) => {
    setsampleId(e.target.value)
    var id = e.target.value
    const user = samples.filter((ele) => {
      return ele._id === id
    })
    console.log(user[0].status);
    setsamplestatus(user[0].status)



  }


  if (Object.keys(samplestatus).length > 0) {
    // console.log(samplestatus, '-------------status')
  }


  const radio = (e) => {
    const val = e.target.checked
    const id = e.target.id
    console.log(val, id);
    if (id === "1") {
      setsamplestatus({ ...samplestatus, hemo: val })
    }
    else if (id === "2") {
      setsamplestatus({ ...samplestatus, thyr: val })
    }
    else if (id === "3") {
      setsamplestatus({ ...samplestatus, glu: val })
    }
  }

  const CollectData = () => {
  
    if (sendData) {
      postData();
    }
  }



  const postData = async () => {

    try {

      // console.log(samplestatus, '-------------status in POST DATA')

      
      if (sampleId || samplestatus) {
        console.log(sampleId, samplestatus);
        var send = await axiosInstance.post('/entersample', { sampleId, samplestatus })
        console.log(send.data.error)
        if (send.data.error === false) {
          history.push('/samples');
        } else {
          history.push('/entersample')
        }
      }

    } catch (err) {

      console.log('empty')

    }


  }



  return (
    <>
      <Navigationbar />

      <Modal.Dialog>
        <Modal.Header >
          <Modal.Title>Creat Test </Modal.Title>
        </Modal.Header>


        <div className='container mt-3'>
          <FloatingLabel controlId="floatingSelect" label=" selects Patient" className="mb-4" >
            <Form.Select aria-label="Floating label select example" onChange={userid}  >
              {/* <option value={undefined} >select user sample*</option> */}
              {samples.map((val, inx) => {
                return <option value={val._id} key={inx}>{val.name}</option>
              })}
            </Form.Select>
          </FloatingLabel>
        </div>


        <Modal.Body>
          <Form.Check type="checkbox" name="radio 1" id='1' label="Haemotology" onChange={radio} />
          <br />
          <Form.Check type="checkbox" name="radio 1" id='2' label=" Thyroid Profile" onChange={radio} />
          <br />
          <Form.Check type="checkbox" name="radio 1" id='3' label="Glucometry" onChange={radio} />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={CollectData}>Submit</Button>
        </Modal.Footer>

      </Modal.Dialog>


    </>
  )
}

export default EnterSample