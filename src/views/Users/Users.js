import React, { useEffect, useState } from "react";
import { CCard, CCardBody, CCardHeader, CSpinner, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'
import { CButton } from '@coreui/react'
import { useNavigate } from "react-router-dom";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase"

function Users() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        const unsub = onSnapshot(collection(db, "admin"), (snapshot) => {
            const list = [];
            snapshot.docs.forEach(doc => {
                list.push({ id: doc.id, ...doc.data() })
            });
            setUsers(list);
            setLoader(false);
        }, (error) => console.error(error.message));

        return () => { unsub(); }
    }, [])

    const items = users.map(user => {
        return {
            id: user.id,
            username: user.username,
            firstname : user.firstname,
            lastname : user.lastname,
            email: user.email,
            checkbox : user.checkbox,
            active : user.active,
            password : user.password,
            // _cellProps: { id: { scope: 'row' }, class: { colSpan: 2 } },
        }
    })

    const editUser = item => {
        navigate("/users/edituser" , {state : item});
    }

    const addNewUser = () => {
        navigate("/users/newuser");
    }

    return (
        <>
            {loader && <CSpinner className="text-center" color="secondary"/>}
            {!loader && 
            <CCard>
                <CCardHeader className="d-flex justify-content-between align-items-center">
                    Users
                    <CButton size="sm" color="success" variant="outline" onClick={addNewUser}>Add New</CButton>
                </CCardHeader>
                <CCardBody>
                    <CTable>
                        <CTableHead>
                            <CTableRow>
                                <CTableHeaderCell scope="col">id</CTableHeaderCell>
                                <CTableHeaderCell scope="col">userName</CTableHeaderCell>
                                <CTableHeaderCell scope="col">email</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Active</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Edit</CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            {
                                items.map(item => <CTableRow key={item.id}>
                                    <CTableHeaderCell scope="row">{item.id}</CTableHeaderCell>
                                    <CTableDataCell>{item.username}</CTableDataCell>
                                    <CTableDataCell>{item.email}</CTableDataCell>
                                    <CTableDataCell>{item.active ? <p className="text-success">Active</p> : <p className="text-muted">InActive</p>}</CTableDataCell>
                                    <CTableDataCell><CButton size="sm" color="primary" variant="outline" onClick={() => editUser(item)}>Edit</CButton></CTableDataCell>
                                </CTableRow>)
                            }
                        </CTableBody>
                    </CTable>
                </CCardBody>
            </CCard>

        }
        </>
    )
}

export default Users