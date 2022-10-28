import { CButton, CCard, CCardBody, CCardHeader, CSpinner, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from "@coreui/react";
import { collection, deleteDoc, doc, getCountFromServer, getDocs, limit, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";

const dataLimit = 10;

function Category() {
    const navigate = useNavigate();
    const [categoryList, setCategoryList] = useState([]);
    const [loader, setLoader] = useState(true);
    const [totalDataCount, setTotalDataCount] = useState(0);
    const [limitDisplayData, setLimitDisplayData] = useState(dataLimit);

    const addNewHandleClick = () => {
        navigate("/category/newcategory");
    }

    useEffect(() => {
        async function getCount() {
            // try {
            //     const coll = collection(db, "category");
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

    const loadMoreFun = () => {
        setLimitDisplayData(prev => prev + dataLimit)
    }

    const getData = async () => {
        // const next = query(collection(db, "category"), orderBy("categoryName"), limit(limitDisplayData));
        // const documentSnapshots = await getDocs(next);
        // const list = [];
        // documentSnapshots.forEach((doc) => {
        //     list.push({ docId: doc.id, ...doc.data() })
        // });
        // setCategoryList(list);
        // setLoader(false);
    };


    const deleteCategory = async (category) => {
        await deleteDoc(doc(db, "category", category.docId));
        setCategoryList(categoryList.filter(item => item.id !== category.id))
    }

    const editCategory = (category) => {
        navigate("/category/editcategory", { state: category })
    }

    return (
        <>
            {loader && <CSpinner className="text-center" color="secondary" />}
            {!loader && <CCard>
                <CCardHeader className="d-flex justify-content-between align-items-center">
                    Category
                    <CButton size="sm" color="success" variant="outline" onClick={addNewHandleClick}>Add New</CButton>
                </CCardHeader>
                <CCardBody>
                    <CTable>
                        <CTableHead>
                            <CTableRow>
                                <CTableHeaderCell scope="col">id</CTableHeaderCell>
                                <CTableHeaderCell scope="col">categoryName</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Edit</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Delete</CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            {
                                categoryList.map(category => <CTableRow key={category.id}>
                                    <CTableHeaderCell scope="row">{category.id}</CTableHeaderCell>
                                    <CTableDataCell>{category.categoryName}</CTableDataCell>
                                    <CTableDataCell><CButton size="sm" color="primary" variant="outline" onClick={() => editCategory(category)}>Edit</CButton></CTableDataCell>
                                    <CTableDataCell><CButton size="sm" color="danger" variant="outline" onClick={() => deleteCategory(category)}>Delete</CButton></CTableDataCell>
                                </CTableRow>)
                            }
                        </CTableBody>
                    </CTable>
                    <CButton size="sm" color="secondary" variant="outline" onClick={loadMoreFun} disabled={totalDataCount <= categoryList.length}>{totalDataCount <= categoryList.length ? "No More Data to fetch" : "Load More.."}</CButton>
                </CCardBody>
            </CCard>}
        </>
    )
}

export default Category

// useEffect(() => {
//     const unsub = onSnapshot(collection(db, "category"), (snapshot) => {
//         const list = [];
//         snapshot.docs.forEach(doc => {
//             list.push({ docId: doc.id, ...doc.data() })
//         });
//         setCategoryList(list);
//         setLoader(false);
//     }, (error) => console.error(error.message));

//     return () => { unsub(); }
// }, [])