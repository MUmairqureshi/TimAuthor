import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import BackButton from "../../Components/BackButton";
import CustomModal from "../../Components/CustomModal";
import CustomButton from "../../Components/CustomButton";
import Accordion from 'react-bootstrap/Accordion';
import CustomInput from "../../Components/CustomInput";
import './style.css'
import { Link, useNavigate } from "react-router-dom";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
export const ChapterDetails = () => {
    const [leadData, setLeadData] = useState({});
    const [editModal, setEditModal] = useState(false);

    const { id } = useParams();

    const base_url = 'https://custom.mystagingserver.site/Tim-WDLLC/public/'

    const [datas, setDatas] = useState({});

    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [showModal3, setShowModal3] = useState(false);
    const [showModal4, setShowModal4] = useState(false);
    const [formData, setFormData] = useState({});
    const [isChapter, setIsChapter] = useState(false);
    const [message, setMessage] = useState(false)

    const LogoutData = localStorage.getItem('login');

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        console.log(formData)
    };


    const inActive = () => {
        setShowModal(false)
        setShowModal2(true)
    }
    const Active = () => {
        setShowModal3(false)
        setShowModal4(true)
    }

    const chapterData = () => {
        const LogoutData = localStorage.getItem('login');
        document.title = 'Tim Author | Chapter Detail';
        document.querySelector('.loaderBox').classList.remove("d-none");
        fetch(`https://custom.mystagingserver.site/Tim-WDLLC/public/api/author/book_view/${id}`,
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${LogoutData}`
                },
            }
        )
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                document.querySelector('.loaderBox').classList.add("d-none");
                console.log(data)

                setDatas(data.data)
                setFormData(data.data)

            })
            .catch((error) => {
                document.querySelector('.loaderBox').classList.add("d-none");
                console.log(error);
            })
    }


    useEffect(() => {
        chapterData()

    }, []);



    const handleSubmit = (e) => {
        e.preventDefault();
        document.querySelector('.loaderBox').classList.remove("d-none");

        // Create a new FormData object
        const formDataMethod = new FormData();
        for (const key in leadData) {
            formDataMethod.append(key, leadData[key]);
        }

        console.log(formData)

        // Make the fetch request
        fetch(`https://custom.mystagingserver.site/Tim-WDLLC/public/api/author/bookchapter_add/${id}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${LogoutData}`
            },
            body: formDataMethod // Use the FormData object as the request body
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                document.querySelector('.loaderBox').classList.add("d-none");
                console.log(data);
                setShowModal(true)
                setTimeout(() => {
                    setShowModal(false)
                }, 1000)
                chapterData()
                setIsChapter(false)
                setFormData({
                    title: '',
                    description: ''
                })
            })
            .catch((error) => {
                document.querySelector('.loaderBox').classList.add("d-none");
                console.log(error)
            })
    }

    const [chapetrid, setChapterid] = useState()

    const chapobj = {
        data: {
            description: leadData?.description,
            chapter_id: chapetrid,
            price: leadData?.price,
            title: leadData?.title
        }

    }
 
    const handleEdit = (e) => {
        e.preventDefault();


        const LogoutData = localStorage.getItem('login');
        fetch(`https://custom.mystagingserver.site/Tim-WDLLC/public/api/author/bookchapter_update/${id}`,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${LogoutData}`
                },
                body: JSON.stringify(chapobj)
            },
        )
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                console.log(data)
                editDetailData(chapetrid)
                setEditModal(false)
            })
            .catch((error) => {
                document.querySelector('.loaderBox').classList.add("d-none");
                console.log(error);
            })
    }

    const editDetailData = (bookid) => {
        console.log("editDetailData", bookid)
        setChapterid(bookid)
        console.log("editDetailData", bookid)
        const LogoutData = localStorage.getItem('login');
        document.title = 'Mt Records | Book Chapters Detail';
        document.querySelector('.loaderBox').classList.remove("d-none");
        fetch(`https://custom.mystagingserver.site/Tim-WDLLC/public/api/author/bookchapter_view/${id}/${bookid}`,
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${LogoutData}`
                },
            }
        )
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                document.querySelector('.loaderBox').classList.add("d-none");


                setLeadData(data?.data)

                // setFormData(datas?.data)

            })
            .catch((error) => {
                document.querySelector('.loaderBox').classList.add("d-none");
                console.log(error);
            })
    }

    useEffect(() => {
        editDetailData()
    }, []);

    console.log('abc', leadData)

    return (
        <>
            <DashboardLayout>
                <div className="dashCard mb-4">
                    <div className="row mb-3">
                        <div className="col-12 mb-2">
                            <h2 className="mainTitle">
                                <BackButton />
                                Book Details
                            </h2>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-12">
                            {/* <div className="row mb-3 justify-content-end">
                <div className="col-lg-4 text-end order-1 order-lg-2 mb-3">
                  <button onClick={() => {
                    datas?.status ? setShowModal(true) : setShowModal3(true)
                  }} className="notButton primaryColor fw-bold text-decoration-underline">Mark as {datas?.status ? 'Inactive' : 'Active'}</button>
                  <span className={`statusBadge ${datas?.status == 1 ? 'statusBadgeActive' : 'statusBadgeInactive'}`}>{datas?.status == 1 ? 'Active' : 'Inactive'}</span>
                </div>
              </div> */}


                            <div className="row">
                                <div className="col-md-6 mb-4">

                                    <div className="productImage">
                                        <img src={base_url + datas?.image} />
                                    </div>
                                </div>
                                <div className="col-md-6 mb-4">
                                    <div className="productInfo">
                                        <h3 className="text-capitalize">{datas?.name}</h3>
                                        {/* <h4><span className="font-weight-bold">Price:</span>{` $ ${datas?.price}`}</h4> */}
                                        <p>{datas?.description}</p>
                                        <p><span className="font-weight-bold">Category:</span> <span>{datas?.category?.name}</span></p>

                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="d-flex justify-content-between">
                                        <h2 className="mainTitle mb-4">
                                            Book Chapters
                                        </h2>
                                        <div className="addChapter">
                                            <CustomButton text="Add Chapter" variant="primaryButton" onClick={(() => {
                                                setIsChapter(!isChapter)
                                            })}></CustomButton>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <Accordion defaultActiveKey="0">
                                        {datas?.chapters && datas?.chapters.map((item, index) => (
                                            <Accordion.Item eventKey={index}>
                                                <Accordion.Header>{`Chapter ${index + 1}`}</Accordion.Header>
                                                <Accordion.Body>
                                                    <div className="chapeditz d-flex">
                                                        <h3 className="text-capitalize">{item?.title}</h3>
                                                        <p>
                                                            <Link onClick={() => {
                                                                setEditModal(true)
                                                                editDetailData(item.id)
                                                            }} className="chaptableAction"><FontAwesomeIcon icon={faEdit} className="chaptableActionIcon" />Edit</Link>
                                                        </p>
                                                    </div>
                                                    <h3 className="text-capitalize">{item?.price}</h3>
                                                    <p> {item?.description}</p>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        ))}
                                    </Accordion>
                                </div>
                                {isChapter && (
                                    <div className="col-md-12 my-5 bg-light">
                                        <div className="chapterAdditionForom">
                                            <div className="titleBox mb-4">
                                                <h3 className="mainTitle">Add New Chapter</h3>
                                            </div>
                                            <div className="ChapterForm">
                                                <CustomInput
                                                    label='Chapter Title'
                                                    required
                                                    id='title'
                                                    type='text'
                                                    placeholder='Enter Chapter Title'
                                                    labelClass='mainLabel'
                                                    inputClass='mainInput'
                                                    name="title"
                                                    value={formData.title}
                                                    onChange={handleChange}
                                                />


                                                <div class="inputWrapper">
                                                    <label for="description" class="mainLabel">Chapter Description<span>*</span></label>
                                                    <textarea rows={12} type="textarea" placeholder="Enter Chapter Description" required="" id="description" name="description" class="mainInput" value={formData.description}
                                                        onChange={handleChange}>
                                                    </textarea>
                                                </div>
                                            </div>

                                            <div className="addNewChapter">
                                                <CustomButton text="Add" variant="primaryButton" onClick={handleSubmit}></CustomButton>
                                            </div>
                                        </div>
                                    </div>
                                )}

                            </div>
                        </div>
                    </div>
                </div>

                <CustomModal show={editModal} close={() => { setEditModal(false) }} heading="Edit Book Chapters" >


                    <CustomInput
                        label="Book Title"
                        type="text"
                        placeholder="Current Month Target"
                        required
                        name="title"
                        labelClass='mainLabel'
                        inputClass='mainInput'

                        value={leadData?.title}
                        onChange={(event) => {
                            setLeadData({
                                ...leadData,
                                title: event.target.value,
                                chapetr_id: chapetrid

                            });

                        }}


                    />
                    <CustomInput
                        label="Book Descripction"
                        type="text"
                        placeholder="book descripction"
                        required
                        name="description"
                        labelClass='mainLabel'
                        inputClass='mainInput'

                        value={leadData.description}
                        onChange={(event) => {
                            setLeadData({ ...leadData, description: event.target.value, chapetr_id: chapetrid });
                        }}


                    />
                    <CustomInput
                        label="Book Price
    
    
    "
                        type="number"
                        placeholder="book price"
                        required
                        name="price"
                        labelClass='mainLabel'
                        inputClass='mainInput'

                        value={leadData.price}
                        onChange={(event) => {
                            setLeadData({ ...leadData, price: event.target.value, chapetr_id: chapetrid });

                        }}
                        F />



                    <CustomButton variant='primaryButton' text='Edit' type='button' onClick={handleEdit} />
                </CustomModal>
                <CustomModal show={showModal} close={() => { setShowModal(false) }} success heading='Chapter Added Successfully.' />
            </DashboardLayout>
        </>
    );
};