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

// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";

import React, { useEffect, useState } from 'react';

const Header = ({ progressCount, completeCount, alertCount, pendingCount, onFilter, filterStatus, showFilters  }) => {
  const [selectedOption, setSelectedOption] = useState('admin');

  const handleDropdownChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    onFilter(selectedValue);
  };

  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container style={{ padding: 20 }}>
          <div className="d-flex justify-content-end mt-3">
            <label htmlFor="filterDropdown">View</label>
            <select
              id="filterDropdown"
              value={selectedOption}
              onChange={handleDropdownChange}
            >
              <option value="therapist">Therapist</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </Container>
      {selectedOption === 'admin' && (
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row>
              <Col lg="6" xl="3">
                <Card onClick={() => onFilter('progress')}
                  style={{ cursor: 'pointer' }} className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          In Progress
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                        {progressCount}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                        <img width="50" height="50" src="../../assets/icons/icons8-alert-100.png" alt="apple-phone"/>
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card onClick={() => onFilter('alerts')}
                  style={{ cursor: 'pointer' }} className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Alerts
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{alertCount}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                          <i className="fas fa-chart-pie" />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card onClick={() => onFilter('pending')}
                  style={{ cursor: 'pointer' }} className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Pending
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{pendingCount}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                          <i className="fas fa-users" />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card onClick={() => onFilter('complete')}
                  style={{ cursor: 'pointer' }} className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          COMPLETED
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{completeCount}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                          <i className="fas fa-percent" />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      )}
      </div>
    </>
  );
};

export default Header;
