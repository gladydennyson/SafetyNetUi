/*!

=========================================================
* Argon Dashboard React - v1.2.3
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
import React, { useEffect, useState } from 'react';
import dummy from './dummy.json'
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import {
  chartOptions,
  parseOptions,
} from "variables/charts.js";

import Header from "components/Headers/Header.js";
import axios from 'axios';


const buttonStyleCheckIn = {
    padding: "5px",
    backgroundColor: '#0E8DEE',
    fontFamily: "Arial",
    borderRadius: "10px"
  };

const buttonStyleEndSession = {
  padding: "5px",
  backgroundColor: '#00AA6D',
  fontFamily: "Arial",
  borderRadius: "10px"
};
  
const buttonStyleEscalate = {
  padding: "5px",
  backgroundColor: '#f5365c',
  fontFamily: "Arial",
  borderRadius: "10px"
};

const Index = (props) => {

  const [activeNav, setActiveNav] = useState(1);
  const [chartExample1Data, setChartExample1Data] = useState("data1");
  const [data, setData] = useState(null);
  const [progressCount, setProgressCount] = useState(0);
  const [completeCount, setCompleteCount] = useState(0);
  const [alertCount, setAlertCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [filteredData, setFilteredData] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all'); // Initial filter

  const groupAppointments = () => {
    const upcomingAppointments = filteredData.filter((item) => item.status === 'upcoming');
    const ongoingAppointments = filteredData.filter((item) => item.status === 'ongoing');
    const completedAppointments = filteredData.filter((item) => item.status === 'completed');
    return { upcomingAppointments, ongoingAppointments, completedAppointments };
  };

   // Function to handle Check-In
   const handleCheckIn = (appointment) => {
    const updatedData = filteredData.map((item) => {
      if (item.id === appointment.id) {
        return { ...item, status: 'ongoing' };
      }
      return item;
    });
    setFilteredData(updatedData);
  };


  const filterDataByStatus = (status) => {
    console.log('filter status', status);
    if (status === 'all') {
      console.log('status', status);
      setFilteredData(data); // No filter, show all data
    } else {
      const filtered = data.filter(item => item.status === status);
      setFilteredData(filtered);
    }
    setFilterStatus(status); // Update the filter status
  };


    async function fetchData() {
      try {
        // const date = '2023-10-11';
        // const response = await fetch('http://serviceforlistener.azurewebsites.net/serviceDetails.do/dd/dd');
        // if (!response.ok) {
        //   throw new Error('Network response was not ok');
        // }
        // const result = await response.json();
        var result = dummy;
        setData(result);
        setFilteredData(result);
        computeAndPassCounts(result);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    }

    useEffect(() => {
      fetchData();
      console.log('useEffect', data);

    }, []); // This empty array means it will run only once when the component mounts


  const handleViewChange = (selectedView) => {

    var result = dummy;
    // Handle the view change here
    console.log(`Selected view: ${selectedView}`);
    console.log('filtereddata', filteredData);

    if (selectedView === 'admin' || selectedView === 'therapist') {
      setFilterStatus(selectedView);
    } else {
      // Handle other cases or filters if needed
      filterDataByStatus(selectedView);
    }
    
    // You can perform any necessary actions based on the view selection

  };


  

  function computeAndPassCounts(data) {
    const progressCount = data.filter(item => item.status === 'progress').length;
    const completeCount = data.filter(item => item.status === 'complete').length;
    const alertCount = data.filter(item => item.status === 'alert').length;
    const pendingCount = data.filter(item => item.status === 'pending').length;

    setProgressCount(progressCount);
    setCompleteCount(completeCount);
    setAlertCount(alertCount);
    setPendingCount(pendingCount);
  }
  
  return (
    <>
      <Header 
      progressCount={progressCount}
      completeCount={completeCount}
      alertCount={alertCount}
      onFilter={filterDataByStatus} 
      filterStatus={filterStatus} 
      onViewChange={handleViewChange}
      pendingCount={pendingCount}/>
      {/* Page content */}
      
      <Container className="mt--7" fluid>
        <Row>
          <Col className="mb-5 mb-xl-0" xl="8">
          </Col>
        </Row>

        {filterStatus === 'therapist' &&  <Col style={{ color: 'white', fontSize: '28px' }}>Appointments</Col>}
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="12">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0"></h3>
                  </div>
            
                </Row>
              </CardHeader>

              {data ? (
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Therapist</th>
                    <th scope="col">Appointment Start Time</th>
                    <th scope="col">Appointment End Time</th>
                    <th scope="col">Client Name</th>
                    <th scope="col">Risk Assessment</th>
                    {filterStatus === 'admin'}<th scope="col">Delay</th>
                    <th scope="col">Action</th>
                    
                  </tr>
                </thead>
                <tbody>
              {filteredData.map((item, index) => (
              <tr key={index}>
                <td>{item.therapistName}</td>
                <td>{item.startTime}</td>
                <td>{item.endTime}</td>
                <td>{item.clientName}</td>
                {item.riskAssessment ==='Low' && <td style={{color: 'green'}}>{item.riskAssessment}</td>}
                {item.riskAssessment ==='Moderate' && <td style={{color: 'orange'}}>{item.riskAssessment}</td>}
                {item.riskAssessment ==='High' && <td style={{color: 'red'}}>{item.riskAssessment}</td>}
                {filterStatus === 'therapist' &&  item.status === 'pending' &&
                <td><button style={buttonStyleCheckIn}>Check-in</button></td>}
                {filterStatus === 'therapist' &&  item.status === 'complete' &&
                <td><button style={buttonStyleEndSession}>End Sessions</button></td>}
                {filterStatus === 'admin' &&  item.status === 'alert' && <td>{item.delay}</td>}
                {filterStatus === 'admin' &&  item.status === 'alert' &&
                <td><button style={buttonStyleEscalate}>Escalate</button></td>}
                {/* Add more table data cells for other properties */}

              </tr>
            ))}
                </tbody>
              </Table>
              ): (
                <div>Loading..</div>
              )}
            </Card>
          </Col>
        </Row>
        <div>
        </div>
      </Container>
    </>
  );
};

export default Index;
