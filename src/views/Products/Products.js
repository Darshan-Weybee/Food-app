import { CButton, CCard, CCardBody, CCardHeader, CSpinner, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from "@coreui/react";
import { collection, getDocs, limit, orderBy, query, startAfter } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase"

function Products() {
    const [productList, setProductList] = useState([]);
    const [loader, setLoader] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {

        const getData = async () => {
            const next = query(collection(db, "products"), orderBy("id"), startAfter(""), limit(5));
            const documentSnapshots = await getDocs(next);
            console.log(documentSnapshots);
        }
        getData();
        // const unsub = onSnapshot(collection(db, "products"), (snapshot) => {
        //     const list = [];
        //     snapshot.docs.forEach(doc => {
        //         list.push({ docId : doc.id, ...doc.data() })
        //     });
        //     setProductList(list);
        //     setLoader(false);
        // }, (error) => console.error(error.message));

        // return () => { unsub(); }
    }, [])

    const addNewProducts = () => {
        navigate("/products/newproduct");
    }

    const editProduct = product => {
        navigate("/products/editproduct", { state: product });
    }

    return (
        <>
            {loader && <CSpinner className="text-center" color="secondary" />}
            {!loader &&
                <CCard>
                    <CCardHeader className="d-flex justify-content-between align-items-center">
                        Products
                        <CButton size="sm" color="success" variant="outline" onClick={addNewProducts}>Add New</CButton>
                    </CCardHeader>
                    <CCardBody>
                        <CTable>
                            <CTableHead>
                                <CTableRow>
                                    <CTableHeaderCell scope="col">Product Id</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Category ID</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Description</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Country</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Price</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Rating</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Edit</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {
                                    productList.map((product, index) => <CTableRow key={index}>
                                        <CTableHeaderCell scope="row">{product.id}</CTableHeaderCell>
                                        <CTableDataCell>{product.categoryId}</CTableDataCell>
                                        <CTableDataCell>{product.name}</CTableDataCell>
                                        <CTableDataCell>{product.dsc}</CTableDataCell>
                                        <CTableDataCell>{product.country}</CTableDataCell>
                                        <CTableDataCell>{product.price}</CTableDataCell>
                                        <CTableDataCell>{product.rate}</CTableDataCell>
                                        <CTableDataCell><CButton size="sm" color="primary" variant="outline" onClick={() => editProduct(product)}>Edit</CButton></CTableDataCell>
                                    </CTableRow>)
                                }
                            </CTableBody>
                        </CTable>
                    </CCardBody>
                </CCard>}
        </>
    )
}

export default Products 
