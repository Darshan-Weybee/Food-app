import { CButton, CCard, CCardBody, CCardHeader, CCol, CForm, CFormInput, CFormSelect, CSpinner } from "@coreui/react";
import { addDoc, collection, doc, onSnapshot, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db} from "../../firebase";

function AddNewProduct() {
    const [product, setProduct] = useState(null);
    const [categoryDetails, setCategoryDetails] = useState();
    const [loader, setLoader] = useState(false);
    const {state} = useLocation();
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {

        const unsub = onSnapshot(collection(db, "category"), (snapshot) => {
            const list = [];
            snapshot.docs.forEach(doc => {
                list.push({ ...doc.data() })
            });
            setCategoryDetails(list);
        }, (error) => console.error(error.message));

        setProduct({...state});
        
        return () => { unsub(); }

    }, [])

    const formItem = [
        {
            type: "text",
            id: "id",
            label: "Product ID",
            placeholder: "Product ID"
        },
        {
            type: "text",
            id: "name",
            label: "Product Name",
            placeholder: "Product Name"
        },
        {
            type: "text",
            id: "dsc",
            label: "Product Description",
            placeholder: "Product Description"
        },
        {
            type: "text",
            id: "img",
            label: "Product Image URL",
            placeholder: "Product Image URL"
        },
        {
            type: "text",
            id: "country",
            label: "Country",
            placeholder: "Country"
        },
        {
            type: "number",
            id: "price",
            label: "Product Price",
            placeholder: "Product Price"
        },
        {
            type: "number",
            id: "rate",
            label: "Rate",
            placeholder: "Rate"
        },
    ]

    const changeData = e => {
        const id = e.target.id;
        const value = e.target.value;

        setProduct({ ...product, [id]: value })
    }

    const addProduct = async e => {
        try {
            e.preventDefault();
            setLoader(true);
            await addDoc(collection(db, "products"), {
                ...product
            })
            setLoader(false);
            setError(false); 
            navigate(-1);
        } catch (err) {
            setError(err.message)
        }
    }

    const editProduct = async e => {
        try{
            e.preventDefault();
            setLoader(true);
            await setDoc(doc(db, "products", product.docId),{
                ...product
            })
            setLoader(false);
            navigate(-1);
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <CCard>
            <CCardHeader className="d-flex justify-content-between align-items-center">
                {state && "Edit Product"}
                {!state && "Add Product"}
                <CButton size="sm" color="secondary" variant="outline" onClick={() => navigate(-1)}>Back</CButton>
            </CCardHeader>
            <CCardBody>
                <CForm className="row g-3" onSubmit={state ? editProduct : addProduct}>
                    <CCol xs={12}>
                        {state && formItem.map((item, index) => <CFormInput key={index} className="mb-2" type={item.type} id={item.id} label={item.label} value={product ? product[item.id] : ""} onChange={changeData} />)}
                        {!state && formItem.map((item, index) => <CFormInput key={index} className="mb-2" type={item.type} id={item.id} label={item.label} placeholder={item.placeholder} onChange={changeData} />)}
                    </CCol>
                    <CCol xs={12}>
                        <CFormSelect label="Type" id="categoryId" value={product ? product.categoryId : ""} onChange={changeData}>
                            <option>Open this Menu</option>
                            {categoryDetails && categoryDetails.map(category => <option key={category.id} value={category.id}>{category.categoryName}</option>)}
                        </CFormSelect>
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

export default AddNewProduct


        // const getFood = async () => {
        //     const res = await fetch("https://ig-food-menus.herokuapp.com/steaks");
        //     const response = await res.json();

        //     response.forEach(document => {
        //         document = {...document, categoryId : "Steaksee41e915"}
        //         const docRef = doc(collection(db, "products")); //automatically generate unique id
        //         batch.set(docRef, document);
        //     })
        //     console.log("commit");
        //     await batch.commit();
        //     console.log("complete");
        // }
        // // getFood();

        // return () => { getFood(); }