import { CButton, CCard, CCardBody, CCardHeader, CCol, CForm, CFormInput, CSpinner } from "@coreui/react";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { v4 as uuid } from 'uuid';

function AddNewCategory() {
    const {state} = useLocation();
    const [category, setCategory] = useState("");
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        state && setCategory(state.categoryName);
    }, [])

    const generateUniqueId = () => {
        const unique_id = uuid();
        const small_id = unique_id.slice(0, 8);
        return small_id;
    }

    const submitHandle = async e => {
        e.preventDefault();
        try {
            setLoader(true);
            const uid = generateUniqueId();
            await addDoc(collection(db, "category"), {
                id: category + uid,
                categoryName: category
            })
            setLoader(false);
            navigate(-1);
        } catch (err) {
            setLoader(false);
            setError(err.message);
        }
    }

    const editCategory = async e => {
        e.preventDefault();
        setLoader(true);
        try {
            await setDoc(doc(db, "category", state.docId), {
                ...state,
                categoryName : category
            })
            setLoader(false); 
            setError(false); 
            navigate(-1);
        } catch (err) {
            setError(true);
        }
    }

    const changeData = e => {
        const value = e.target.value;
        setCategory(value);
    }

    return (
        <CCard>
            <CCardHeader className="d-flex justify-content-between align-items-center">
                {state && "Edit Category"}
                {!state && "Add Category"}
                <CButton size="sm" color="secondary" variant="outline" onClick={() => navigate(-1)}>Back</CButton>
            </CCardHeader>
            <CCardBody>
                <CForm className="row g-3" onSubmit={state ? editCategory : submitHandle}>
                    <CCol xs={12}>
                        {state &&  <CFormInput type="text" id="category" label="Category" value={category} onChange={changeData} />}
                        {!state && <CFormInput type="text" id="category" label="Category" onChange={changeData} />}
                    </CCol>
                    <CCol xs={12}>
                        {loader && <CButton disabled><CSpinner component="span" size="sm" aria-hidden="true" /> </CButton>}
                        {!loader && <CButton type="submit">{state ? "Edit" : "Add"}</CButton>}
                    </CCol>
                    {error && <p className="text-danger">{error}</p>}
                </CForm>
            </CCardBody>
        </CCard>
    )
}

export default AddNewCategory