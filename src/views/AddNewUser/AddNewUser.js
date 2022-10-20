import { CButton, CCol, CForm, CFormCheck, CFormFeedback, CFormInput, CFormSwitch, CSpinner } from '@coreui/react'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useEffect, useMemo, useState } from "react";
import { db, auth } from "../../firebase"
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useLocation, useNavigate } from 'react-router-dom';
import { CCard, CCardBody, CCardHeader } from '@coreui/react'

function AddNewUser() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(false);
    const [loader, setLoader] = useState(false);
    const { state } = useLocation();
    const password = state && useMemo(() => state.password, []);
    const navigate = useNavigate();

    useEffect(() => {
        setData(state ? { ...state } : { checkbox: false, active: false })
    }, [])

    let formItems = [
        {
            type: "text",
            id: "username",
            label: "UserName",
        },
        {
            type: "text",
            id: "firstname",
            label: "FirstName",
        },
        {
            type: "text",
            id: "lastname",
            label: "LastName",
        },
        {
            type: "email",
            id: "email",
            label: "Email",
        }
    ]

    const changeData = e => {
        console.log("changeData");
        const itemId = e.target.id;
        const value = itemId === "active" || itemId === "checkbox" ? e.target.checked : e.target.value;
        console.log(itemId, value);

        setData({ ...data, [itemId]: value });
    }

    const addUser = async e => {
        e.preventDefault();
        setLoader(true);
        try {
            const res = await createUserWithEmailAndPassword(auth, data.email, data.password)
            await setDoc(doc(db, "admin", res.user.uid), {
                ...data,
                timeStamp: serverTimestamp()
            })
                .then(() => { setLoader(false); navigate(-1); })
                .catch((err) => { throw new Error(err) })
        } catch (err) {
            console.error(err.message);
        }
    }
    // const editData = e => {
    //     const editFieldId = e.target.id;
    //     const value = e.target.id ==="active"||e.target.id ==="checkbox"? e.target.checked : e.target.value;

    //     state[editFieldId] = value;

    //     setData({ ...state, [editFieldId]: value });
    // }
    const editUser = async e => {
        e.preventDefault();
        setLoader(true);
        try {
            if (data.password !== password) {
                throw new Error("Wrong password Please Enter correct password");
            }
            await setDoc(doc(db, "admin", data.id), {
                ...data,
                updated: serverTimestamp()
            }).then(() => { setLoader(false); setError(false); navigate(-1); })
            // setError(false);
            // navigate(-1);
        } catch (err) {
            setError(true);
        }
    }

    return (
        <CCard>
            <CCardHeader className="d-flex justify-content-between align-items-center">
                {state && "Edit User"}
                {!state && "Add User"}
                <CButton size="sm" color="secondary" variant="outline" onClick={() => navigate(-1)}>Back</CButton>
            </CCardHeader>
            <CCardBody>
                <CForm className="row g-3">
                    <CCol xs={12}>
                        {state && formItems.map(item => <CFormInput key={item.id} type={item.type} id={item.id} label={item.label} value={data ? data[item.id] : ""} onChange={changeData} />)}
                        {!state && formItems.map(item => <CFormInput key={item.id} type={item.type} id={item.id} label={item.label} onChange={changeData} />)}
                    </CCol>
                    <CCol xs={12}>
                        <CFormInput type="password" id="password" label="Password" onChange={changeData} invalid={error} required />
                        <CFormFeedback invalid>Enter correct password</CFormFeedback>
                    </CCol>
                    <CCol>
                        {data && <CFormSwitch label="active" id="active" onChange={changeData} defaultChecked={data.active} />}
                    </CCol>
                    <CCol xs={12}>
                        {data && <CFormCheck type="checkbox" id="checkbox" label="Allow User to login in admin panel" onChange={changeData} defaultChecked={data.checkbox} />}
                    </CCol>
                    <CCol xs={12}>
                        {loader && <CButton disabled><CSpinner component="span" size="sm" aria-hidden="true" /> </CButton>}
                        {!loader && <CButton type="submit" onClick={state ? editUser : addUser}>{state ? "Edit" : "Add"}</CButton>}
                    </CCol>
                </CForm>
            </CCardBody>
        </CCard>

    )
}

export default AddNewUser