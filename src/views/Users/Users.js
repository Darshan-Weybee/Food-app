import React, { useEffect, useState } from "react";
import { CCard, CCardBody, CCardHeader, CSpinner, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'
import { CButton } from '@coreui/react'
import { useNavigate } from "react-router-dom";
import { collection, getCountFromServer, getDocs, limit, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase"

const dataLimit = 10;

function Users() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [loader, setLoader] = useState(true);
    const [totalDataCount, setTotalDataCount] = useState(0);
    const [limitDisplayData, setLimitDisplayData] = useState(dataLimit);

    useEffect(() => {
        async function getCount() {
            // try {
            //     const coll = collection(db, "admin");
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
        // const next = query(collection(db, "admin"), orderBy("username"), limit(limitDisplayData));
        // const documentSnapshots = await getDocs(next);
        // const list = [];
        // documentSnapshots.forEach((doc) => {
        //     list.push({ docId: doc.id, ...doc.data() })
        // });
        // setUsers(list);
        // setLoader(false);
    };


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
                                items.map((item,index) => <CTableRow key={index}>
                                    <CTableHeaderCell scope="row">{item.id}</CTableHeaderCell>
                                    <CTableDataCell>{item.username}</CTableDataCell>
                                    <CTableDataCell>{item.email}</CTableDataCell>
                                    <CTableDataCell>{item.active ? <p className="text-success">Active</p> : <p className="text-muted">InActive</p>}</CTableDataCell>
                                    <CTableDataCell><CButton size="sm" color="primary" variant="outline" onClick={() => editUser(item)}>Edit</CButton></CTableDataCell>
                                </CTableRow>)
                            }
                        </CTableBody>
                    </CTable>
                    <CButton size="sm" color="secondary" variant="outline" onClick={loadMoreFun} disabled={totalDataCount <= users.length}>{totalDataCount <= users.length ? "No More Data to fetch" : "Load More.."}</CButton>
                </CCardBody>
            </CCard>

        }
        </>
    )
}

export default Users

// useEffect(() => {
//     const unsub = onSnapshot(collection(db, "admin"), (snapshot) => {
//         const list = [];
//         snapshot.docs.forEach(doc => {
//             list.push({ id: doc.id, ...doc.data() })
//         });
//         setUsers(list);
//         setLoader(false);
//     }, (error) => console.error(error.message));

//     return () => { unsub(); }
// }, [])