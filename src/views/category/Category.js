import { CButton, CCard, CCardBody, CCardHeader, CSpinner, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from "@coreui/react";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";

function Category() {
    const navigate = useNavigate();
    const [categoryList, setCategoryList] = useState([]);
    const [loader, setLoader] = useState(true);

    const addNewHandleClick = () => {
        navigate("/category/newcategory");
    }

    useEffect(() => {
        const unsub = onSnapshot(collection(db, "category"), (snapshot) => {
            const list = [];
            snapshot.docs.forEach(doc => {
                list.push({ docId: doc.id, ...doc.data() })
            });
            setCategoryList(list);
            setLoader(false);
        }, (error) => console.error(error.message));

        return () => { unsub(); }
    }, [])

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
                </CCardBody>
            </CCard>}
        </>
    )
}

export default Category