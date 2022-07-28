import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import axiosInstance from './config/axiosconfig'
import GlucometryForm from './glucometry/GlucometryForm'
import GlucometryReport from './glucometry/GlucometryReport'
import GlucometryUpdate from './glucometry/GlucometryUpdate'
import Haematology from './haematology/Haematology'
import HaematologyReport from './haematology/HaematologyReport'
import HaematologyUpdate from './haematology/HaematologyUpdate'
import Navigationbar from './Navigationbar'
import Thyroidform from './thyroid/Thyroidform'
import ThyroidReport from './thyroid/ThyroidReport'
import ThyroidUpdate from './thyroid/ThyroidUpdate'

const Samples = () => {

  // table data
  const [samples, setsamples] = useState([])



  //====================== FORMS MODALS  ======================// 

  // Haematology modal
  const [haemForm, sethaemForm] = useState(false)
  const [haemid, sethaemid] = useState()

  // Thyroid modal
  const [thyroidForm, setThyroidForm] = useState(false)
  const [thyrid, setthyrid] = useState()

  // Glucometry modal
  const [GlucomForm, setGlucomForm] = useState(false)
  const [Glucid, setGlucid] = useState()


  //====================== REPORTS MODALS  ======================// 

  const [haemReport, sethaemReport] = useState(false);
  const [hemoData, sethemoData] = useState()
  const [hemoUpdateid, sethemoUpdateid] = useState()
  const [hemoUpdateform, sethemoUpdateform] = useState(false);




  // Thyroid model
  const [thyroidReport, setThyroidReport] = useState(false)
  const [thyrData, setthyrData] = useState();
  const [thyrupdateid, setthyrupdateid] = useState();
  const [thyrUpdateform, setthyrUpdateform] = useState(false)

  // Glucometry model
  const [GlucomReport, setGlucomReport] = useState(false);
  const [glucData, setglucData] = useState()
  const [glycUpdateid, setglycUpdateid] = useState()
  const [glycoUpdateform, setglycoUpdateform] = useState(false)


  useEffect(() => {
    getdata();
  }, [])



  const getdata = async () => {
    console.log('in sample');
    try {
     
      const data = await axiosInstance.get('/samples');
      console.log(data.data, '-------response');
      setsamples(data.data);
    } catch (err) {
      console.log(err);
    }
  }


  //====================== FORMS MODALS OPEN  ======================// 

  const HaemaModel = (id) => {
    sethaemid(id)
    sethaemForm(true)
  }

  const HemoatologyReport = (data, id) => {

    console.log(data, id, "-----------------HemoatologyReport");
    sethemoData(data)
    sethemoUpdateid(id)
    sethaemReport(true);

  }


  const ThyroidModal = (id) => {
    setthyrid(id)

    setThyroidForm(true)
  }


  const ThyroidReports = (data, id) => {
    console.log(data, id, "-----------------ThyroidReports");
    setthyrData(data);
    setthyrupdateid(id)
    setThyroidReport(true);
  }


  //====================== Glucomertry  ======================// 


  const GlucometryReports = (data, id) => {
    console.log(data, id, "-----------------GlucometryReports");
    setglucData(data)
    setglycUpdateid(id)
    setGlucomReport(true)
  }

  const GlucometryModal = (id) => {
    setGlucid(id)
    setGlucomForm(true)
  }

  //====================== UPDATE MODALS OPEN  ======================// 



  return (
    <>
      <Navigationbar />

      <div className='cd'>
        <Table hover className='tablecard p-5' variant="light" responsive>
          <thead>
            <tr>
              <th className='th'>_id</th>
              <th className='th'>Patient Name</th>
              <th className='th'>Email</th>
              <th className='th'>Sample ID</th>
              <th className='th'>Haematology </th>
              <th className='th'>Thyroid  </th>
              <th className='th'>Glucometry </th>
            </tr>
          </thead>

          <tbody>

            {samples && samples.map((val, inx) => {
              return (
                <tr key={inx}>
                  <td>{val._id}</td>
                  <td>{val.name}</td>
                  <td>{val.email}</td>
                  <td>{inx + 101}</td>
                  <td>{!val.test ? <Button variant='secondary'>N/A</Button> : val.status.hemo ? (val.heamatology.length > 0 ? <Button variant='primary' onClick={() => { HemoatologyReport(val.heamatology, val._id) }}> view report </Button> : <Button variant='success' onClick={() => { HaemaModel(val._id) }} >add Details</Button>) : <Button variant='light'>N/A</Button>}</td>
                  <td>{!val.test ? <Button variant='secondary'>N/A</Button> : val.status.thyr ? (val.thyroid.length > 0 ? <Button variant='primary' onClick={() => { ThyroidReports(val.thyroid, val._id) }} >view report</Button> : <Button variant='success' onClick={() => { ThyroidModal(val._id) }}>add Details</Button>) : <Button variant='light'>N/A</Button>}</td>
                  <td>{!val.test ? <Button variant='secondary'>N/A</Button> : val.status.glu ? (val.glucometry.length > 0 ? <Button variant='primary' onClick={() => { GlucometryReports(val.glucometry, val._id) }}>View Reports</Button> : <Button variant='success' onClick={() => { GlucometryModal(val._id) }}>add Details</Button>) : <Button variant='light'>N/A</Button>}</td>
                </tr>
              )
            })}
          </tbody>

        </Table>

        <Haematology getdata={getdata} haemForm={haemForm} sethaemForm={sethaemForm} id={haemid && haemid} />
        <Thyroidform getdata={getdata} thyroidForm={thyroidForm} setThyroidForm={setThyroidForm} id={thyrid} />
        <GlucometryForm getdata={getdata} GlucomForm={GlucomForm} setGlucomForm={setGlucomForm} id={Glucid} />

        <HaematologyUpdate getdata={getdata} sethemoUpdateform={sethemoUpdateform} hemoUpdateform={hemoUpdateform} id={hemoUpdateid && hemoUpdateid} hemoData={hemoData} />
        <GlucometryUpdate getdata={getdata} id={glycUpdateid && glycUpdateid} glycoUpdateform={glycoUpdateform} setglycoUpdateform={setglycoUpdateform} glucData={glucData} />
        <ThyroidUpdate getdata={getdata} setthyrUpdateform={setthyrUpdateform} thyrUpdateform={thyrUpdateform} id={thyrupdateid && thyrupdateid} thyrData={thyrData} />


        {samples.length > 0 && <HaematologyReport getdata={getdata} haemReport={haemReport} sethaemReport={sethaemReport} hemoData={hemoData}  sethemoUpdateform={sethemoUpdateform} />}
        {samples.length > 0 && <ThyroidReport getdata={getdata} thyroidReport={thyroidReport} setThyroidReport={setThyroidReport} thyrData={thyrData}  setthyrUpdateform={setthyrUpdateform} />}
        {samples.length > 0 && <GlucometryReport getdata={getdata} GlucomReport={GlucomReport} setGlucomReport={setGlucomReport} glucData={glucData && glucData}  setglycoUpdateform={setglycoUpdateform} />}

      </div>


    </>
  )
}

export default Samples
