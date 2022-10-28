import { CButton, CCard, CCardBody, CCardHeader, CSpinner, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from "@coreui/react";
import { collection, getCountFromServer, getDocs, limit, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase"

const dataLimit = 10;

function Products() {
    const [totalDataCount, setTotalDataCount] = useState(0);
    const [productList, setProductList] = useState([]);
    const [loader, setLoader] = useState(true);
    const navigate = useNavigate();
    const [limitDisplayData, setLimitDisplayData] = useState(dataLimit);

    useEffect(() => {
        async function getCount() {
            // try {
            //     const coll = collection(db, "products");
            //     const snapshot = await getCountFromServer(coll);
            //     setTotalDataCount(snapshot.data().count);
            //     setLoader(false);
            // } catch (err) {
            //     console.error(err.message);
            // }
        }
        getCount();
    }, [])

    useEffect(() => {
        getData();
    }, [limitDisplayData])

    const getData = async () => {
        // const next = query(collection(db, "products"), orderBy("name"), limit(limitDisplayData));
        // const documentSnapshots = await getDocs(next);
        // const list = [];
        // documentSnapshots.forEach((doc) => {
        //     list.push({ docId: doc.id, ...doc.data() })
        // });
        // setProductList(list);
        // setLoader(false);
    };

    const addNewProducts = () => {
        navigate("/products/newproduct");
    }

    const editProduct = product => {
        navigate("/products/editproduct", { state: product });
    }

    const loadMoreFun = () => {
        setLimitDisplayData(prev => prev + dataLimit)
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
                        <CButton size="sm" color="secondary" variant="outline" onClick={loadMoreFun} disabled={totalDataCount <= productList.length+1}>{totalDataCount <= productList.length+1 ? "No More Data to fetch" : "Load More.."}</CButton>
                    </CCardBody>
                </CCard>
            }
        </>
    )
}

export default Products


        //     const list = [];
        //     snapshot.docs.forEach(doc => {
        //         list.push({ docId : doc.id, ...doc.data() })
        //     });
        //     setTotalData(list);
        //     setLoader(false);
        // }, (error) => console.error(error.message));

        // return () => { unsub(); }



