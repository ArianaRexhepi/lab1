import React from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import './homepage.css';
import { useSelector } from 'react-redux';

function PersonalProfile() {
  const state = useSelector((state) => state);
  let isAdmin = false;
  if (!state.user) {
    const role = state.user.userRoles.find((role) => role !== "Admin");
    if (role) {
      isAdmin = true;
    }
  }
  return (
    <section className="custom-height" >
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="6" className="mb-4 mb-lg-0">
            <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
              <MDBRow className="g-0">
                <MDBCol md="4" className="gradient-custom text-center text-white"
                  style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                  <MDBTypography tag="h5" style={{marginTop: '5rem', color: 'black'}}>Role</MDBTypography>
                  <MDBCardText style={{color: 'black'}}>{!isAdmin ?"User":"Admin"}</MDBCardText>
                  <MDBIcon far icon="edit mb-5" />
                </MDBCol>
                <MDBCol md="8">
                  <MDBCardBody className="p-4">
                    <MDBTypography tag="h6">Profile Details</MDBTypography>
                    <hr className="mt-0 mb-4" />
                    <MDBRow className="pt-1">
                    <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Username</MDBTypography>
                        <MDBCardText className="text-muted">{state.user.username}</MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Email</MDBTypography>
                        <MDBCardText className="text-muted">{state.user.email}</MDBCardText>
                      </MDBCol>
                      
                    </MDBRow>

                    <MDBTypography tag="h6"></MDBTypography>
                  
                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6"></MDBTypography>
                        <MDBCardText className="text-muted"></MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6"></MDBTypography>
                        <MDBCardText className="text-muted"></MDBCardText>
                      </MDBCol>
                    </MDBRow>

                    <div className="d-flex justify-content-start">
                      <a href="#!"><MDBIcon fab icon="facebook me-3" size="lg" /></a>
                      <a href="#!"><MDBIcon fab icon="twitter me-3" size="lg" /></a>
                      <a href="#!"><MDBIcon fab icon="instagram me-3" size="lg" /></a>
                    </div>
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}

export default PersonalProfile;